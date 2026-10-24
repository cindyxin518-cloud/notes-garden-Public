"""Offline regression tests for batch validation, retries, and the existing notes UI."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import import_daily_quotes as importer


REPOSITORY = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BINARY") or shutil.which("node")


def sample_batch(day="2026-10-24", prefix=""):
    notes = []
    for number, letter in enumerate("ABCDEFGHIJ", 1):
        original = f"{prefix}Fictional test passage {letter}"
        notes.append({
            "id": f"daily-{day}-{number:02d}",
            "zh": f"{prefix}独立测试样例{letter}。",
            "en": original,
            "category": "Life",
            "source": f"Test author {letter} · Fixture work",
            "reference": {
                "author": f"Test author {letter}", "work": "Fixture work", "date": "1900",
                "locator": f"Test section {letter}", "url": f"https://example.com/fixture/{letter}",
                "sourceType": "测试", "originalLanguage": "英语",
                "chineseStatus": "测试译文", "englishStatus": "测试原文",
                "originalText": original, "context": "测试背景说明。",
                "question": "这是测试问题？", "verification": "仅为离线测试数据。",
            },
        })
    return {"schema_version": 1, "date": day, "timezone": importer.TIMEZONE,
            "expected_count": 10, "notes": notes}


class DailyQuoteTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        shutil.copyfile(REPOSITORY / "script.js", self.root / "script.js")
        self.candidate = self.root / "candidate.json"

    def tearDown(self):
        self.temporary.cleanup()

    def candidate_file(self, batch):
        self.candidate.write_text(json.dumps(batch, ensure_ascii=False), encoding="utf-8")
        return self.candidate

    def test_complete_batch_is_imported_and_matches_generated_output(self):
        result = importer.process(self.root, self.candidate_file(sample_batch()))
        self.assertEqual(result["status"], "imported")
        self.assertEqual(result["daily_count"], 10)
        self.assertEqual(importer.process(self.root, check=True)["status"], "valid")
        saved = json.loads((self.root / "data/quote-batches/2026-10-24.json").read_text())
        self.assertEqual(len(saved["notes"]), 10)
        self.assertTrue(all("nl" not in note for note in saved["notes"]))

    def test_nine_notes_cannot_create_any_batch_or_script(self):
        batch = sample_batch()
        batch["notes"].pop()
        with self.assertRaisesRegex(importer.ValidationError, "exactly 10"):
            importer.process(self.root, self.candidate_file(batch))
        self.assertFalse((self.root / "daily-quotes.js").exists())
        self.assertFalse((self.root / "data").exists())

    def test_same_day_retry_changes_neither_file_nor_ids(self):
        self.candidate_file(sample_batch())
        importer.process(self.root, self.candidate)
        files = [self.root / "daily-quotes.js", self.root / "data/quote-batches/2026-10-24.json"]
        before = [(path.read_bytes(), path.stat().st_mtime_ns) for path in files]
        self.assertEqual(importer.process(self.root, self.candidate)["status"], "unchanged")
        self.assertEqual(before, [(path.read_bytes(), path.stat().st_mtime_ns) for path in files])
        changed = sample_batch()
        changed["notes"][0]["reference"]["context"] = "Changed context."
        with self.assertRaisesRegex(importer.ValidationError, "immutable"):
            importer.process(self.root, self.candidate_file(changed))

    def test_legacy_translation_and_source_text_both_block_duplicates(self):
        legacy = importer.legacy_notes(self.root)
        for field in ("zh", "originalText"):
            batch = sample_batch()
            if field == "zh":
                batch["notes"][0]["zh"] = " “ " + legacy[0]["zh"] + " ” "
            else:
                batch["notes"][0]["reference"]["originalText"] = legacy[0]["en"]
            with self.assertRaisesRegex(importer.ValidationError, "duplicates base-0"):
                importer.process(self.root, self.candidate_file(batch))
        self.assertFalse((self.root / "daily-quotes.js").exists())

    def test_previous_batch_and_within_batch_duplicates_are_rejected(self):
        batch = sample_batch()
        batch["notes"][1]["en"] = batch["notes"][0]["en"]
        with self.assertRaisesRegex(importer.ValidationError, "duplicates daily-"):
            importer.process(self.root, self.candidate_file(batch))
        importer.process(self.root, self.candidate_file(sample_batch()))
        next_day = sample_batch("2026-10-25")
        with self.assertRaisesRegex(importer.ValidationError, "duplicates daily-"):
            importer.process(self.root, self.candidate_file(next_day))
        self.assertFalse((self.root / "data/quote-batches/2026-10-25.json").exists())

    def test_missing_reference_dutch_fields_bad_dates_and_unstable_ids_are_rejected(self):
        batches = []
        batch = sample_batch()
        del batch["notes"][0]["reference"]["locator"]
        batches.append(batch)
        batch = sample_batch()
        batch["notes"][0]["nl"] = "No Dutch for new records."
        batches.append(batch)
        batch = sample_batch()
        batch["date"] = "2026-02-30"
        batches.append(batch)
        batch = sample_batch()
        batch["notes"][0]["id"] = "unstable"
        batches.append(batch)
        for batch in batches:
            with self.assertRaises(importer.ValidationError):
                importer.process(self.root, self.candidate_file(batch))

    def test_dry_run_does_not_write_and_rebuild_recovers_interrupted_generation(self):
        self.candidate_file(sample_batch())
        self.assertEqual(importer.process(self.root, self.candidate, check=True)["status"], "valid")
        self.assertFalse((self.root / "daily-quotes.js").exists())
        importer.process(self.root, self.candidate)
        saved = (self.root / "data/quote-batches/2026-10-24.json").read_bytes()
        (self.root / "daily-quotes.js").write_text("interrupted generation", encoding="utf-8")
        with self.assertRaisesRegex(importer.ValidationError, "--rebuild"):
            importer.process(self.root, check=True)
        self.assertEqual(importer.process(self.root, rebuild=True)["status"], "rebuilt")
        self.assertEqual(saved, (self.root / "data/quote-batches/2026-10-24.json").read_bytes())
        self.assertEqual(importer.process(self.root, check=True)["status"], "valid")

    @unittest.skipUnless(NODE, "Set NODE_BINARY to run the JavaScript compatibility check")
    def test_old_ids_order_and_dutch_translations_survive_and_new_sources_render(self):
        importer.process(self.root, self.candidate_file(sample_batch()))
        program = r'''
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = process.argv[1];
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const before = vm.createContext({});
const legacyEnd = source.indexOf("// Daily batches are append-only;");
vm.runInContext(source.slice(0, legacyEnd) + "\nglobalThis.result = baseQuotes;", before);
const status = { hidden: true, textContent: "" };
const after = vm.createContext({ window: {}, document: { querySelector: () => status }, URL });
vm.runInContext(fs.readFileSync(path.join(root, "daily-quotes.js"), "utf8"), after);
vm.runInContext(source.slice(0, source.indexOf("let userQuotes =")) + "\nglobalThis.result = baseQuotes;", after);
const oldNotes = JSON.stringify(before.result);
if (oldNotes !== JSON.stringify(after.result.slice(0, before.result.length))) throw Error("Existing notes, IDs or order changed");
if (after.result.length !== before.result.length + 10) throw Error("Batch was not appended exactly once");
if (after.result.slice(-10).some(note => "nl" in note)) throw Error("New notes unexpectedly have Dutch");
vm.runInContext(source.slice(source.indexOf("function escapeHtml("), source.indexOf("function groupForQuote(")), after);
vm.runInContext(source.slice(source.indexOf("function safeSourceUrl("), source.indexOf("function quoteCard(")), after);
vm.runInContext("globalThis.rendered = sourceNotes(baseQuotes[baseQuotes.length - 1]);", after);
if (after.rendered.includes("undefined") || !after.rendered.includes("Context &amp; source notes")) throw Error("Bilingual source note rendering failed");
if (status.hidden || !status.textContent.includes("2026-10-24") || !status.textContent.includes("10")) throw Error("Latest update is absent");
process.stdout.write(JSON.stringify({ legacy: before.result.length, appended: 10, oldNotesPreserved: true }));
'''
        run = subprocess.run([NODE, "-e", program, str(self.root)], text=True, capture_output=True)
        self.assertEqual(run.returncode, 0, run.stderr)
        self.assertTrue(json.loads(run.stdout)["oldNotesPreserved"])


if __name__ == "__main__":
    unittest.main()
