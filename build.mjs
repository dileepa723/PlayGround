#!/usr/bin/env node
// Deterministic static build: copy src/ to dist/ and stamp the build id.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const root = dirname(fileURLToPath(import.meta.url))
const src = join(root, 'src')
const dist = join(root, 'dist')

if (!existsSync(join(src, 'index.html'))) {
  console.error(`Missing source entry point: ${join(src, 'index.html')}`)
  process.exit(1)
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })
cpSync(src, dist, { recursive: true })

const stamp = createHash('sha256')
  .update(readFileSync(join(src, 'index.html')))
  .update(readFileSync(join(src, 'styles.css')))
  .update(readFileSync(join(src, 'app.js')))
  .digest('hex')
  .slice(0, 12)
writeFileSync(join(dist, 'build.json'), JSON.stringify({ build: stamp, builtAt: new Date().toISOString() }) + '\n')

console.log(`Built ${dist} (${stamp})`)
