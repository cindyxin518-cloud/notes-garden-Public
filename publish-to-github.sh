#!/usr/bin/env bash
set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLISH_DIR="${PUBLISH_DIR:-/private/tmp/notes-garden-publish}"
REPO_URL="${REPO_URL:-git@github.com:cindyxin518-cloud/notes-garden-Public.git}"
COMMIT_MESSAGE="${1:-Update Notes Garden site}"

mkdir -p "$PUBLISH_DIR"

if [ ! -d "$PUBLISH_DIR/.git" ]; then
  git init "$PUBLISH_DIR"
  git -C "$PUBLISH_DIR" branch -M main
  git -C "$PUBLISH_DIR" remote add origin "$REPO_URL"
else
  git -C "$PUBLISH_DIR" remote set-url origin "$REPO_URL"
fi

git -C "$PUBLISH_DIR" config user.name "cindyxin518-cloud"
git -C "$PUBLISH_DIR" config user.email "cindyxin518-cloud@users.noreply.github.com"

cp "$SITE_DIR/index.html" "$SITE_DIR/styles.css" "$SITE_DIR/script.js" "$SITE_DIR/CNAME" "$SITE_DIR/worker-visitor-counter.js" "$PUBLISH_DIR/"
mkdir -p "$PUBLISH_DIR/assets"
cp "$SITE_DIR"/assets/* "$PUBLISH_DIR/assets/"

git -C "$PUBLISH_DIR" add index.html styles.css script.js CNAME worker-visitor-counter.js assets

if git -C "$PUBLISH_DIR" diff --cached --quiet; then
  echo "No website changes to publish."
  git -C "$PUBLISH_DIR" push -u origin main
  echo "Checked remote publishing for $REPO_URL"
  exit 0
fi

git -C "$PUBLISH_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$PUBLISH_DIR" push -u origin main

echo "Published to $REPO_URL"
