// Procedural soundscape: synthwave radio, electric drivetrain, impacts and UI cues.
const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12)

export class GameAudio {
  constructor() {
    this.ctx = null
    this.muted = false
    this.started = false
    this.driving = false
    this.sirenOn = false
    this.nextNoteTime = 0
    this.step = 0
    this.timer = null
    this.tempo = 94
    this.speed = 0
    this.throttle = 0
  }

  init() {
    if (this.ctx) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return
      this.ctx = new AC()
      const ctx = this.ctx
      this.master = ctx.createGain()
      this.master.gain.value = 0.62
      this.compressor = ctx.createDynamicsCompressor()
      this.compressor.threshold.value = -18
      this.compressor.knee.value = 22
      this.compressor.ratio.value = 6
      this.master.connect(this.compressor)
      this.compressor.connect(ctx.destination)

      this.musicGain = ctx.createGain()
      this.musicGain.gain.value = 0.22
      this.musicGain.connect(this.master)

      this.sfxGain = ctx.createGain()
      this.sfxGain.gain.value = 0.5
      this.sfxGain.connect(this.master)

      this.engineGain = ctx.createGain()
      this.engineGain.gain.value = 0
      this.engineGain.connect(this.master)

      // delay send for arpeggios
      this.delay = ctx.createDelay(1.0)
      this.delay.delayTime.value = 0.34
      this.delayFeedback = ctx.createGain()
      this.delayFeedback.gain.value = 0.34
      this.delay.connect(this.delayFeedback)
      this.delayFeedback.connect(this.delay)
      const wet = ctx.createGain()
      wet.gain.value = 0.2
      this.delay.connect(wet)
      wet.connect(this.musicGain)

      this.noiseBuffer = this.makeNoise(2)
      this.startEngine()
      this.startMusic()
      this.started = true
      this.applyMute()
      ctx.resume?.()
    } catch (err) {
      console.warn('audio unavailable', err)
    }
  }

  makeNoise(seconds = 1) {
    const ctx = this.ctx
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  /* ---------------------------------------------------------- engine + tires */

  startEngine() {
    const ctx = this.ctx
    this.engineFilter = ctx.createBiquadFilter()
    this.engineFilter.type = 'lowpass'
    this.engineFilter.frequency.value = 280
    this.engineFilter.Q.value = 2.2
    this.engineFilter.connect(this.engineGain)

    this.engineOscA = ctx.createOscillator()
    this.engineOscA.type = 'sawtooth'
    this.engineOscA.frequency.value = 42
    const gainA = ctx.createGain()
    gainA.gain.value = 0.12
    this.engineOscA.connect(gainA)
    gainA.connect(this.engineFilter)
    this.engineOscA.start()

    this.engineOscB = ctx.createOscillator()
    this.engineOscB.type = 'square'
    this.engineOscB.frequency.value = 86
    const gainB = ctx.createGain()
    gainB.gain.value = 0.035
    this.engineOscB.connect(gainB)
    gainB.connect(this.engineFilter)
    this.engineOscB.start()

    this.whine = ctx.createOscillator()
    this.whine.type = 'sine'
    this.whine.frequency.value = 640
    const whineGain = ctx.createGain()
    whineGain.gain.value = 0.025
    this.whine.connect(whineGain)
    whineGain.connect(this.engineGain)
    this.whine.start()

    const noise = ctx.createBufferSource()
    noise.buffer = this.noiseBuffer
    noise.loop = true
    this.tireFilter = ctx.createBiquadFilter()
    this.tireFilter.type = 'bandpass'
    this.tireFilter.frequency.value = 1800
    this.tireFilter.Q.value = 1.4
    this.tireGain = ctx.createGain()
    this.tireGain.gain.value = 0
    noise.connect(this.tireFilter)
    this.tireFilter.connect(this.tireGain)
    this.tireGain.connect(this.master)
    noise.start()
  }

  updateEngine({ driving, speed, throttle, braking, boosting, drifting }) {
    if (!this.ctx) return
    const t = this.ctx.currentTime
    const targetGain = driving ? 0.15 + Math.abs(throttle) * 0.12 : 0
    this.engineGain.gain.setTargetAtTime(targetGain, t, 0.08)
    const spd = Math.abs(speed)
    const base = 38 + Math.min(spd, 90) * 2.4
    this.engineOscA.frequency.setTargetAtTime(base, t, 0.05)
    this.engineOscB.frequency.setTargetAtTime(base * 2.03, t, 0.05)
    this.whine.frequency.setTargetAtTime(520 + spd * 26, t, 0.05)
    this.engineFilter.frequency.setTargetAtTime(180 + spd * 20 + Math.abs(throttle) * 140, t, 0.08)
    const tire = driving && drifting && spd > 8 ? Math.min(0.1, spd * 0.0018) : 0
    this.tireGain.gain.setTargetAtTime(tire, t, 0.06)
    this.engineGain.gain.setTargetAtTime(targetGain + (boosting ? 0.035 : 0), t, 0.08)
  }

  /* --------------------------------------------------------------- music */

  startMusic() {
    const ctx = this.ctx
    this.nextNoteTime = ctx.currentTime + 0.1
    this.timer = setInterval(() => this.scheduler(), 60)
  }

  scheduler() {
    if (!this.ctx) return
    const ahead = 0.16
    while (this.nextNoteTime < this.ctx.currentTime + ahead) {
      this.scheduleStep(this.step, this.nextNoteTime)
      this.nextNoteTime += 60 / this.tempo / 4
      this.step++
      if (this.step >= 64) this.step = 0
    }
  }

  scheduleStep(step, time) {
    const ctx = this.ctx
    const bar = Math.floor(step / 16) % 4
    const chords = [
      [57, 60, 64, 69], // Am7
      [53, 57, 60, 65], // Fmaj7
      [48, 55, 60, 64], // Cmaj7
      [55, 59, 62, 67], // G
    ]
    const roots = [33, 29, 36, 31]
    const chord = chords[bar]

    if (step % 16 === 0) {
      for (const n of chord.slice(0, 3)) {
        this.pad(NOTE(n - 12), time, 4.2, 0.024)
      }
    }
    // bass pulse
    if (step % 4 === 0) {
      this.pluck(NOTE(roots[bar]), time, 0.4, 0.07, 'sawtooth', 280)
    }
    if (step % 8 === 4) {
      this.pluck(NOTE(roots[bar] + 12), time, 0.18, 0.035, 'triangle', 420)
    }
    // arp
    if (step % 2 === 0) {
      const pattern = [0, 2, 1, 3, 2, 1, 3, 0]
      const n = chord[pattern[(step / 2) % 8]]
      this.pluck(NOTE(n + 12), time, 0.13, 0.03, 'triangle', 1800, this.delay)
    }
    // hats
    if (step % 2 === 1) this.hat(time, step % 4 === 3 ? 0.035 : 0.018)
    // kick
    if (step % 4 === 0) this.kick(time)
    // clap-ish
    if (step % 16 === 4 || step % 16 === 12) this.hat(time, 0.05, 1300)
  }

  pad(freq, time, dur, vol) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1100
    filter.Q.value = 0.6
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.linearRampToValueAtTime(vol, time + 0.5)
    gain.gain.linearRampToValueAtTime(vol * 0.7, time + dur * 0.7)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicGain)
    osc.start(time)
    osc.stop(time + dur + 0.05)
  }

  pluck(freq, time, dur, vol, type = 'triangle', cutoff = 2000, destination = null) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.value = freq
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = cutoff
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.linearRampToValueAtTime(vol, time + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicGain)
    if (destination) gain.connect(destination)
    osc.start(time)
    osc.stop(time + dur + 0.02)
  }

  kick(time) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(130, time)
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.14, time)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3)
    osc.connect(gain)
    gain.connect(this.musicGain)
    osc.start(time)
    osc.stop(time + 0.32)
  }

  hat(time, vol = 0.02, cutoff = 6500) {
    const ctx = this.ctx
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = cutoff
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(vol, time)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicGain)
    src.start(time)
    src.stop(time + 0.08)
  }

  /* ------------------------------------------------------------------ sfx */

  blip(freq = 660, dur = 0.1, vol = 0.06, type = 'sine') {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.linearRampToValueAtTime(vol, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(gain)
    gain.connect(this.sfxGain)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  chime() {
    this.blip(880, 0.16, 0.055)
    setTimeout(() => this.blip(1320, 0.22, 0.05), 80)
  }

  cash() {
    this.blip(990, 0.09, 0.05)
    setTimeout(() => this.blip(1480, 0.13, 0.045), 65)
    setTimeout(() => this.blip(1760, 0.2, 0.04), 140)
  }

  enterCar() {
    this.blip(180, 0.2, 0.07, 'sawtooth')
    setTimeout(() => this.blip(420, 0.15, 0.04), 60)
  }

  crash(intensity = 1) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1500, t)
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.3)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.18 * Math.min(1.6, intensity), t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
    src.connect(filter)
    filter.connect(gain)
    gain.connect(this.sfxGain)
    src.start(t)
    src.stop(t + 0.42)
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(90, t)
    osc.frequency.exponentialRampToValueAtTime(36, t + 0.25)
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0.14, t)
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
    osc.connect(g2)
    g2.connect(this.sfxGain)
    osc.start(t)
    osc.stop(t + 0.32)
  }

  horn() {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime
    for (const f of [392, 494]) {
      const osc = ctx.createOscillator()
      osc.type = 'square'
      osc.frequency.value = f
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.linearRampToValueAtTime(0.035, t + 0.02)
      gain.gain.setValueAtTime(0.035, t + 0.17)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28)
      osc.connect(gain)
      gain.connect(this.sfxGain)
      osc.start(t)
      osc.stop(t + 0.3)
    }
  }

  setMuted(muted) {
    this.muted = muted
    this.applyMute()
  }

  applyMute() {
    if (!this.ctx) return
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.62, this.ctx.currentTime, 0.05)
  }

  setSiren(on) {
    if (!this.ctx) return
    if (on && !this.sirenOn) {
      this.sirenOn = true
      const ctx = this.ctx
      this.sirenOsc = ctx.createOscillator()
      this.sirenOsc.type = 'square'
      this.sirenOsc.frequency.value = 720
      this.sirenLfo = ctx.createOscillator()
      this.sirenLfo.type = 'sine'
      this.sirenLfo.frequency.value = 1.7
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 220
      this.sirenLfo.connect(lfoGain)
      lfoGain.connect(this.sirenOsc.frequency)
      this.sirenGain = ctx.createGain()
      this.sirenGain.gain.value = 0.018
      this.sirenOsc.connect(this.sirenGain)
      this.sirenGain.connect(this.sfxGain)
      this.sirenOsc.start()
      this.sirenLfo.start()
    } else if (!on && this.sirenOn) {
      this.sirenOn = false
      try {
        this.sirenGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1)
        this.sirenOsc.stop(this.ctx.currentTime + 0.4)
        this.sirenLfo.stop(this.ctx.currentTime + 0.4)
      } catch {}
    }
  }

  suspend() {
    this.ctx?.suspend?.()
  }
  resume() {
    this.ctx?.resume?.()
  }
}
