import { CITY } from './city.js'
import { clamp } from './utils.js'

const $ = (id) => document.getElementById(id)

const DISTRICTS = [
  { name: 'NEON DISTRICT', test: (x, z) => z > 30 && z < 150 && Math.abs(x) < 60 },
  { name: 'DOWNTOWN LOS SANTOS', test: (x, z) => z < 30 && z > -150 && x < 60 },
  { name: 'VINEWOOD HILLS', test: (x, z) => z < -100 },
  { name: 'DEL PERRO BEACH', test: (x, z) => z > 150 && z < 232 },
  { name: 'EAST LOS SANTOS', test: (x) => x > 90 },
  { name: 'WEST LOS SANTOS', test: (x) => x < -90 },
  { name: 'SAN ANDREAS FREEWAY', test: () => true },
]

export class UI {
  constructor() {
    this.el = {
      hud: $('hud'), title: $('title'), play: $('play-btn'), minimap: $('minimap'),
      cash: $('cash'), clock: $('clock'), district: $('district-name'),
      wanted: [...document.querySelectorAll('#wanted .star')],
      missionCard: $('mission-card'), missionTitle: $('mission-title'), missionTarget: $('mission-target'),
      missionTimer: $('mission-timer'), missionDistance: $('mission-distance'), missionProgress: $('mission-progress'),
      healthBar: $('health-bar'), healthValue: $('health-value'),
      armorBar: $('armor-bar'), armorValue: $('armor-value'),
      vehiclePanel: $('vehicle-panel'), vBrand: $('v-brand'), vName: $('v-name'),
      speed: $('speed'), gear: $('gear'), vClass: $('v-class'), vMode: $('v-mode'),
      batteryBar: $('battery-bar'), batteryValue: $('battery-value'),
      interact: $('interact'), interactText: $('interact-text'),
      toastStack: $('toast-stack'), vehicleCard: $('vehicle-card'),
      vcName: $('vc-name'), vcSub: $('vc-sub'), vcSpeed: $('vc-speed'), vcAccel: $('vc-accel'), vcHandling: $('vc-handling'),
      mute: $('mute-btn'), touchAction: $('touch-action'), touchGas: $('touch-gas'),
      touchBrake: $('touch-brake'), touchBoost: $('touch-boost'), touchHandbrake: $('touch-handbrake'),
      joystick: $('joystick'), stick: document.querySelector('#joystick .stick'),
      loading: $('loading'), flash: $('flash'), busted: $('busted'), wasted: $('wasted'),
      cinematic: $('cinematic'), cineTitle: $('cine-title'), cineSub: $('cine-sub'),
    }
    this.cache = {}
    this.touch = { x: 0, y: 0, gas: false, brake: false, boost: false, handbrake: false }
    this.onAction = null
    this.onMute = null
    this.onPlay = null
    this.missionDistance = 0
    this.mapCanvas = document.createElement('canvas')
    this.mapCanvas.width = 512
    this.mapCanvas.height = 512
    this.mapCtx = this.mapCanvas.getContext('2d')
    this.mapReady = false
    this.timeouts = new Set()
    this.setup()
  }

  setup() {
    document.body.classList.add('title-mode')

    this.el.play.addEventListener('click', () => {
      if (this.playing) return
      this.playing = true
      this.el.title.classList.add('gone')
      document.body.classList.remove('title-mode')
      document.body.classList.add('playing')
      this.onPlay?.()
    })

    this.el.mute.addEventListener('click', (e) => {
      e.stopPropagation()
      const muted = document.body.classList.toggle('muted')
      this.el.mute.textContent = muted ? '×' : '♪'
      this.onMute?.(muted)
    })

    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    this.isTouch = isTouch
    document.body.classList.toggle('touch', isTouch)
    this.setupTouch()
  }

