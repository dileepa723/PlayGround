#!/usr/bin/env bash
# Build the static site (if needed) and serve it in the foreground on $PORT.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
if [[ ! "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  echo "PORT must be an integer between 1 and 65535 (got: $PORT)." >&2
  exit 1
fi
export PORT

WEB_DIR="${OPENCODE_WEB_DIR:-${RUNNER_TEMP:-/tmp}/omgithub-web}"
DIST_DIR="$PROJECT_DIR/dist"
MANIFEST="$WEB_DIR/deployment-output.json"

# Time every command; /usr/bin/time -p prints real/user/sys to stderr.
run() {
  local label="$1"
  shift
  echo "==> $label"
  /usr/bin/time -p "$@"
}

run "ensure metadata directory" mkdir -p "$WEB_DIR"

# Install dependencies only when package.json declares any.
needs_deps=false
if [[ -f package.json ]]; then
  if run "check dependencies" node -e '
    const pkg = require("./package.json");
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
    process.exit(Object.keys(deps).length ? 0 : 1);
  '; then
    needs_deps=true
  fi
fi

if [[ "$needs_deps" == true ]]; then
  if [[ -f package-lock.json ]]; then
    run "install dependencies (npm ci)" npm ci --no-audit --no-fund
  else
    run "install dependencies (npm install)" npm install --no-audit --no-fund
  fi
else
  echo "==> no npm dependencies to install"
fi

# Rebuild only when dist is missing or any source file is newer.
if [[ ! -f "$DIST_DIR/index.html" ]] || [[ -n "$(find src -type f -newer "$DIST_DIR/index.html" -print -quit 2>/dev/null)" ]]; then
  run "build static site" npm run build --silent
else
  echo "==> build skipped (dist is up to date)"
fi

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  echo "Build output is missing $DIST_DIR/index.html." >&2
  exit 1
fi

# Publish the deployment manifest atomically so readers never see a partial file.
run "write deployment manifest" env \
  DEPLOY_MANIFEST="$MANIFEST" \
  DEPLOY_PROJECT="$PROJECT_DIR" \
  DEPLOY_DIR="$DIST_DIR" \
  node -e '
    const { writeFileSync, renameSync } = require("node:fs");
    const manifest = process.env.DEPLOY_MANIFEST;
    const payload = JSON.stringify({
      project: process.env.DEPLOY_PROJECT,
      directory: process.env.DEPLOY_DIR,
    });
    const tmp = manifest + ".tmp." + process.pid;
    writeFileSync(tmp, payload + "\n");
    renameSync(tmp, manifest);
    console.log(payload);
  '

echo "==> serving $DIST_DIR on http://0.0.0.0:$PORT"
exec node server.mjs
