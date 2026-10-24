#!/usr/bin/env python3
"""Validate and import complete daily quote batches, without network access."""

from __future__ import annotations

import argparse
from contextlib import contextmanager
from datetime import date
import fcntl
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import unicodedata
from urllib.parse import urlsplit


TIMEZONE = "Europe/Amsterdam"
COUNT = 10
CATEGORIES = {
    "Wisdom", "Self", "Growth", "Life", "Relationships", "Reading", "Others",
    "Attention", "Uncertainty", "Time", "Nature", "Creativity",
}
NOTE_FIELDS = {"id", "zh", "en", "category", "source", "reference"}
REFERENCE_FIELDS = (
    "author", "work", "date", "locator", "url", "sourceType", "originalLanguage",
    "chineseStatus", "englishStatus", "originalText", "context", "question", "verification",
)
BATCH_FIELDS = {"schema_version", "date", "timezone", "expected_count", "notes"}
ROOT = Path(__file__).resolve().parent.parent


class ValidationError(ValueError):
    pass


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValidationError(message)


def text_field(value: object, label: str, limit: int = 6000) -> str:
    require(isinstance(value, str) and bool(value.strip()), f"{label}: nonempty text required")
    value = value.strip()
    require(len(value) <= limit, f"{label}: exceeds {limit} characters")
    require(value.casefold() not in {"todo", "tbd", "待核实", "待补充", "unknown"},
            f"{label}: placeholder is not a completed reference")
    return value


def source_url(value: object, label: str) -> str:
    value = text_field(value, label, 3000)
    parts = urlsplit(value)
    require(parts.scheme in {"http", "https"} and bool(parts.hostname)
            and not parts.username and not parts.password,
            f"{label}: an HTTP(S) source URL without credentials is required")
    return value


def validate_batch(raw: object, label: str = "batch") -> dict:
    require(isinstance(raw, dict), f"{label}: JSON object required")
    require(set(raw) == BATCH_FIELDS, f"{label}: expected fields {sorted(BATCH_FIELDS)}")
    require(type(raw["schema_version"]) is int and raw["schema_version"] == 1,
            f"{label}: schema_version must be 1")
    require(isinstance(raw["date"], str), f"{label}: date must be YYYY-MM-DD")
    try:
        batch_date = date.fromisoformat(raw["date"]).isoformat()
    except ValueError as exc:
        raise ValidationError(f"{label}: invalid date") from exc
    require(batch_date == raw["date"], f"{label}: date must be YYYY-MM-DD")
    require(raw["timezone"] == TIMEZONE, f"{label}: timezone must be {TIMEZONE}")
    require(type(raw["expected_count"]) is int and raw["expected_count"] == COUNT,
            f"{label}: expected_count must be {COUNT}")
    notes = raw["notes"]
    require(isinstance(notes, list) and len(notes) == COUNT,
            f"{label}: a complete batch must contain exactly {COUNT} notes")
    clean_notes = []
    for index, note in enumerate(notes, 1):
        note_label = f"{label}.notes[{index}]"
        require(isinstance(note, dict) and set(note) == NOTE_FIELDS,
                f"{note_label}: expected fields {sorted(NOTE_FIELDS)}; new notes are Chinese and English only")
        expected_id = f"daily-{batch_date}-{index:02d}"
        require(note["id"] == expected_id, f"{note_label}: id must be {expected_id}")
        require(note["category"] in CATEGORIES, f"{note_label}: use an existing ordinary theme")
        reference = note["reference"]
        require(isinstance(reference, dict), f"{note_label}.reference: object required")
        require(set(reference) <= set(REFERENCE_FIELDS) | {"additionalSources"}
                and set(REFERENCE_FIELDS) <= set(reference),
                f"{note_label}.reference: required fields are {list(REFERENCE_FIELDS)}; no Dutch fields")
        clean_reference = {
            key: source_url(reference[key], f"{note_label}.reference.{key}") if key == "url"
            else text_field(reference[key], f"{note_label}.reference.{key}")
            for key in REFERENCE_FIELDS
        }
        extra_sources = reference.get("additionalSources", [])
        require(isinstance(extra_sources, list) and len(extra_sources) <= 10,
                f"{note_label}.reference.additionalSources: list of at most 10 sources required")
        clean_extra = []
        for extra in extra_sources:
            require(isinstance(extra, dict) and set(extra) == {"label", "url"},
                    f"{note_label}.reference.additionalSources: each source needs label and url")
            clean_extra.append({
                "label": text_field(extra["label"], "additional source label", 1000),
                "url": source_url(extra["url"], "additional source URL"),
            })
        clean_reference["additionalSources"] = clean_extra
        clean_notes.append({
            "id": expected_id,
            "zh": text_field(note["zh"], f"{note_label}.zh", 1600),
            "en": text_field(note["en"], f"{note_label}.en", 1600),
            "category": note["category"],
            "source": text_field(note["source"], f"{note_label}.source", 1000),
            "reference": clean_reference,
        })
    return {"schema_version": 1, "date": batch_date, "timezone": TIMEZONE,
            "expected_count": COUNT, "notes": clean_notes}


