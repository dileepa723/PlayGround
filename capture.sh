#!/usr/bin/env bash
# Capture the running preview. Requires CAPTURE_URL and CAPTURE_DIR.
#
# Contract:
# - Opens the exact CAPTURE_URL in the preinstalled headed Playwright browser
#   (persistent Xvfb display), waits for rendered content.
# - Saves CAPTURE_DIR/final-desktop.png (1440x900) and CAPTURE_DIR/final-mobile.png (390x844).
# - Closes its own browser; leaves the running app untouched.
# - Exit 75: temporary navigation/browser infrastructure failure.
# - Exit 1:  script or rendering defect.
# - Capture evidence stays in CAPTURE_DIR/OPENCODE_WEB_DIR, never inside project source.
set -uo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

: "${CAPTURE_URL:?CAPTURE_URL is required}" "${CAPTURE_DIR:?CAPTURE_DIR is required}"
RUNTIME_DIR="${RUNTIME_DIR:-/home/runner/work/_temp/omgithub-runtime}"

echo "[capture] url=$CAPTURE_URL dir=$CAPTURE_DIR"
mkdir -p "$CAPTURE_DIR"

# DISPLAY is configured inside default-capture.mjs (persistent Xvfb display).
# Keep it unset here so the mjs picks the correct saved display file.

status=0
/usr/bin/time -p node "$RUNTIME_DIR/scripts/default-capture.mjs" || status=$?

case $status in
  0)            echo "[capture] ok: final-desktop.png and final-mobile.png written" ;;
  75)           echo "[capture] transient navigation/browser infrastructure failure (exit 75)" ;;
  *)            echo "[capture] script or rendering defect (exit $status)" ;;
esac
# The app server is left running; we only closed our browser.
exit $status
