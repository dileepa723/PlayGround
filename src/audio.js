const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.started = false;
    this.mode = "menu";
    this.scannerTimer = 0;
    this.scannerSide = 1;
    this.musicStep = 0;
    this.nextNoteTime = 0;
    this.lastUpdate = 0;
    this.noiseBuffer = null;
  }

  init() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      this.enabled = false;
      return;
    }
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.85;
    this.comp = this.ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.knee.value = 18;
    this.comp.ratio.value = 5;
    this.comp.attack.value = 0.004;
    this.comp.release.value = 0.22;
    this.master.connect(this.comp);
    this.comp.connect(this.ctx.destination);

    this.musicBus = this.ctx.createGain();
    this.musicBus.gain.value = 0.22;
    this.musicBus.connect(this.master);

    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.value = 0.5;
    this.sfxBus.connect(this.master);

    this.delay = this.ctx.createDelay(1);
    this.delay.delayTime.value = 0.24;
    const feedback = this.ctx.createGain();
    feedback.gain.value = 0.24;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.18;
    this.delay.connect(feedback);
    feedback.connect(this.delay);
    this.delay.connect(wet);
    wet.connect(this.musicBus);

    this._makeNoise();
    this._initEngine();
  }

  _makeNoise() {
    const len = this.ctx.sampleRate * 2;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buf;
  }

  _initEngine() {
    const ctx = this.ctx;
    this.engineGain = ctx.createGain();
    this.engineGain.gain.value = 0;
    this.engineFilter = ctx.createBiquadFilter();
    this.engineFilter.type = "lowpass";
    this.engineFilter.frequency.value = 340;
    this.engineFilter.Q.value = 3.2;
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.sfxBus);

    this.engineOsc1 = ctx.createOscillator();
    this.engineOsc1.type = "sawtooth";
    this.engineOsc1.frequency.value = 42;
    this.engineOsc2 = ctx.createOscillator();
    this.engineOsc2.type = "square";
    this.engineOsc2.frequency.value = 21;
    const g2 = ctx.createGain();
    g2.gain.value = 0.45;
    this.engineOsc1.connect(this.engineFilter);
    this.engineOsc2.connect(g2);
    g2.connect(this.engineFilter);
    this.engineOsc1.start();
    this.engineOsc2.start();

    this.engineNoise = ctx.createBufferSource();
    this.engineNoise.buffer = this.noiseBuffer;
    this.engineNoise.loop = true;
    this.engineNoiseFilter = ctx.createBiquadFilter();
    this.engineNoiseFilter.type = "bandpass";
    this.engineNoiseFilter.frequency.value = 180;
    this.engineNoiseFilter.Q.value = 0.8;
    this.engineNoiseGain = ctx.createGain();
    this.engineNoiseGain.gain.value = 0;
    this.engineNoise.connect(this.engineNoiseFilter);
    this.engineNoiseFilter.connect(this.engineNoiseGain);
    this.engineNoiseGain.connect(this.sfxBus);
    this.engineNoise.start();
  }

  async start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {}
    }
    this.started = true;
    this.nextNoteTime = this.ctx.currentTime + 0.08;
  }

  setEnabled(on) {
    this.enabled = on;
    if (!this.ctx) return;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(on ? 0.85 : 0, this.ctx.currentTime + 0.15);
  }

  setMode(mode) {
    this.mode = mode;
    if (!this.ctx) return;
    const target = mode === "playing" ? 0.24 : mode === "paused" ? 0.09 : 0.16;
    this.musicBus.gain.cancelScheduledValues(this.ctx.currentTime);
    this.musicBus.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.4);
  }

  update(dt, { speedNorm = 0, boost = false, playing = false } = {}) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;

    if (this.engineGain) {
      const targetGain = playing ? 0.11 + speedNorm * 0.05 : 0.018;
      this.engineGain.gain.setTargetAtTime(targetGain, now, 0.12);
      const base = 34 + speedNorm * 92 + (boost ? 22 : 0);
      this.engineOsc1.frequency.setTargetAtTime(base, now, 0.09);
      this.engineOsc2.frequency.setTargetAtTime(base * 0.5, now, 0.09);
      this.engineFilter.frequency.setTargetAtTime(240 + speedNorm * 900 + (boost ? 380 : 0), now, 0.1);
      this.engineNoiseGain.gain.setTargetAtTime(playing ? 0.02 + speedNorm * 0.035 : 0, now, 0.2);
      this.engineNoiseFilter.frequency.setTargetAtTime(140 + speedNorm * 280, now, 0.1);
    }

    if (playing || this.mode === "menu") {
      this.scannerTimer -= dt;
      if (this.scannerTimer <= 0) {
        this.scannerTimer = 1.15;
        this.scannerPing(playing ? 0.55 : 0.42);
      }
    }

    if (this.mode !== "paused") this._scheduleMusic(now);
  }

  _scheduleMusic(now) {
    if (!this.started) return;
    if (this.nextNoteTime < now - 0.4) this.nextNoteTime = now + 0.05;
    const stepDur = 60 / 96 / 4;
    while (this.nextNoteTime < now + 0.22) {
      this._playStep(this.musicStep, this.nextNoteTime, stepDur);
      this.nextNoteTime += stepDur;
      this.musicStep = (this.musicStep + 1) % 64;
    }
  }

  _playStep(step, t, stepDur) {
    const bar = Math.floor(step / 16);
    const s = step % 16;
    // Am - F - C - G
    const roots = [45, 41, 48, 43];
    const chords = [
      [57, 60, 64],
      [53, 57, 60],
      [55, 60, 64],
      [55, 59, 62],
    ];
    const root = roots[bar];
    const chord = chords[bar];

    // Arpeggio lead
    if (s % 2 === 0 || s === 7 || s === 15) {
      const order = [0, 1, 2, 1, 2, 0, 1, 2];
      const idx = order[(step % 8)] + (s >= 12 ? 12 : 0);
      const note = chord[s % 3] + 12 + (idx % 2 === 0 ? 0 : 12);
      this._tone(midi(note), t, stepDur * 1.4, "triangle", 0.055, this.musicBus, this.delay);
    }

    // Pads at start of each bar
    if (s === 0) {
      for (const n of chord) {
        this._pad(midi(n - 12), t, stepDur * 16, 0.022);
      }
    }

    // Bass eighths
    if (s % 2 === 0) {
      const bassNote = root - 12 + (s === 6 || s === 14 ? 7 : 0);
      this._tone(midi(bassNote), t, stepDur * 1.7, "sawtooth", 0.12, this.musicBus, null, 120 + (s % 4) * 60, 4);
    }

    // Drums
    if (s % 4 === 0) this._kick(t);
    if (s === 4 || s === 12) this._snare(t);
    if (s % 2 === 0) this._hat(t, s % 4 === 0 ? 0.05 : 0.03);
  }

  _tone(freq, t, dur, type, gain, bus, delaySend = null, cutoff = 0, q = 0.7) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = osc;
    if (cutoff) {
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(cutoff, t);
      f.Q.value = q;
      osc.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(bus);
    if (delaySend) g.connect(delaySend);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    setTimeout(() => {
      try {
        osc.disconnect();
        g.disconnect();
      } catch {}
    }, (dur + 0.5) * 1000);
  }

  _pad(freq, t, dur, gain) {
    const ctx = this.ctx;
    for (const detune of [-7, 7]) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(500, t);
      f.frequency.linearRampToValueAtTime(1100, t + dur * 0.5);
      f.frequency.linearRampToValueAtTime(420, t + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.65);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      osc.connect(f);
      f.connect(g);
      g.connect(this.musicBus);
      osc.start(t);
      osc.stop(t + dur + 0.1);
      setTimeout(() => {
        try {
          osc.disconnect();
          g.disconnect();
        } catch {}
      }, (dur + 0.5) * 1000);
    }
  }

  _noise(t, dur, gain, type, freq, bus = this.musicBus, q = 0.8) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(bus);
    src.start(t);
    src.stop(t + dur + 0.02);
    setTimeout(() => {
      try {
        src.disconnect();
        g.disconnect();
      } catch {}
    }, (dur + 0.3) * 1000);
  }

  _kick(t) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(118, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    osc.connect(g);
    g.connect(this.musicBus);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  _snare(t) {
    this._noise(t, 0.16, 0.18, "highpass", 1400);
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.1);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.1, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(g);
    g.connect(this.musicBus);
    osc.start(t);
    osc.stop(t + 0.14);
  }

  _hat(t, gain) {
    this._noise(t, 0.045, gain, "highpass", 7600);
  }

  scannerPing(vol = 0.5) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (pan) {
      pan.pan.setValueAtTime(this.scannerSide * 0.75, t);
      pan.pan.linearRampToValueAtTime(-this.scannerSide * 0.75, t + 0.38);
      this.scannerSide *= -1;
    }
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(720, t);
    osc.frequency.exponentialRampToValueAtTime(1500, t + 0.16);
    osc.frequency.exponentialRampToValueAtTime(520, t + 0.34);
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1100;
    f.Q.value = 1.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.075 * vol * 2, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    osc.connect(f);
    f.connect(g);
    if (pan) {
      g.connect(pan);
      pan.connect(this.sfxBus);
    } else {
      g.connect(this.sfxBus);
    }
    osc.start(t);
    osc.stop(t + 0.45);
    setTimeout(() => {
      try {
        osc.disconnect();
        g.disconnect();
        pan?.disconnect();
      } catch {}
    }, 900);
  }

  laser() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.16);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(4200, t);
    f.frequency.exponentialRampToValueAtTime(500, t + 0.2);
    osc.connect(f);
    f.connect(g);
    g.connect(this.sfxBus);
    osc.start(t);
    osc.stop(t + 0.22);
    this._noise(t, 0.12, 0.12, "highpass", 2200, this.sfxBus);
  }

  crash() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    this._noise(t, 0.5, 0.5, "lowpass", 900, this.sfxBus, 0.6);
    this._noise(t + 0.02, 0.25, 0.3, "bandpass", 1800, this.sfxBus, 1.2);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.4);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    osc.connect(g);
    g.connect(this.sfxBus);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  pickup() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [0, 0.07, 0.14].forEach((delay, i) => {
      this._tone(880 * Math.pow(1.26, i), t + delay, 0.2, "sine", 0.12, this.sfxBus);
    });
  }

  boost() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.5);
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(400, t);
    f.frequency.linearRampToValueAtTime(2800, t + 0.5);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.11, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    osc.connect(f);
    f.connect(g);
    g.connect(this.sfxBus);
    osc.start(t);
    osc.stop(t + 0.6);
    this._noise(t, 0.45, 0.1, "bandpass", 900, this.sfxBus, 0.5);
  }

  jump() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(1100, t + 0.35);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.14, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    osc.connect(g);
    g.connect(this.sfxBus);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  nearMiss() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this._noise(t, 0.25, 0.09, "bandpass", 2400, this.sfxBus, 2.4);
  }

  gameOver() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [0, 0.16, 0.32].forEach((d, i) => this._tone(330 / Math.pow(1.18, i), t + d, 0.6, "sawtooth", 0.06, this.sfxBus, null, 700));
  }

  click() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this._tone(1200, t, 0.05, "square", 0.04, this.sfxBus);
  }
}