def read_json(path: Path) -> object:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise ValidationError(f"Cannot read JSON {path}: {exc}") from exc


def javascript_array(source: str, name: str) -> list:
    """Read data literals, not JavaScript code; accept existing unquoted object keys."""
    match = re.search(r"^const\s+" + re.escape(name) + r"\s*=\s*\[", source, re.MULTILINE)
    require(match is not None, f"Cannot locate legacy array {name}; stop rather than assume no history")
    position = match.end() - 1
    depth = 0
    output = []
    decoder = json.JSONDecoder()
    while position < len(source):
        char = source[position]
        if char == '"':
            try:
                _, end = decoder.raw_decode(source, position)
            except ValueError as exc:
                raise ValidationError(f"Cannot parse string in {name}") from exc
            output.append(source[position:end])
            position = end
            continue
        if source.startswith("//", position):
            end = source.find("\n", position)
            position = len(source) if end < 0 else end
            continue
        if source.startswith("/*", position):
            end = source.find("*/", position + 2)
            require(end >= 0, f"Unclosed comment in {name}")
            position = end + 2
            continue
        identifier = re.match(r"[A-Za-z_$][A-Za-z0-9_$]*", source[position:])
        if identifier:
            word = identifier.group()
            end = position + len(word)
            following = source[end:].lstrip()
            output.append(json.dumps(word) if following.startswith(":") else word)
            position = end
            continue
        output.append(char)
        if char in "[{":
            depth += 1
        elif char in "]}":
            depth -= 1
            if depth == 0:
                try:
                    result = json.loads("".join(output))
                except ValueError as exc:
                    raise ValidationError(f"Cannot parse legacy data {name}: {exc}") from exc
                require(isinstance(result, list), f"Legacy {name} must be an array")
                return result
        position += 1
    raise ValidationError(f"Unclosed legacy array {name}")


def legacy_notes(root: Path) -> list[dict]:
    source = (root / "script.js").read_text(encoding="utf-8")
    base = javascript_array(source, "baseQuotes")
    sourced = javascript_array(source, "sourcedNotes")
    require(all(isinstance(note, dict) for note in base + sourced), "Unexpected legacy note format")
    return [{**note, "id": f"base-{index}"} for index, note in enumerate(base)] + sourced


def normalize_quote(value: str) -> str:
    return "".join(char for char in unicodedata.normalize("NFKC", value).casefold()
                   if unicodedata.category(char)[0] in {"L", "N"})


def quote_texts(note: dict) -> set[str]:
    values = [note.get("zh", ""), note.get("en", ""),
              note.get("reference", {}).get("originalText", "")]
    return {normalize_quote(value) for value in values if isinstance(value, str) and value.strip()}


def validate_unique(legacy: list[dict], batches: list[dict]) -> None:
    fingerprints = {}
    ids = set()
    for note in legacy:
        ids.add(note["id"])
        for value in quote_texts(note):
            fingerprints.setdefault(value, note["id"])
    for batch in sorted(batches, key=lambda item: item["date"]):
        for note in batch["notes"]:
            require(note["id"] not in ids, f"Duplicate note ID: {note['id']}")
            texts = quote_texts(note)
            for value in texts:
                require(value not in fingerprints,
                        f"{note['id']}: quote or translation duplicates {fingerprints.get(value)}")
                # Flag nearly identical excerpts with only a short prefix/suffix changed.
                for existing, previous_id in fingerprints.items():
                    short, long = sorted((value, existing), key=len)
                    require(not (len(short) >= 24 and len(short) / len(long) >= 0.80 and short in long),
                            f"{note['id']}: overlapping excerpt with {previous_id}; choose another passage")
            ids.add(note["id"])
            for value in texts:
                fingerprints[value] = note["id"]


def read_batches(root: Path) -> list[dict]:
    batches = []
    for path in sorted((root / "data" / "quote-batches").glob("*.json")):
        batch = validate_batch(read_json(path), str(path))
        require(path.name == batch["date"] + ".json", f"{path}: filename must match the batch date")
        batches.append(batch)
    return batches


