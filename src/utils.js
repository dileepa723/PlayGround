import * as THREE from 'three'

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt))
export const rnd = (a = 0, b = 1) => a + Math.random() * (b - a)
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function makeRng(seed) {
  const r = mulberry32(seed)
  return {
    next: r,
    range: (a, b) => a + r() * (b - a),
    int: (a, b) => Math.floor(a + r() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(r() * arr.length)],
    chance: (p) => r() < p,
  }
}

export function canvas2d(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  return { c, ctx }
}

export function canvasTexture(c, { repeat = null, srgb = true } = {}) {
  const tex = new THREE.CanvasTexture(c)
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(repeat[0], repeat[1])
  }
  return tex
}

/* ------------------------------------------------------------------ textures */

export function asphaltTexture() {
  const { c, ctx } = canvas2d(256, 256)
  ctx.fillStyle = '#20212b'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 3400; i++) {
    const v = 24 + Math.random() * 45
    ctx.fillStyle = `rgba(${v},${v + 2},${v + 8},${0.15 + Math.random() * 0.4})`
    const s = Math.random() * 2 + 0.4
    ctx.fillRect(Math.random() * 256, Math.random() * 256, s, s)
  }
  for (let i = 0; i < 7; i++) {
    ctx.strokeStyle = 'rgba(8,8,12,0.24)'
    ctx.lineWidth = 0.8
    ctx.beginPath()
    let x = Math.random() * 256
    let y = Math.random() * 256
    ctx.moveTo(x, y)
    for (let j = 0; j < 6; j++) {
      x += (Math.random() - 0.5) * 26
      y += Math.random() * 18
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  return canvasTexture(c, { repeat: [34, 34] })
}

export function sidewalkTexture() {
  const { c, ctx } = canvas2d(256, 256)
  ctx.fillStyle = '#b9b0a3'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 2200; i++) {
    const v = 150 + Math.random() * 70
    ctx.fillStyle = `rgba(${v},${v - 5},${v - 15},${Math.random() * 0.35})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4)
  }
  ctx.strokeStyle = 'rgba(60,55,50,0.28)'
  ctx.lineWidth = 2
  for (let i = 0; i <= 4; i++) {
    const p = i * 64
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 256); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(256, p); ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(i * 64 + 2, 0); ctx.lineTo(i * 64 + 2, 256); ctx.stroke()
  }
  return canvasTexture(c, { repeat: [2, 2] })
}

export function sandTexture() {
  const { c, ctx } = canvas2d(256, 256)
  ctx.fillStyle = '#d8b98d'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 5000; i++) {
    const v = Math.random()
    ctx.fillStyle = v > 0.5 ? 'rgba(120,88,56,0.18)' : 'rgba(255,245,220,0.22)'
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.3, 1.3)
  }
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = 'rgba(255,240,215,0.12)'
    ctx.beginPath()
    ctx.arc(Math.random() * 256, Math.random() * 256, 20 + Math.random() * 60, 0, Math.PI)
    ctx.stroke()
  }
  return canvasTexture(c, { repeat: [10, 10] })
}

export function grassTexture() {
  const { c, ctx } = canvas2d(256, 256)
  ctx.fillStyle = '#3f613c'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 4600; i++) {
    const g = 60 + Math.random() * 70
    ctx.fillStyle = `rgba(${g * 0.55},${g},${g * 0.5},${0.25 + Math.random() * 0.4})`
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 2.6)
  }
  return canvasTexture(c, { repeat: [3, 3] })
}

const FACADES = [
  { base: '#d8b6a2', trim: '#f0d8c8', win: '#1d2a3a', lit: '#ffd79a', accent: '#ff7f9f' },
  { base: '#8fb2b2', trim: '#c8ded8', win: '#132432', lit: '#a9ecff', accent: '#47e7d4' },
  { base: '#c6aecb', trim: '#e6d5e8', win: '#1b2036', lit: '#ffb8e2', accent: '#ff62b0' },
  { base: '#b9bcc4', trim: '#dde0e5', win: '#151d2b', lit: '#bcd4ff', accent: '#7a9dff' },
  { base: '#d6c6a4', trim: '#efe4c9', win: '#202432', lit: '#ffe1a1', accent: '#ffbf4d' },
  { base: '#8f9b90', trim: '#c6d0c4', win: '#16222a', lit: '#c5ffd0', accent: '#6dffa6' },
]

export function facadeTextures(variant = 0, seed = 1) {
  const f = FACADES[variant % FACADES.length]
  const rand = makeRng(seed)
  const W = 256, H = 512
  const { c, ctx } = canvas2d(W, H)
  const { c: ec, ctx: ectx } = canvas2d(W, H)

  ctx.fillStyle = f.base
  ctx.fillRect(0, 0, W, H)
  ectx.fillStyle = '#000'
  ectx.fillRect(0, 0, W, H)

  for (let i = 0; i < 1600; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2)
  }

  const cols = 7, rows = 16
  const padX = 16, padY = 16
  const cw = (W - padX * 2) / cols
  const ch = (H - padY * 2) / rows
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = padX + col * cw + 3
      const y = padY + r * ch + 4
      const w = cw - 7
      const h = ch - 9
      ctx.fillStyle = f.win
      ctx.fillRect(x, y, w, h)
      const lit = rand.chance(0.34)
      if (lit) {
        const grad = ctx.createLinearGradient(x, y, x, y + h)
        grad.addColorStop(0, f.lit)
        grad.addColorStop(1, f.win)
        ctx.fillStyle = grad
        ctx.globalAlpha = 0.55 + rand.next() * 0.35
        ctx.fillRect(x, y, w, h)
        ctx.globalAlpha = 1
        ectx.fillStyle = f.lit
        ectx.globalAlpha = 0.5 + rand.next() * 0.5
        ectx.fillRect(x, y, w, h)
        ectx.globalAlpha = 1
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, y + 0.5, w, h)
    }
    if (r % 4 === 3) {
      ctx.fillStyle = f.trim
      ctx.fillRect(0, padY + (r + 1) * ch - 3, W, 5)
    }
  }

  ctx.fillStyle = f.trim
  ctx.fillRect(0, 0, W, 10)
  ctx.fillRect(0, H - 14, W, 14)
  ctx.fillStyle = f.accent
  ctx.globalAlpha = 0.55
  ctx.fillRect(W - 5, 0, 3, H)
  ctx.globalAlpha = 1

  return {
    map: canvasTexture(c),
    emissiveMap: canvasTexture(ec),
    accent: f.accent,
  }
}

export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const { c, ctx } = canvas2d(128, 128)
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, inner)
  g.addColorStop(0.25, inner)
  g.addColorStop(0.6, outer.replace(/[\d.]+\)$/, '0.25)'))
  g.addColorStop(1, outer)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return canvasTexture(c)
}

export function shadowTexture() {
  const { c, ctx } = canvas2d(128, 128)
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.55, 'rgba(0,0,0,0.3)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  return canvasTexture(c)
}

export function labelTexture(name, sub, accent = '#66f4ff') {
  const { c, ctx } = canvas2d(512, 128)
  ctx.clearRect(0, 0, 512, 128)
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(5,6,12,0.7)'
  ctx.beginPath()
  ctx.roundRect(66, 16, 380, 92, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = accent
  ctx.fillRect(82, 40, 4, 44)
  ctx.font = '900 40px "Arial Black", Arial, sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(name, 270, 62)
  ctx.font = '800 15px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.letterSpacing = '2px'
  ctx.fillText(sub, 270, 90)
  const tex = canvasTexture(c)
  return tex
}

export function signTexture(text, { color = '#ff4f9a', bg = 'rgba(8,8,18,0.9)', sub = '', w = 1024, h = 256, font = 900, align = 'center' } = {}) {
  const { c, ctx } = canvas2d(w, h)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = color
  ctx.lineWidth = 5
  ctx.strokeRect(12, 12, w - 24, h - 24)
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  const x = align === 'center' ? w / 2 : 36
  ctx.font = `${font} ${sub ? h * 0.42 : h * 0.5}px "Arial Black", Arial, sans-serif`
  ctx.shadowColor = color
  ctx.shadowBlur = 28
  ctx.fillStyle = '#fff'
  ctx.fillText(text, x, sub ? h * 0.42 : h * 0.5)
  ctx.shadowBlur = 14
  ctx.fillStyle = color
  ctx.globalAlpha = 0.55
  ctx.fillText(text, x, sub ? h * 0.4 : h * 0.48)
  ctx.globalAlpha = 1
  if (sub) {
    ctx.shadowBlur = 0
    ctx.font = '800 26px Arial, sans-serif'
    ctx.fillStyle = color
    ctx.fillText(sub, x, h * 0.78)
  }
  return canvasTexture(c)
}

export function billboardTexture(lines, colors = ['#ff2e7e', '#66f4ff'], w = 512, h = 512) {
  const { c, ctx } = canvas2d(w, h)
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#100b22')
  grad.addColorStop(1, '#25112f')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = colors[1]
  ctx.lineWidth = 8
  ctx.strokeRect(18, 18, w - 36, h - 36)
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`
    ctx.fillRect(0, Math.random() * h, w, 2)
  }
  ctx.textAlign = 'center'
  const n = lines.length
  lines.forEach((line, i) => {
    ctx.font = i === 0 ? '900 78px "Arial Black", Arial, sans-serif' : '800 34px Arial, sans-serif'
    ctx.fillStyle = i === 0 ? '#fff' : colors[0]
    ctx.shadowColor = i === 0 ? colors[0] : 'transparent'
    ctx.shadowBlur = i === 0 ? 24 : 0
    ctx.fillText(line, w / 2, h * 0.35 + i * (n > 2 ? 72 : 84))
  })
  return canvasTexture(c)
}

export function addGlow(parent, texture, color, size, position, opacity = 0.9) {
  const mat = new THREE.SpriteMaterial({
    map: texture,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(size, size, 1)
  sprite.position.copy(position)
  parent.add(sprite)
  return sprite
}

export function addBlobShadow(parent, size = 4, opacity = 1, y = 0.04) {
  const geo = new THREE.PlaneGeometry(size, size)
  const mat = new THREE.MeshBasicMaterial({
    map: getShadowTex(),
    transparent: true,
    opacity,
    depthWrite: false,
    toneMapped: false,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = y
  mesh.renderOrder = 2
  parent.add(mesh)
  return mesh
}

let _shadowTex = null
function getShadowTex() {
  if (!_shadowTex) _shadowTex = shadowTexture()
  return _shadowTex
}
