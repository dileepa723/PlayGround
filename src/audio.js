/**
 * Tiny procedural sound engine for K.I.T.T.
 * Everything is synthesised in the browser – no audio files, no autoplay.
 */
export class KittAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = false;
    this.started = false;
    this.engine = null;
    this.pad = null;
    this.noiseBuffer = null;
    this.volume = 0.5;
  }

  async toggle() {
    if (!this.ctx) this.#create();
    await this.ctx.resume();
    this.enabled = !this.enabled;
    this.#rampMaster(this.enabled ? this.volume : 0, 0.25);

    if (this.enabled && !this.started) {
      this.#startDrone();
      this.started = true;
    }

    if (this.enabled) this.blip(520, 0.06, 0.05);
    return this.enabled;
  }

  #create() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;

    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 18;
    compressor.ratio.value = 6;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.3;

    this.master.connect(compressor);
    compressor.connect(this.ctx.destination);

    const length = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = 0.985 * last + 0.015 * white;
      data[i] = last * 2.4;
    }
  }

  #rampMaster(value, duration = 0.2) {
    if (!this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(value, now + duration);
  }

  #startDrone() {
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const engineGain = ctx.createGain();
    engineGain.gain.value = 0;
    engineGain.gain.linearRampToValueAtTime(0.12, now + 1.4);

    const engineFilter = ctx.createBiquadFilter();
    engineFilter.type = "lowpass";
    engineFilter.frequency.value = 420;
    engineFilter.Q.value = 5;

    const saw = ctx.createOscillator();
    saw.type = "sawtooth";
    saw.frequency.value = 48;

    const sub = ctx.createOscillator();
    sub.type = "square";
    sub.frequency.value = 24;

    const sawGain = ctx.createGain();
    sawGain.gain.value = 0.42;
    const subGain = ctx.createGain();
    subGain.gain.value = 0.3;

    saw.connect(sawGain).connect(engineFilter);
    sub.connect(subGain).connect(engineFilter);
    engineFilter.connect(engineGain).connect(this.master);

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 7.4;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain).connect(engineGain.gain);

    saw.start(now);
    sub.start(now);
    lfo.start(now);

    this.engine = { saw, sub, filter: engineFilter, gain: engineGain, lfo, base: 48 };

    // Subtle synth pad so silence never feels empty.
    const padGain = ctx.createGain();
    padGain.gain.value = 0;
    padGain.gain.linearRampToValueAtTime(0.032, now + 3);

    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 640;
    padFilter.Q.value = 0.7;

    const padA = ctx.createOscillator();
    padA.type = "triangle";
    padA.frequency.value = 110;
    const padB = ctx.createOscillator();
    padB.type = "triangle";
    padB.frequency.value = 164.81;
    padB.detune.value = 7;

    padA.connect(padFilter);
    padB.connect(padFilter);
    padFilter.connect(padGain).connect(this.master);

    const padLfo = ctx.createOscillator();
    padLfo.frequency.value = 0.08;
    const padLfoGain = ctx.createGain();
    padLfoGain.gain.value = 0.012;
    padLfo.connect(padLfoGain).connect(padGain.gain);

    padA.start(now);
    padB.start(now);
    padLfo.start(now);

    this.pad = { padA, padB, padFilter, padGain };
  }

  setSpeed(kph) {
    if (!this.engine || !this.ctx) return;
    const now = this.ctx.currentTime;
    const ratio = Math.min(1.6, Math.max(0, kph / 220));
    const freq = this.engine.base + ratio * 38;
    this.engine.saw.frequency.setTargetAtTime(freq, now, 0.12);
    this.engine.sub.frequency.setTargetAtTime(freq * 0.5, now, 0.12);
    this.engine.filter.frequency.setTargetAtTime(340 + ratio * 620, now, 0.12);
    this.engine.gain.gain.setTargetAtTime(0.1 + ratio * 0.08, now, 0.2);
  }

  boost() {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 1.1;
    band.frequency.setValueAtTime(180, now);
    band.frequency.exponentialRampToValueAtTime(2600, now + 0.35);
    band.frequency.exponentialRampToValueAtTime(420, now + 1.6);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);

    noise.connect(band).connect(gain).connect(this.master);
    noise.start(now);
    noise.stop(now + 2);

    const sweep = ctx.createOscillator();
    sweep.type = "sawtooth";
    sweep.frequency.setValueAtTime(70, now);
    sweep.frequency.exponentialRampToValueAtTime(280, now + 0.45);
    sweep.frequency.exponentialRampToValueAtTime(90, now + 1.5);

    const sweepGain = ctx.createGain();
    sweepGain.gain.setValueAtTime(0.0001, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.14, now + 0.1);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.7);

    const sweepFilter = ctx.createBiquadFilter();
    sweepFilter.type = "lowpass";
    sweepFilter.frequency.value = 1200;

    sweep.connect(sweepFilter).connect(sweepGain).connect(this.master);
    sweep.start(now);
    sweep.stop(now + 1.8);
  }

  blip(freq = 660, duration = 0.05, level = 0.06) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + duration);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.8);
    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + duration * 2);
  }

  speak(text) {
    if (!("speechSynthesis" in window) || !text) return false;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((voice) => /daniel|google uk english male|arthur|male/i.test(voice.name)) ||
        voices.find((voice) => /^en(-|_)/i.test(voice.lang));
      if (preferred) utterance.voice = preferred;
      utterance.pitch = 0.55;
      utterance.rate = 0.94;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
      if (this.enabled) this.blip(880, 0.05, 0.03);
      return true;
    } catch {
      return false;
    }
  }
}