def daily_script(batches: list[dict]) -> str:
    ordered = sorted(batches, key=lambda item: item["date"])
    notes = [note for batch in ordered for note in batch["notes"]]
    payload = {
        "schema_version": 1,
        "timezone": TIMEZONE,
        "updated_on": ordered[-1]["date"] if ordered else None,
        "latest_count": len(ordered[-1]["notes"]) if ordered else 0,
        "total_count": len(notes),
        "batches": [{"date": batch["date"], "count": len(batch["notes"])} for batch in ordered],
        "notes": notes,
    }
    encoded = json.dumps(payload, ensure_ascii=False, indent=2)
    encoded = encoded.replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    return ("// Generated by tools/import_daily_quotes.py; edit complete data/quote-batches files instead.\n"
            + "window.MINIGROW_DAILY_QUOTES = " + encoded + ";\n")


def atomic_write(path: Path, content: str) -> bool:
    if path.exists() and path.read_text(encoding="utf-8") == content:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, 0o644)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)
    return True


@contextmanager
def import_lock(root: Path):
    lock_path = root / "data" / ".daily-quotes.lock"
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    with lock_path.open("a", encoding="utf-8") as handle:
        fcntl.flock(handle.fileno(), fcntl.LOCK_EX)
        try:
            yield
        finally:
            fcntl.flock(handle.fileno(), fcntl.LOCK_UN)


def catalog(root: Path) -> dict:
    legacy = legacy_notes(root)
    batches = read_batches(root)
    validate_unique(legacy, batches)
    all_notes = legacy + [note for batch in batches for note in batch["notes"]]
    return {
        "timezone": TIMEZONE,
        "completed_dates": [batch["date"] for batch in batches],
        "legacy_count": len(legacy),
        "daily_count": sum(len(batch["notes"]) for batch in batches),
        "notes": [{"id": note["id"], "zh": note.get("zh", ""), "en": note.get("en", ""),
                   "source": note.get("source", ""), "reference": note.get("reference", {})}
                  for note in all_notes],
    }


def process(root: Path, input_path: Path | None = None, *, check: bool = False,
            rebuild: bool = False) -> dict:
    legacy = legacy_notes(root)
    batches = read_batches(root)
    validate_unique(legacy, batches)
    candidate = validate_batch(read_json(input_path), str(input_path)) if input_path else None
    existing = next((batch for batch in batches if candidate and batch["date"] == candidate["date"]), None)
    if existing:
        require(existing == candidate,
                f"{candidate['date']}: completed batch is immutable; do not replace it or add another 10")
    elif candidate:
        batches.append(candidate)
        validate_unique(legacy, batches)
    expected_script = daily_script(batches)
    output_path = root / "daily-quotes.js"
    if check:
        if not candidate:
            require(output_path.exists() and output_path.read_text(encoding="utf-8") == expected_script,
                    "daily-quotes.js does not match validated batches; run --rebuild")
        return {"status": "valid", "candidate_date": candidate["date"] if candidate else None,
                "batch_count": len(batches), "daily_count": len(batches) * COUNT}
    require(candidate is not None or rebuild, "Choose --input, --check, --list, or --rebuild")
    # Each file is atomically replaced. If interrupted between files, the saved batch is
    # authoritative: rerun the same input or --rebuild, then validate before committing.
    if candidate and not existing:
        atomic_write(root / "data" / "quote-batches" / f"{candidate['date']}.json",
                     json.dumps(candidate, ensure_ascii=False, indent=2) + "\n")
    generated = atomic_write(output_path, expected_script)
    return {"status": "imported" if candidate and not existing else "rebuilt" if generated else "unchanged",
            "date": candidate["date"] if candidate else None,
            "batch_count": len(batches), "daily_count": len(batches) * COUNT}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT, help="Repository root (default: this script's parent)")
    parser.add_argument("--input", type=Path, help="Candidate JSON; import a complete date batch")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true", help="Validate stored files, or dry-run --input")
    mode.add_argument("--list", action="store_true", help="Print legacy and daily notes for research and deduplication")
    mode.add_argument("--rebuild", action="store_true", help="Regenerate JavaScript from validated saved batches")
    args = parser.parse_args(argv)
    if args.input and (args.list or args.rebuild):
        parser.error("--input can be combined with --check only")
    try:
        root = args.root.resolve()
        if args.list:
            result = catalog(root)
        elif args.check or not (args.input or args.rebuild):
            result = process(root, args.input, check=True)
        else:
            with import_lock(root):
                result = process(root, args.input, rebuild=args.rebuild)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except (ValidationError, OSError, TypeError) as exc:
        print(f"Daily quotes validation failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
