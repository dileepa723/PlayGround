const STORAGE_KEY = 'sa-neon-state.graphics.v1'

const SETTING_KEYS = ['renderScale', 'bloom', 'bloomStrength', 'grain', 'scanlines', 'showFps']

export const PRESETS = {
  performance: {
    label: 'PERFORMANCE',
    note: 'MAX FRAMERATE',
    detail: '70% render · post FX off',
    values: { renderScale: 0.7, bloom: false, bloomStrength: 0.35, grain: false, scanlines: true },
  },
  balanced: {
    label: 'BALANCED',
    note: 'RECOMMENDED',
    detail: '85% render · soft bloom',
    values: { renderScale: 0.85, bloom: true, bloomStrength: 0.5, grain: false, scanlines: true },
  },
  high: {
    label: 'HIGH',
    note: 'NEXT-GEN',
    detail: 'full render · bloom + grain',
    values: { renderScale: 1, bloom: true, bloomStrength: 0.62, grain: true, scanlines: true },
  },
  ultra: {
    label: 'ULTRA',
    note: 'SHOWCASE',
    detail: 'full render · heavy bloom',
    values: { renderScale: 1, bloom: true, bloomStrength: 0.86, grain: true, scanlines: true },
  },
}

const DEFAULTS = {
  preset: 'high',
  renderScale: 1,
  bloom: true,
  bloomStrength: 0.62,
  grain: true,
  scanlines: true,
  showFps: true,
}

function preferredPreset() {
  if (typeof window === 'undefined') return 'high'
  const touch = window.matchMedia?.('(pointer: coarse)')?.matches || 'ontouchstart' in window
  const small = Math.min(window.innerWidth, window.innerHeight) < 720
  const weak = (navigator.hardwareConcurrency || 8) <= 4
  return touch || small || weak ? 'balanced' : 'high'
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function sanitize(input, base) {
  const out = { ...base }
  if (PRESETS[input.preset]) out.preset = input.preset
  if (Number.isFinite(input.renderScale)) out.renderScale = clamp(input.renderScale, 0.5, 1)
  if (typeof input.bloom === 'boolean') out.bloom = input.bloom
  if (Number.isFinite(input.bloomStrength)) out.bloomStrength = clamp(input.bloomStrength, 0, 1.2)
  if (typeof input.grain === 'boolean') out.grain = input.grain
  if (typeof input.scanlines === 'boolean') out.scanlines = input.scanlines
  if (typeof input.showFps === 'boolean') out.showFps = input.showFps
  return out
}

export class GraphicsSettings {
  constructor() {
    const preset = preferredPreset()
    this.defaults = sanitize({ ...DEFAULTS, ...PRESETS[preset].values, preset }, DEFAULTS)
    const saved = readSaved()
    this.values = saved ? sanitize(saved, this.defaults) : { ...this.defaults }
    this.listeners = new Set()
  }

  get(key) {
    return this.values[key]
  }

  snapshot() {
    return { ...this.values }
  }

  onChange(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  emit(reason) {
    const values = this.snapshot()
    for (const fn of this.listeners) fn(values, reason)
    this.save()
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values))
    } catch {
      /* storage unavailable — settings still apply for this session */
    }
  }

  /** Apply a full preset. */
  applyPreset(name) {
    const preset = PRESETS[name]
    if (!preset) return
    this.values = { ...this.values, ...preset.values, preset: name }
    this.emit('preset')
  }

  /** Patch one or more settings. Any visual change flags the preset as custom. */
  update(patch, { presetSensitive = true } = {}) {
    let changed = false
    for (const key of SETTING_KEYS) {
      if (!(key in patch)) continue
      const value = key === 'renderScale' || key === 'bloomStrength'
        ? clamp(Number(patch[key]), key === 'renderScale' ? 0.5 : 0, key === 'renderScale' ? 1 : 1.2)
        : !!patch[key]
      if (this.values[key] !== value) {
        this.values[key] = value
        changed = true
      }
    }
    if (!changed) return
    if (presetSensitive) this.values.preset = 'custom'
    this.emit('update')
  }

  toggle(key) {
    if (key === 'bloom' || key === 'grain' || key === 'scanlines' || key === 'showFps') {
      this.update({ [key]: !this.values[key] }, { presetSensitive: key === 'bloom' })
    }
  }

  reset() {
    this.values = { ...this.defaults }
    this.emit('reset')
  }
}

const $ = (id) => document.getElementById(id)

/**
 * Graphics overlay: preset rail, live sliders and toggles. Owns only the
 * settings UI; the renderer listens to GraphicsSettings changes in main.js.
 */
