const padSpeed = (value) => String(Math.round(value)).padStart(3, "0");

export class KittHUD {
  constructor() {
    this.lineEl = document.querySelector("#kitt-text");
    this.lineWrap = document.querySelector("#kitt-line");
    this.speedEl = document.querySelector("#speed-value");
    this.speedBlock = document.querySelector("#speed-block");
    this.driveState = document.querySelector("#drive-state");
    this.threatEl = document.querySelector("#threat");
    this.turboBtn = document.querySelector("#turbo-btn");
    this.soundBtn = document.querySelector("#sound-toggle");
    this.lightsBtn = document.querySelector("#lights-btn");
    this.boot = document.querySelector("#boot");
    this.bootBar = document.querySelector("#boot-progress");
    this.bootPercent = document.querySelector("#boot-percent");
    this.bootText = document.querySelector(".boot__text");
    this.fallback = document.querySelector("#fallback");
    this.orbitHint = document.querySelector("#orbit-hint");

    this.scanners = [
      { canvas: document.querySelector("#brand-scanner"), segments: 19, gap: 0.18 },
      { canvas: document.querySelector("#boot-scanner"), segments: 32, gap: 0.13 },
    ].filter((item) => item.canvas);

    this.typingToken = 0;
    this.currentLine = "";
    this.lastSpeed = -1;
    this.lastState = "";
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.#setupCanvasSizes();
  }

  #setupCanvasSizes() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const scanner of this.scanners) {
      const rect = scanner.canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      scanner.canvas.width = width;
      scanner.canvas.height = height;
      scanner.ctx = scanner.canvas.getContext("2d");
      scanner.dpr = dpr;
    }
  }

  setBootProgress(value, label) {
    const percent = Math.max(0, Math.min(100, Math.round(value)));
    if (this.bootBar) this.bootBar.style.width = `${percent}%`;
    if (this.bootPercent) this.bootPercent.textContent = `${percent}%`;
    if (label && this.bootText) this.bootText.textContent = label;
  }

  finishBoot() {
    this.boot?.classList.add("is-done");
  }

  setSpeed(kph, state = "cruise") {
    const rounded = Math.round(kph);
    if (rounded !== this.lastSpeed) {
      this.lastSpeed = rounded;
      if (this.speedEl) this.speedEl.textContent = padSpeed(rounded);
      if (this.speedBlock) {
        this.speedBlock.style.setProperty("--speed-pct", String(Math.min(100, (kph / 320) * 100)));
      }
    }

    if (state !== this.lastState) {
      this.lastState = state;
      if (this.driveState) {
        this.driveState.textContent = state === "boost" ? "Turbo" : "Cruise";
      }
      if (this.threatEl) {
        this.threatEl.textContent = state === "boost" ? "1.00" : "0.00";
      }
    }
  }

  setBoosting(active) {
    document.body.classList.toggle("is-boosting", active);
    this.turboBtn?.classList.toggle("is-active", active);
    this.turboBtn?.setAttribute("aria-pressed", String(active));
  }

  setSound(enabled) {
    if (!this.soundBtn) return;
    this.soundBtn.setAttribute("aria-pressed", String(enabled));
    this.soundBtn.setAttribute("aria-label", enabled ? "Mute sound" : "Enable sound");
    const label = this.soundBtn.querySelector(".icon-btn__label");
    if (label) label.textContent = enabled ? "Mute" : "Sound";
  }

  setLights(enabled) {
    if (!this.lightsBtn) return;
    this.lightsBtn.setAttribute("aria-pressed", String(enabled));
    const state = this.lightsBtn.querySelector(".toggle__state");
    if (state) state.textContent = enabled ? "on" : "off";
  }

  say(text, { instant = false, rate = 18 } = {}) {
    if (!this.lineEl) return;
    this.currentLine = text;
    this.typingToken += 1;
    const token = this.typingToken;
    this.lineEl.textContent = "";

    if (instant || this.reducedMotion) {
      this.lineEl.textContent = text;
      return;
    }

    let index = 0;
    const typeNext = () => {
      if (token !== this.typingToken) return;
      index += 1;
      this.lineEl.textContent = text.slice(0, index);
      if (index < text.length) {
        const char = text[index - 1];
        const pause = /[.,!?]/.test(char) ? rate * 5 : rate;
        window.setTimeout(typeNext, pause);
      }
    };
    window.setTimeout(typeNext, 140);
  }

  hideOrbitHint() {
    this.orbitHint?.classList.add("is-hidden");
  }

  showFallback() {
    if (this.fallback) this.fallback.hidden = false;
    this.boot?.classList.add("is-done");
  }

  drawScanners(time, boosting) {
    for (const scanner of this.scanners) {
      const { ctx, canvas } = scanner;
      if (!ctx) continue;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const count = scanner.segments;
      const cell = width / count;
      const segmentWidth = Math.max(1, cell * (1 - scanner.gap));
      const speed = boosting ? 4.4 : 1.8;
      const cycle = (time * speed) % 2;
      const sweep = cycle < 1 ? cycle * 2 - 1 : 3 - cycle * 2;
      const center = ((sweep + 1) / 2) * count;

      for (let i = 0; i < count; i += 1) {
        const distance = Math.abs(i + 0.5 - center) / count;
        const energy = Math.exp(-(distance * distance) / 0.013);
        const alpha = 0.12 + energy * (boosting ? 1 : 0.84);
        const red = Math.round(90 + 165 * alpha);
        const green = Math.round(6 + 70 * alpha);
        const blue = Math.round(8 + 52 * alpha);
        ctx.fillStyle = `rgba(${red},${green},${blue},${Math.min(1, 0.18 + alpha * 0.94)})`;
        ctx.shadowColor = "rgba(255,44,20,0.9)";
        ctx.shadowBlur = energy * (height * 0.9);
        const inset = Math.max(1, height * 0.16);
        ctx.fillRect(i * cell + (cell - segmentWidth) / 2, inset, segmentWidth, height - inset * 2);
      }
      ctx.shadowBlur = 0;
    }
  }
}
