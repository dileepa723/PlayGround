// Minimal no-store static file server for the built site.
// Usage: node scripts/serve.mjs [rootDir]   (env: PORT, default 3000)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, sep, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Default root: dist/ next to this script's project directory (independent of CWD).
const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const root = resolve(process.argv[2] ?? defaultRoot);
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2'
};

function respond(res, code, body, headers) {
  res.writeHead(code, { 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store', ...headers });
  res.end(body);
}

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = join(root, pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      return respond(res, 403, 'Forbidden\n', { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    const body = await readFile(file);
    respond(res, 200, body, { 'Content-Type': types[extname(file).toLowerCase()] ?? 'application/octet-stream' });
  } catch {
    respond(res, 404, 'Not found\n', { 'Content-Type': 'text/plain; charset=utf-8' });
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`[serve] serving ${root} on http://0.0.0.0:${port}`);
});

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
