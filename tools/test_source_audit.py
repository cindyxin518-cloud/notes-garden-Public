"""Citation display regressions: effective IDs, attribution limits and saved batches."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import unittest

import build_source_audit

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BINARY") or shutil.which("node")


class SourceAuditTests(unittest.TestCase):
    def test_generated_overlay_matches_reviewed_records_and_rejects_unsafe_links(self):
        data = json.loads((ROOT / "data/source-audit.json").read_text())
        self.assertEqual((ROOT / "source-audit.js").read_text(), build_source_audit.render(data))
        data["records"]["base-45"]["url"] = "javascript:alert(1)"
        with self.assertRaisesRegex(ValueError, "Invalid source URL"):
            build_source_audit.render(data)

    @unittest.skipUnless(NODE, "Set NODE_BINARY for the browser rendering check")
    def test_reviewed_sources_cover_legacy_and_classics_without_rewriting_them(self):
        program = r'''
const fs = require("node:fs"), vm = require("node:vm"), path = require("node:path");
const root = process.argv[1], source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const context = vm.createContext({window: {}, document: {querySelector: () => ({})}, URL});
for (const name of ["daodejing.js", "daily-quotes.js", "source-audit.js"]) vm.runInContext(fs.readFileSync(path.join(root, name), "utf8"), context);
vm.runInContext(source.slice(0, source.indexOf("let userQuotes =")), context);
vm.runInContext(source.slice(source.indexOf("const allCategory ="), source.indexOf("function classicSlugForTheme(")), context);
vm.runInContext(source.slice(source.indexOf("function escapeHtml("), source.indexOf("function groupForQuote(")), context);
vm.runInContext(source.slice(source.indexOf("function safeSourceUrl("), source.indexOf("function quoteCard(")), context);
vm.runInContext(source.slice(source.indexOf("function artNoteKey("), source.indexOf("function getClassicNote(")), context);
vm.runInContext(source.slice(source.indexOf("function classicNoteKey("), source.indexOf("function classicNoteMatches(")), context);
vm.runInContext(`
const reviewed = window.MINIGROW_SOURCE_AUDIT.records;
const existing = [...baseQuotes.filter(q => !q.id.startsWith("daily-") || q.id.startsWith("daily-2026-10-24-")), ...getClassicNoteEntries().map(entry => ({...entry.note, id: entry.id}))];
if (existing.length !== 153 || existing.some(q => !reviewed[q.id])) throw Error("An existing entry was omitted from the review");
const before = JSON.stringify(baseQuotes);
const durant = quoteReadingBody(baseQuotes.find(q => q.id === "base-45"));
if (!durant.includes("Will Durant") || !durant.includes("We are what we repeatedly do.") || durant.includes("Source: Aristotle")) throw Error("Durant correction missing");
const picasso = sourceNotes(baseQuotes.find(q => q.id === "base-5"));
if (!picasso.includes("Attribution unverified")) throw Error("Unverified attribution looks certain");
const yang = sourceNotes(baseQuotes.find(q => q.id === "base-67"));
if (!yang.includes("Author unknown") || yang.includes("Yang Jiang")) throw Error("Disproved attribution still displayed");
const strategy = getClassicNoteEntries("art-of-war").find(q => q.id === "art-3-2");
const credit = sourceNotes(strategy.note, "", strategy.id);
if (!credit.includes("Adapted from") || !credit.includes("Chapter 11")) throw Error("Paraphrased classic looks verbatim");
const embedded = getClassicNoteEntries("art-of-war").find(q => q.id === "art-0-3");
if (!sourceNotes(embedded.note, "", embedded.id).includes("Chapter 4")) throw Error("Collection ID did not override embedded quote ID");
for (const quote of existing) {
  const line = sourceNotes(quote);
  if (line.includes("undefined") || line.includes("<details") || /[\\u3400-\\u9fff]/.test(line.replace(/href="[^"]*"/g,""))) throw Error("Source rendering leaked untranslated labels or invalid content");
}
const chinese = chineseTranslation(baseQuotes[0]);
if (!chinese.includes('aria-label="Chinese"') || /<details[^>]* open/.test(chinese)) throw Error("Chinese disclosure changed");
if (before !== JSON.stringify(baseQuotes)) throw Error("Rendering mutated archived records");
`, context);
'''
        run = subprocess.run([NODE, "-e", program, str(ROOT)], capture_output=True, text=True)
        self.assertEqual(run.returncode, 0, run.stderr)


if __name__ == "__main__":
    unittest.main()
