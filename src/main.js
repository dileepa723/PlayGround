import "./style.css";
import { KittAudio } from "./audio.js";
import { KittHUD } from "./hud.js";
import { KittScene } from "./scene.js";

const hud = new KittHUD();
const audio = new KittAudio();
const canvas = document.querySelector("#scene");

const idleLines = [
  "Good evening, Michael. K.I.T.T. is online and the scanner is calibrated.",
  "I have checked the engine, the paint, and your driving record. Two of those are perfect.",
  "The highway is clear. Try not to scratch the paint.",
  "All systems nominal. Threat level remains comfortably boring.",
  "I could drive faster. I am simply choosing not to.",
  "Scanner calibrated. I see everything. Including that speed limit.",
];

const boostLines = [
  "Turbo boost engaged. Do try to keep up.",
  "Hold on, Michael. This is going to be loud.",
  "Punch it. I will handle the physics.",
  "Turbo boost. Because subtlety is overrated.",
];

const boostEndLines = [
  "That was entirely unnecessary. I loved it.",
  "We are still alive. Statistically impressive.",
  "Another perfectly executed shortcut.",
  "I have logged that manoeuvre as strictly off the record.",
];

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

let lastIdleIndex = -1;
let idleTimer = 0;
let boostSpeakTimer = 0;
let lastLine = "";

function say(text, options) {
  lastLine = text;
  hud.say(text, options);
}

function scheduleIdle(delay = 10000) {
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (!scene.isBoosting()) {
      let index = Math.floor(Math.random() * idleLines.length);
      if (index === lastIdleIndex) index = (index + 1) % idleLines.length;
      lastIdleIndex = index;
      say(idleLines[index]);
    }
    scheduleIdle(11000 + Math.random() * 4000);
  }, delay);
}

function triggerBoost() {
  if (!scene || scene.ready !== true) return;
  const already = scene.isBoosting();
  scene.startBoost(4.2);
  hud.setBoosting(true);
  audio.boost();
  if (!already) {
    const line = randomFrom(boostLines);
    say(line);
    window.clearTimeout(boostSpeakTimer);
    if (audio.enabled) {
      audio.blip(740, 0.08, 0.05);
    }
  }
  hud.hideOrbitHint();
}

const scene = new KittScene(canvas, {
  onProgress: (value) => {
    const label = value > 74 ? "Loading vehicle profile" : "Establishing connection";
    hud.setBootProgress(value, label);
  },
  onReady: () => {
    hud.setBootProgress(100, "Systems online");
    scene.ready = true;
    window.__KITT_READY__ = true;
    document.body.dataset.ready = "true";
    window.setTimeout(() => hud.finishBoot(), 340);
    window.setTimeout(() => {
      say("Good evening, Michael. K.I.T.T. is online. Scanner calibrated, threat level zero.", { instant: true });
      window.setTimeout(() => {
        say("Are we going for a drive, or shall I keep admiring the paint?", { rate: 17 });
      }, 3000);
      scheduleIdle(13500);
    }, 1100);
  },
  onError: (error) => {
    console.error("K.I.T.T. failed to initialise", error);
    hud.showFallback();
    window.__KITT_READY__ = "error";
  },
});

scene.onBoostEnd = () => {
  hud.setBoosting(false);
  say(randomFrom(boostEndLines));
  scheduleIdle(12000);
};

scene.init().catch((error) => {
  console.error("K.I.T.T. failed to initialise", error);
  hud.showFallback();
  window.__KITT_READY__ = "error";
});

// ---------- Controls ----------

document.querySelector("#turbo-btn")?.addEventListener("click", triggerBoost);

document.querySelector("#sound-toggle")?.addEventListener("click", async () => {
  const enabled = await audio.toggle();
  hud.setSound(enabled);
  if (enabled) {
    say("Audio systems online. I will try to keep the engine noise tasteful.");
  } else {
    say("Audio muted. The silence is almost as dramatic.", { rate: 14 });
  }
});

document.querySelector("#lights-btn")?.addEventListener("click", () => {
  const next = !scene.headlights;
  scene.setHeadlights(next);
  hud.setLights(next);
  audio.blip(next ? 620 : 380, 0.06, 0.05);
  say(next ? "Headlights on. Let there be light." : "Headlights off. I hope you know this road.", { rate: 15 });
});

document.querySelector("#speak-btn")?.addEventListener("click", () => {
  const spoken = audio.speak(lastLine || hud.currentLine);
  if (!spoken) {
    audio.blip(360, 0.12, 0.06);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !event.repeat) {
    const active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
    event.preventDefault();
    triggerBoost();
  }

  if (event.code === "KeyL" && !event.repeat) {
    document.querySelector("#lights-btn")?.click();
  }

  if (event.code === "KeyM" && !event.repeat) {
    document.querySelector("#sound-toggle")?.click();
  }
});

canvas.addEventListener("pointermove", () => {
  hud.hideOrbitHint();
}, { once: true });

// ---------- Frame loop ----------

let frame = 0;
function tick(now) {
  frame = requestAnimationFrame(tick);
  if (!scene.ready) return;
  hud.setSpeed(scene.getSpeed(), scene.isBoosting() ? "boost" : "cruise");
  hud.drawScanners(now / 1000, scene.isBoosting());
}

frame = requestAnimationFrame(tick);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
  } else {
    frame = requestAnimationFrame(tick);
  }
});

// A small, intentional hook for automated visual verification and curious humans.
window.__KITT__ = {
  scene,
  hud,
  audio,
  boost: () => triggerBoost(),
  setSpeed: (speed) => {
    scene.displaySpeed = speed;
  },
};
