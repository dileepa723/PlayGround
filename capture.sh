#!/usr/bin/env bash
# Capture desktop + mobile screenshots of CAPTURE_URL into CAPTURE_DIR.
# Exit 75 for temporary browser/navigation failures, 1 for script or rendering defects.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

if [[ -z "${CAPTURE_URL:-}" ]]; then
  echo "CAPTURE_URL is required." >&2
  exit 1
fi
if [[ -z "${CAPTURE_DIR:-}" ]]; then
  echo "CAPTURE_DIR is required." >&2
  exit 1
fi
if [[ "$CAPTURE_DIR" != /* ]]; then
  echo "CAPTURE_DIR must be an absolute path (got: $CAPTURE_DIR)." >&2
  exit 1
fi

run() {
  local label="$1"
  shift
  echo "==> $label"
  /usr/bin/time -p "$@"
}

run "create capture directory" mkdir -p "$CAPTURE_DIR"
run "capture screenshots" node capture.mjs
