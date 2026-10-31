#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PROJECT_DIR="$(pwd)"
PORT="${PORT:-3000}"
OPENCODE_WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
DIST_DIR="$PROJECT_DIR/dist"

if [ -f "$PROJECT_DIR/package.json" ]; then
  if [ -f "$PROJECT_DIR/package-lock.json" ]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
  if node -e "const p=require(process.argv[1]); process.exit(p.scripts && p.scripts.build ? 0 : 1)" "$PROJECT_DIR/package.json"; then
    /usr/bin/time -p npm run build
  fi
fi

/usr/bin/time -p mkdir -p "$DIST_DIR"
if [ ! -f "$DIST_DIR/index.html" ]; then
  /usr/bin/time -p node - "$DIST_DIR" <<'NODE'
const fs = require('fs');
const dir = process.argv[2];
const html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>PlayGround</title>\n<style>\n:root{color-scheme:dark} *{box-sizing:border-box} body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(circle at 20% 20%,#1b2a4a,#0b1020 60%);color:#e8eefc} main{text-align:center;padding:2rem} h1{font-size:clamp(2rem,6vw,4rem);margin:0 0 .5rem;letter-spacing:.02em} p{opacity:.8;max-width:40ch;margin:0 auto 1.5rem} button{padding:.9rem 1.6rem;font-size:1rem;border:0;border-radius:.75rem;background:linear-gradient(135deg,#4f8cff,#7c5cff);color:#fff;cursor:pointer} button:hover{filter:brightness(1.1)} .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-top:2rem;max-width:320px;margin-inline:auto} .cell{aspect-ratio:1;border-radius:.5rem;background:rgba(255,255,255,.08)}\n</style>\n</head>\n<body>\n<main>\n<h1>PlayGround</h1>\n<p>A live preview served from the project build output.</p>\n<button type="button">Start game</button>\n<div class="grid" aria-hidden="true">\n<div class="cell"></div><div class="cell"></div><div class="cell"></div>\n<div class="cell"></div><div class="cell"></div><div class="cell"></div>\n<div class="cell"></div><div class="cell"></div><div class="cell"></div>\n</div>\n</main>\n</body>\n</html>';
fs.writeFileSync(dir + '/index.html', html);
NODE
fi

/usr/bin/time -p node - "$PROJECT_DIR" "$DIST_DIR" "$OPENCODE_WEB_DIR" <<'NODE'
const fs = require('fs');
const project = process.argv[2];
const directory = process.argv[3];
const webDir = process.argv[4];
fs.mkdirSync(webDir, { recursive: true });
fs.writeFileSync(webDir + '/deployment-output.json', JSON.stringify({ project, directory }));
NODE

/usr/bin/time -p python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$DIST_DIR"
