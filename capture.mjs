#!/usr/bin/env node
// Capture desktop + mobile screenshots of CAPTURE_URL into CAPTURE_DIR.
// Exit 75 for temporary browser/navigation infrastructure failures, 1 for defects.
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const startedAt = Date.now()

function time(label, fn) {
  const start = process.hrtime.bigint()
  return Promise.resolve()
    .then(fn)
    .then(
      (value) => {
        const ms = Number(process.hrtime.bigint() - start) / 1e6
        console.log(`[timing] ${label}: ${ms.toFixed(0)}ms`)
        return value
      },
      (error) => {
        const ms = Number(process.hrtime.bigint() - start) / 1e6
        console.log(`[timing] ${label}: ${ms.toFixed(0)}ms (failed)`)
        throw error
      }
    )
}

const transient = (error) => {
  error.exitCode = 75
  return error
}

const isTransient = (error) =>
  error?.name === 'TimeoutError' ||
  /net::ERR|ECONNREFUSED|ECONNRESET|ENOTFOUND|EAI_AGAIN|socket hang up|Target closed|browser has disconnected/i.test(
    String(error?.message || '')
  )

const url = process.env.CAPTURE_URL
const output = process.env.CAPTURE_DIR
if (!url || !output) {
  console.error('Set CAPTURE_URL and CAPTURE_DIR.')
  process.exit(1)
}

const runtime = process.env.OMGITHUB_PLAYWRIGHT_DIR || join(process.env.HOME, '.local/share/omgithub-playwright')
let playwrightPath
try {
  playwrightPath = createRequire(join(runtime, 'package.json')).resolve('playwright')
} catch {
  console.error(`Playwright runtime not found under ${runtime}.`)
  process.exit(75)
}
const require = createRequire(playwrightPath)
const { chromium } = require('playwright')

const configPath = join(runtime, process.platform === 'darwin' ? 'metal.json' : 'linux.json')
const config = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf8')) : { browser: { launchOptions: {} } }
if (process.platform === 'linux') {
  const displayFile = join(runtime, 'display')
  if (!process.env.DISPLAY && existsSync(displayFile)) {
    process.env.DISPLAY = ':' + readFileSync(displayFile, 'utf8').trim()
  }
}

let browser
try {
  await time('create capture directory', () => mkdirSync(output, { recursive: true }))

  browser = await time('launch chromium', () =>
    chromium.launch({ ...config.browser?.launchOptions, timeout: 30000 }).catch((error) => {
      throw transient(error)
    })
  )

  const failures = []
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['mobile', 390, 844]
  ]) {
    const page = await time(`open ${name} page`, () =>
      browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 }).catch((error) => {
        throw transient(error)
      })
    )
    page.setDefaultTimeout(30000)
    page.on('pageerror', (error) => {
      console.error(`[pageerror:${name}] ${error.message}`)
      failures.push(error.message)
    })
    page.on('response', (response) => {
      if (response.status() >= 400 && new URL(response.url()).origin === new URL(url).origin) {
        failures.push(`HTTP ${response.status()}: ${response.url()}`)
      }
    })

    const response = await time(`navigate ${name}`, () =>
      page
        .goto(url, { waitUntil: 'load', timeout: 45000 })
        .catch((error) => {
          throw transient(error)
        })
    )
    if (!response || !response.ok()) {
      const status = response?.status()
      const error = new Error(`HTTP ${status ?? 'no response'} loading ${url}`)
      error.exitCode = !response || [408, 429, 500, 502, 503, 504].includes(status) ? 75 : 1
      throw error
    }

    await time(`wait for content ${name}`, async () => {
      await page.locator('body').waitFor({ state: 'visible' })
      await page.locator('h1').first().waitFor({ state: 'visible' })
      await page.waitForFunction(() => document.fonts.status === 'loaded', null, { timeout: 15000 })
      // app.js marks the document once it has hydrated; a missing marker means
      // the script failed to run, which is a defect rather than a flaky load.
      await page
        .waitForFunction(() => document.documentElement.dataset.appReady === 'true', null, { timeout: 15000 })
        .catch((error) => {
          if (isTransient(error)) throw transient(error)
          throw new Error(`App did not finish rendering: ${error.message}`)
        })
    })

    await time(`screenshot ${name}`, () =>
      page
        .screenshot({ path: join(output, `final-${name}.png`), fullPage: false, timeout: 30000 })
        .catch((error) => {
          if (error.name === 'TimeoutError' || !browser.isConnected()) throw transient(error)
          throw error
        })
    )

    await page.close().catch(() => {})
    if (failures.length) {
      throw new Error(`Page reported errors: ${failures.join('; ')}`)
    }
  }

  console.log(`Captured desktop and mobile screenshots in ${output} (${Date.now() - startedAt}ms total)`)
} catch (error) {
  console.error(error?.stack || error)
  process.exitCode = error?.exitCode || 1
} finally {
  await time('close browser', () => browser?.close()).catch((error) => {
    console.error(error)
    if (!process.exitCode) process.exitCode = 75
  })
}