export class GraphicsPanel {
  constructor(settings, callbacks = {}) {
    this.settings = settings
    this.callbacks = callbacks
    this.root = $('graphics')
    this.source = 'title'
    this.openState = false
    this.el = {
      close: $('gx-close'),
      done: $('gx-done'),
      reset: $('gx-reset'),
      scale: $('gx-scale'),
      scaleOut: $('gx-scale-out'),
      bloom: $('gx-bloom'),
      bloomRow: $('gx-bloom-strength-row'),
      bloomStrength: $('gx-bloom-strength'),
      bloomOut: $('gx-bloom-out'),
      grain: $('gx-grain'),
      scanlines: $('gx-scanlines'),
      showFps: $('gx-fps-toggle'),
      current: $('gx-current'),
      fps: $('gx-fps'),
      device: $('gx-device'),
      presets: [...document.querySelectorAll('[data-preset]')],
    }
    this.bind()
    settings.onChange(() => this.sync())
    this.sync()
  }

  get isOpen() {
    return this.openState
  }

  bind() {
    for (const btn of this.el.presets) {
      btn.addEventListener('click', () => {
        this.settings.applyPreset(btn.dataset.preset)
        this.callbacks.onPreset?.(btn.dataset.preset)
      })
    }

    this.el.scale.addEventListener('input', () => {
      this.settings.update({ renderScale: Number(this.el.scale.value) / 100 })
    })

    this.el.bloomStrength.addEventListener('input', () => {
      this.settings.update({ bloomStrength: Number(this.el.bloomStrength.value) / 100 })
    })

    this.el.bloom.addEventListener('click', () => this.settings.toggle('bloom'))
    this.el.grain.addEventListener('click', () => this.settings.toggle('grain'))
    this.el.scanlines.addEventListener('click', () => this.settings.toggle('scanlines'))
    this.el.showFps.addEventListener('click', () => this.settings.toggle('showFps'))

    this.el.reset.addEventListener('click', () => this.settings.reset())
    this.el.close.addEventListener('click', () => this.close())
    this.el.done.addEventListener('click', () => this.close())
  }

  open(source = 'title') {
    this.source = source
    this.openState = true
    this.root.classList.add('open')
    this.root.setAttribute('aria-hidden', 'false')
    document.body.classList.add('graphics-open')
    const cores = navigator.hardwareConcurrency || 8
    this.el.device.textContent = `${cores}-CORE CPU · ${Math.round(window.devicePixelRatio * 100) / 100}× DPR`
    this.sync()
    this.callbacks.onOpen?.(source)
  }

  close() {
    if (!this.openState) return
    this.openState = false
    this.root.classList.remove('open')
    this.root.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('graphics-open')
    this.callbacks.onClose?.(this.source)
  }

  setFps(fps) {
    if (this.el.fps) this.el.fps.textContent = `${Math.round(fps)} FPS`
  }

  toggleSwitch(node, on) {
    node.setAttribute('aria-checked', String(on))
    node.classList.toggle('on', on)
  }

  sync() {
    const s = this.settings.values
    const preset = PRESETS[s.preset]
    for (const btn of this.el.presets) {
      btn.classList.toggle('active', btn.dataset.preset === s.preset)
    }

    const scalePct = Math.round(s.renderScale * 100)
    if (Number(this.el.scale.value) !== scalePct) this.el.scale.value = String(scalePct)
    this.el.scaleOut.textContent = `${scalePct}%`
    this.el.scale.style.setProperty('--fill', `${((s.renderScale - 0.5) / 0.5) * 100}%`)

    const strengthPct = Math.round(s.bloomStrength * 100)
    if (Number(this.el.bloomStrength.value) !== strengthPct) this.el.bloomStrength.value = String(strengthPct)
    this.el.bloomOut.textContent = s.bloom ? `${strengthPct}%` : 'OFF'
    this.el.bloomStrength.style.setProperty('--fill', `${(s.bloomStrength / 1.2) * 100}%`)
    this.el.bloomRow.classList.toggle('disabled', !s.bloom)
    this.el.bloomStrength.disabled = !s.bloom

    this.toggleSwitch(this.el.bloom, s.bloom)
    this.toggleSwitch(this.el.grain, s.grain)
    this.toggleSwitch(this.el.scanlines, s.scanlines)
    this.toggleSwitch(this.el.showFps, s.showFps)

    this.el.current.textContent = preset ? preset.label : 'CUSTOM'
    this.el.current.dataset.custom = preset ? 'false' : 'true'
  }
}
