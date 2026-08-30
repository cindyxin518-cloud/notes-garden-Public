#!/usr/bin/env bash
set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_URL="${REPO_URL:-git@github.com:cindyxin518-cloud/notes-garden-Public.git}"
COMMIT_MESSAGE="${1:-Update Notes Garden site}"
PUBLISH_DIR="$(mktemp -d /private/tmp/notes-garden-publish-XXXXXX)"

git clone "$REPO_URL" "$PUBLISH_DIR"

git -C "$PUBLISH_DIR" config user.name "cindyxin518-cloud"
git -C "$PUBLISH_DIR" config user.email "cindyxin518-cloud@users.noreply.github.com"

cp "$SITE_DIR/index.html" "$SITE_DIR/styles.css" "$SITE_DIR/script.js" "$SITE_DIR/CNAME" "$SITE_DIR/worker-visitor-counter.js" "$SITE_DIR/worker-job-agent.js" "$PUBLISH_DIR/"
mkdir -p "$PUBLISH_DIR/assets"
cp "$SITE_DIR"/assets/* "$PUBLISH_DIR/assets/"
mkdir -p "$PUBLISH_DIR/admin radar"
cp "$SITE_DIR"/admin radar/* "$PUBLISH_DIR/admin radar/"
cp "$SITE_DIR/publish-to-github.sh" "$PUBLISH_DIR/"

git -C "$PUBLISH_DIR" add index.html styles.css script.js CNAME worker-visitor-counter.js worker-job-agent.js publish-to-github.sh assets admin radar

if git -C "$PUBLISH_DIR" diff --cached --quiet; then
  echo "No website changes to publish."
  echo "Checked local files against $REPO_URL"
  exit 0
fi

git -C "$PUBLISH_DIR" commit -m "$COMMIT_MESSAGE"
git -C "$PUBLISH_DIR" push -u origin main

echo "Published to $REPO_URL"