  setupTouch() {
    const stick = this.el.stick
    const joy = this.el.joystick
    let active = null
    const setStick = (dx, dy) => {
      const max = 40
      const dist = Math.hypot(dx, dy)
      const k = dist > max ? max / dist : 1
      const x = dx * k
      const y = dy * k
      stick.style.transform = `translate(${x}px, ${y}px)`
      this.touch.x = x / max
      this.touch.y = y / max
    }
    const move = (e) => {
      if (!active) return
      const rect = joy.getBoundingClientRect()
      setStick(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2))
    }
    const end = () => {
      active = null
      stick.style.transform = 'translate(0px, 0px)'
      this.touch.x = 0
      this.touch.y = 0
    }
    joy.addEventListener('pointerdown', (e) => {
      active = e.pointerId
      joy.setPointerCapture?.(e.pointerId)
      move(e)
      e.preventDefault()
    })
    joy.addEventListener('pointermove', move)
    joy.addEventListener('pointerup', end)
    joy.addEventListener('pointercancel', end)

    const hold = (btn, key) => {
      const on = (e) => { e.preventDefault(); this.touch[key] = true; btn.classList.add('held') }
      const off = (e) => { e?.preventDefault?.(); this.touch[key] = false; btn.classList.remove('held') }
      btn.addEventListener('pointerdown', on)
      btn.addEventListener('pointerup', off)
      btn.addEventListener('pointercancel', off)
      btn.addEventListener('pointerleave', off)
    }
    hold(this.el.touchGas, 'gas')
    hold(this.el.touchBrake, 'brake')
    hold(this.el.touchBoost, 'boost')
    hold(this.el.touchHandbrake, 'handbrake')
    this.el.touchAction.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      this.onAction?.()
    })
  }

  ready() {
    this.el.loading.classList.add('gone')
  }

  buildMap(world) {
    const ctx = this.mapCtx
    const S = 512
    const range = 560
    const off = 280
    const scale = S / range
    const px = (x) => (x + off) * scale
    const pz = (z) => (z + off) * scale

    ctx.clearRect(0, 0, S, S)
    // water / land
    ctx.fillStyle = '#182a38'
    ctx.fillRect(0, 0, S, S)
    ctx.fillStyle = '#38343c'
    ctx.fillRect(0, 0, S, pz(232))
    // hills
    ctx.fillStyle = '#2f3a36'
    ctx.fillRect(0, 0, S, pz(-168))
    // beach
    ctx.fillStyle = '#a98d66'
    ctx.fillRect(0, pz(168), S, pz(232) - pz(168))
    // ocean
    const grad = ctx.createLinearGradient(0, pz(232), 0, S)
    grad.addColorStop(0, '#2b6070')
    grad.addColorStop(1, '#172b3f')
    ctx.fillStyle = grad
    ctx.fillRect(0, pz(232), S, S - pz(232))
    // city asphalt
    ctx.fillStyle = '#23232d'
    ctx.fillRect(px(-168), pz(-168), px(168) - px(-168), pz(168) - pz(-168))

    for (const b of world.blockTypes) {
      const x = px(b.x - CITY.blockSize / 2)
      const y = pz(b.z - CITY.blockSize / 2)
      const w = CITY.blockSize * scale
      if (b.type === 'park') ctx.fillStyle = '#36523f'
      else if (b.type === 'parking') ctx.fillStyle = '#383946'
      else if (b.type === 'plaza') ctx.fillStyle = '#4b4156'
      else ctx.fillStyle = '#54505d'
      ctx.fillRect(x, y, w, w)
      if (b.type === 'buildings' || b.type === 'landmark') {
        ctx.fillStyle = '#6a6473'
        const inset = 7 * scale
        ctx.fillRect(x + inset, y + inset, w - inset * 2, w - inset * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        ctx.fillRect(x + inset, y + inset, (w - inset * 2) * 0.28, (w - inset * 2) * 0.28)
      }
      if (b.type === 'plaza') {
        ctx.fillStyle = '#ff5f9d'
        ctx.fillRect(px(-16), pz(56), 32 * scale, 2)
      }
    }

    // roads grid
    ctx.strokeStyle = '#1a1b23'
    ctx.lineWidth = CITY.road * scale
    for (const r of CITY.roadCenters) {
      ctx.beginPath(); ctx.moveTo(px(-168), pz(r)); ctx.lineTo(px(168), pz(r)); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px(r), pz(-168)); ctx.lineTo(px(r), pz(168)); ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(210,200,170,0.35)'
    ctx.lineWidth = 0.8
    for (const r of CITY.roadCenters) {
      ctx.beginPath(); ctx.moveTo(px(-168), pz(r)); ctx.lineTo(px(168), pz(r)); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px(r), pz(-168)); ctx.lineTo(px(r), pz(168)); ctx.stroke()
    }
    // shoreline
    ctx.strokeStyle = 'rgba(180,240,255,0.5)'
    ctx.lineWidth = 1.4
    ctx.beginPath(); ctx.moveTo(0, pz(232)); ctx.lineTo(S, pz(232)); ctx.stroke()
    // pier
    ctx.fillStyle = '#5d4430'
    ctx.fillRect(px(-83), pz(230), 10 * scale, 42 * scale)
    this.mapScale = scale
    this.mapReady = true
  }

  setText(id, value) {
    if (this.cache[id] === value) return
    this.cache[id] = value
    const node = this.el[id] || document.getElementById(id)
    if (node) node.textContent = value
  }

  setPlaying(isPlaying) {
    this.playing = isPlaying
    document.body.classList.toggle('playing', isPlaying)
    document.body.classList.toggle('title-mode', !isPlaying)
    if (isPlaying) this.el.title.classList.add('gone')
    else this.el.title.classList.remove('gone')
  }

  update(state) {
    if (!this.playing) return
    const s = state
    this.setText('speed', String(Math.round(Math.abs(s.speedKmh || 0))))
    this.setText('gear', s.gear || 'N')
    this.setText('cash', (s.cash ?? 0).toLocaleString('en-US'))
    this.setText('clock', s.clock || '19:42')
    this.setText('district', s.district || 'LOS SANTOS')

    const hp = clamp(Math.round(s.health ?? 100), 0, 100)
    const armor = clamp(Math.round(s.armor ?? 0), 0, 100)
    if (this.cache.hp !== hp) {
      this.cache.hp = hp
      this.el.healthBar.style.width = `${hp}%`
      this.el.healthValue.textContent = hp
    }
    if (this.cache.armor !== armor) {
      this.cache.armor = armor
      this.el.armorBar.style.width = `${armor}%`
      this.el.armorValue.textContent = armor
    }

    const wanted = s.wanted || 0
    if (this.cache.wanted !== wanted) {
      this.cache.wanted = wanted
      this.el.wanted.forEach((star, i) => star.classList.toggle('on', i < wanted))
    }

    if (s.vehicle) {
      this.el.vehiclePanel.classList.remove('hidden')
      const v = s.vehicle
      this.setText('vBrand', v.brand)
      this.setText('vName', v.name)
      this.setText('vClass', v.className)
      this.setText('vMode', v.drivetrain)
      const batt = clamp(Math.round(s.battery ?? 100), 0, 100)
      if (this.cache.batt !== batt) {
        this.cache.batt = batt
        this.el.batteryBar.style.transform = `scaleX(${batt / 100})`
        this.el.batteryValue.textContent = `${batt}%`
      }
      this.el.vehiclePanel.style.borderRightColor = `#${v.accent.toString(16).padStart(6, '0')}`
    } else {
      this.el.vehiclePanel.classList.add('hidden')
    }

    if (s.prompt) {
      this.el.interact.classList.add('show')
      this.setText('interactText', s.prompt)
      if (this.isTouch) this.el.touchAction.textContent = s.prompt.includes('EXIT') ? '↩' : 'E'
    } else {
      this.el.interact.classList.remove('show')
    }

    if (s.mission) {
      this.el.missionCard.classList.remove('hidden')
      this.setText('missionTitle', s.mission.title)
      this.setText('missionTarget', s.mission.target)
      this.setText('missionTimer', s.mission.timerText)
      this.setText('missionDistance', s.mission.distanceText)
      const prog = clamp(s.mission.progress, 0, 1)
      this.el.missionProgress.style.width = `${Math.max(2, prog * 100)}%`
    } else {
      this.el.missionCard.classList.add('hidden')
    }

    this.drawMinimap(s)
  }

  drawMinimap(s) {
    if (!this.mapReady) return
    const c = this.el.minimap
    const ctx = c.getContext('2d')
    const W = c.width
    const half = W / 2
    const zoom = 2.05
    ctx.save()
    ctx.clearRect(0, 0, W, W)
    ctx.beginPath()
    ctx.arc(half, half, half - 2, 0, Math.PI * 2)
    ctx.clip()
    ctx.fillStyle = '#111722'
    ctx.fillRect(0, 0, W, W)

    const px = (s.player.x + 280) * this.mapScale
    const pz = (s.player.z + 280) * this.mapScale
    ctx.translate(half, half)
    ctx.rotate(Math.PI - (s.player.heading || 0))
    ctx.scale(zoom, zoom)
    ctx.drawImage(this.mapCanvas, -px, -pz)

    // map markers in rotated space
    const drawDot = (wx, wz, color, size = 3.4, glow = false) => {
      const x = (wx + 280) * this.mapScale - px
      const z = (wz + 280) * this.mapScale - pz
      if (glow) {
        ctx.shadowColor = color
        ctx.shadowBlur = 12
      }
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, z, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
    if (s.markers?.shards) for (const p of s.markers.shards) drawDot(p.x, p.z, '#66f4ff', 2.2)
    if (s.markers?.traffic) {
      for (const p of s.markers.traffic) drawDot(p.x, p.z, p.police ? '#ff4f6a' : 'rgba(255,255,255,0.5)', p.police ? 3.2 : 2.3)
    }
    if (s.markers?.mission) {
      const mx = (s.markers.mission.x + 280) * this.mapScale - px
      const mz = (s.markers.mission.z + 280) * this.mapScale - pz
      ctx.save()
      ctx.translate(mx, mz)
      ctx.rotate(-(Math.PI - (s.player.heading || 0)))
      ctx.fillStyle = '#ffc857'
      ctx.shadowColor = '#ffc857'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.moveTo(0, -7); ctx.lineTo(6, 0); ctx.lineTo(0, 7); ctx.lineTo(-6, 0); ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    ctx.restore()

    // player arrow
    ctx.save()
    ctx.translate(half, half)
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = '#66f4ff'
    ctx.shadowBlur = 12
    ctx.beginPath()
    ctx.moveTo(0, -9)
    ctx.lineTo(6.5, 7)
    ctx.lineTo(0, 3.8)
    ctx.lineTo(-6.5, 7)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  setPrompt(text) {
    this._prompt = text
  }

  toast(text, kind = '', duration = 2600) {
    const div = document.createElement('div')
    div.className = `toast ${kind}`
    div.textContent = text
    this.el.toastStack.appendChild(div)
    while (this.el.toastStack.children.length > 4) this.el.toastStack.firstChild.remove()
    const t1 = setTimeout(() => {
      div.classList.add('out')
      const t2 = setTimeout(() => div.remove(), 340)
      this.timeouts.add(t2)
    }, duration)
    this.timeouts.add(t1)
  }

  showVehicleCard(vehicle) {
    const t = vehicle.type
    this.el.vcName.textContent = t.name
    this.el.vcSub.textContent = `${t.brand} · ${t.className}`
    this.el.vcSpeed.textContent = t.spec.top
    this.el.vcAccel.textContent = t.spec.accel.toFixed(1)
    this.el.vcHandling.textContent = t.spec.handling
    this.el.vehicleCard.classList.add('show')
    clearTimeout(this._cardTimeout)
    this._cardTimeout = setTimeout(() => this.el.vehicleCard.classList.remove('show'), 3800)
  }

  showEnd(kind) {
    this.el.busted.classList.toggle('show', kind === 'busted')
    this.el.wasted.classList.toggle('show', kind === 'wasted')
  }

  hideEnd() {
    this.el.busted.classList.remove('show')
    this.el.wasted.classList.remove('show')
  }

  flash() {
    this.el.flash.classList.remove('go')
    void this.el.flash.offsetWidth
    this.el.flash.classList.add('go')
  }

  showCinematic(title, sub, duration = 2400) {
    this.el.cineTitle.textContent = title
    this.el.cineSub.textContent = sub
    this.el.cinematic.classList.add('show')
    clearTimeout(this._cineTimeout)
    this._cineTimeout = setTimeout(() => this.el.cinematic.classList.remove('show'), duration)
  }

  districtFor(x, z) {
    for (const d of DISTRICTS) if (d.test(x, z)) return d.name
    return 'LOS SANTOS'
  }
}
