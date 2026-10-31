#!/usr/bin/env bash
# Build the project and serve it in the foreground on PORT (default 3000).
#
# Contract:
# - Keeps source (web/) and built output (dist/) inside PROJECT_DIR.
# - Writes worker metadata (deployment-output.json) to OPENCODE_WEB_DIR.
# - Installs dependencies / builds when needed, then serves dist/ in the
#   foreground so the controller-owned tmux app-server session can manage us.
# - No external runtime dependencies besides node (used for install/build/serve).
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PORT="${PORT:-3000}"
OPENCODE_WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
export PORT

echo "[start] project=$PROJECT_DIR port=$PORT"

# ---- 1. Build (pure-static site: no package.json to install, copy web/ -> dist/) ----
echo "[start] building static site"
/usr/bin/time -p rm -rf dist
/usr/bin/time -p mkdir -p dist
/usr/bin/time -p cp -r web/. dist/
/usr/bin/time -p test -f dist/index.html
/usr/bin/time -p node --check scripts/serve.mjs
echo "[start] build ok"

# ---- 2. Publish build metadata for the worker (paths only, capture evidence never lives here) ----
/usr/bin/time -p mkdir -p "$OPENCODE_WEB_DIR"
/usr/bin/time -p python3 - "$PROJECT_DIR" "$OPENCODE_WEB_DIR/deployment-output.json" <<'PY'
import json, os, sys
project, out = sys.argv[1], sys.argv[2]
payload = {"project": project, "directory": os.path.join(project, "dist")}
with open(out, "w") as f:
    json.dump(payload, f, indent=2)
    f.write("\n")
print(f"deployment-output.json -> {payload}")
PY

# ---- 3. Serve dist/ in the foreground ----
echo "[start] serving dist/ in the foreground on port $PORT"
exec node scripts/serve.mjs dist
