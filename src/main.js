import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { World } from "./world.js";
import { Effects } from "./effects.js";
import { AudioEngine } from "./audio.js";
import { Game } from "./game.js";

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const canvas = $("scene");
const startScreen = $("startScreen");
const pauseScreen = $("pauseScreen");
const overScreen = $("overScreen");
const hud = $("hud");
const touchControls = $("touchControls");
const rotateHint = $("rotateHint");
const loading = $("loading");
const toastStack = $("toastStack");
const targetLock = $("targetLock");
const damageFlash = $("damageFlash");

const isTouch =
  new URLSearchParams(location.search).has("touch") ||
  matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallScreen = Math.min(window.innerWidth, window.innerHeight) < 700;

let renderer;
let scene;
let camera;
let composer;
let bloom;
let world;
let effects;
let audio;
let game;
let usePost = !isSmallScreen || window.devicePixelRatio < 2;

const clock = new THREE.Clock();
const input = {
  throttle: false,
  brake: false,
  steer: 0,
  boost: false,
  fire: false,
};
const keys = new Set();
const touch = { left: false, right: false, brake: false, boost: false, fire: false };
let mouseFire = false;
let soundOn = true;
let uiState = "menu";
let displayScore = 0;
let lastCombo = 0;
let gameOverTimer = null;
let frameAvg = 16;
let slowFrames = 0;

const scannerElements = {
  title: Array.from($("titleScanner").children),
  hud: Array.from($("scannerHud").children),
  pause: Array.from($("pauseScanner").children),
  over: Array.from($("overScanner").children),
};
let scannerKey = "";

function makeEnvironment(rendererRef) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, "#04050d");
  grad.addColorStop(0.4, "#120c26");
  grad.addColorStop(0.52, "#3a1533");
  grad.addColorStop(0.56, "#7a2340");
  grad.addColorStop(0.62, "#241024");
  grad.addColorStop(1, "#05040a");
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 512);

  // moon glow
  const mg = g.createRadialGradient(250, 150, 4, 250, 150, 180);
  mg.addColorStop(0, "rgba(210,225,255,0.95)");
  mg.addColorStop(0.18, "rgba(170,190,255,0.35)");
  mg.addColorStop(1, "rgba(90,110,200,0)");
  g.fillStyle = mg;
  g.fillRect(0, 0, 1024, 512);

  // horizon city glows
  for (const [x, y, r, col] of [
    [700, 280, 180, "rgba(255,120,80,0.5)"],
    [520, 290, 120, "rgba(255,50,80,0.25)"],
    [870, 285, 90, "rgba(120,200,255,0.3)"],
  ]) {
    const glow = g.createRadialGradient(x, y, 0, x, y, r);
    glow.addColorStop(0, col);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = glow;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.mapping = THREE.EquirectangularReflectionMapping;
  const pmrem = new THREE.PMREMGenerator(rendererRef);
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  pmrem.dispose();
  return env;
}

function initScene() {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
    alpha: false,
  });
  const dpr = Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.6 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = false;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x140b1d, 0.0022);
  scene.environment = makeEnvironment(renderer);
  scene.environmentIntensity = 0.85;

  camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 2200);

  const hemi = new THREE.HemisphereLight(0x6b4a8c, 0x0a0710, 0.8);
  scene.add(hemi);
  const ambient = new THREE.AmbientLight(0x7a6a9a, 0.5);
  scene.add(ambient);
  const moonLight = new THREE.DirectionalLight(0xa9b8ff, 1.25);
  moonLight.position.set(-40, 80, -30);
  scene.add(moonLight);
  const rim = new THREE.DirectionalLight(0xc07aff, 0.28);
  rim.position.set(30, 12, 26);
  scene.add(rim);
  const rimCool = new THREE.DirectionalLight(0x8fb0ff, 0.7);
  rimCool.position.set(-26, 10, -18);
  scene.add(rimCool);
  const key = new THREE.DirectionalLight(0xdfe8ff, 0.65);
  key.position.set(-8, 6, -24);
  scene.add(key);

  world = new World(scene);
  effects = new Effects(scene);
  audio = new AudioEngine();

  game = new Game(scene, camera, world, effects, audio, {
    toast: showToast,
    hit: (intensity) => {
      damageFlash.classList.add("hit");
      setTimeout(() => damageFlash.classList.remove("hit"), intensity > 0.8 ? 130 : 80);
    },
    gameOver: onGameOver,
  });

  window.__game = game;
  window.__scene = scene;
  window.__camera = camera;
  window.__renderer = renderer;

  if (usePost) {
    composer = new EffectComposer(renderer);
    composer.setPixelRatio(dpr);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.5, 0.8);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }
}

function updateRotateHint() {
  rotateHint.classList.toggle("hidden", !isTouch || !matchMedia("(orientation: portrait)").matches);
}

function formatTime(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function showToast(text, kind = "") {
  if (!text) return;
  const el = document.createElement("div");
  el.className = `toast ${kind}`;
  el.textContent = text;
  toastStack.appendChild(el);
  while (toastStack.children.length > 3) toastStack.firstChild.remove();
  setTimeout(() => el.remove(), 1350);
}

function updateScanner(el, time) {
  if (!el) return;
  const n = el.length;
  const period = 1.15;
  const raw = (time % period) / period;
  const tri = raw < 0.5 ? raw * 2 : (1 - raw) * 2;
  const pos = tri * (n - 1);
  for (let i = 0; i < n; i++) {
    const on = Math.abs(i - pos) < 1.2;
    el[i].classList.toggle("on", on);
  }
}

function updateHud(now) {
  const state = game.getHud();
  const mph = state.speedMph;
  $("speedNumber").textContent = mph;
  $("speedRing").style.setProperty("--p", clamp(mph / 300, 0, 1).toFixed(3));
  $("gearLabel").textContent = state.boostActive ? "TURBO" : mph > 2 ? "D" : "P";
  $("timer").textContent = formatTime(state.timer);
  $("timer").style.color = state.timer < 20 ? "#ff5a4d" : "";
  $("distance").textContent = `${state.distance.toFixed(2)} MI`;

  const target = state.score;
  displayScore += (target - displayScore) * 0.22;
  if (Math.abs(target - displayScore) < 1) displayScore = target;
  $("score").textContent = String(Math.floor(displayScore)).padStart(6, "0");
  $("shieldValue").textContent = Math.round(state.shield);
  const segs = $("shieldRow").children;
  for (let i = 0; i < segs.length; i++) {
    const on = state.shield > i * 25;
    segs[i].classList.toggle("on", on);
    segs[i].classList.toggle("low", on && state.shield <= 50);
  }
  $("turboFill").style.width = `${clamp(state.turbo, 0, 100)}%`;
  $("turboFill").parentElement.classList.toggle("low", state.turbo < 30);

  const comboEl = $("combo");
  if (state.combo > 0) {
    comboEl.textContent = `COMBO ×${state.multiplier.toFixed(2)}`;
    if (state.combo !== lastCombo) {
      comboEl.classList.remove("hot");
      void comboEl.offsetWidth;
      comboEl.classList.add("hot");
    }
  } else {
    comboEl.textContent = "";
  }
  lastCombo = state.combo;

  $("kosState").textContent = state.target ? "LOCKED" : "SCANNING";
  $("laserState").textContent = state.laserCooldown > 0 ? "CHARGING" : "READY";
  $("laserState").className = state.laserCooldown > 0 ? "cool" : "ready";
  $("heatState").textContent = state.laserCooldown > 0 ? "HOT" : "COLD";
  $("heatState").className = state.laserCooldown > 0 ? "hot" : "";
  $("pursuitHint").textContent = state.airborne ? "AIRBORNE" : state.boostActive ? "TURBO ENGAGED" : "F / TAP TO FIRE";

  updateScanner(scannerElements.hud, now);

  if (state.target) {
    const v = state.target.clone();
    v.y += 0.9;
    v.project(camera);
    if (v.z < 1 && Math.abs(v.x) < 1.15 && Math.abs(v.y) < 1.1) {
      targetLock.classList.add("active");
      targetLock.style.left = `${(v.x * 0.5 + 0.5) * 100}%`;
      targetLock.style.top = `${(-v.y * 0.5 + 0.5) * 100}%`;
      $("targetText").textContent = `KOS LOCK · ${Math.round(-state.target.z)}M`;
    } else {
      targetLock.classList.remove("active");
    }
  } else {
    targetLock.classList.remove("active");
  }
}

function startRun() {
  clearTimeout(gameOverTimer);
  if (audio) {
    audio.start();
    audio.setMode("playing");
  }
  uiState = "playing";
  displayScore = 0;
  lastCombo = 0;
  overScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  startScreen.classList.add("leaving");
  setTimeout(() => {
    if (uiState === "playing" || uiState === "paused") startScreen.classList.add("hidden");
  }, 720);
  hud.classList.remove("hidden");
  if (isTouch) touchControls.classList.remove("hidden");
  game.startRun();
  clock.getDelta();
}

function onGameOver(stats) {
  uiState = "over";
  touchControls.classList.add("hidden");
  targetLock.classList.remove("active");
  if (audio) audio.setMode("menu");
  const reason = stats.reason;
  $("overKicker").textContent = reason === "time" ? "MISSION CLOCK EXPIRED" : "MISSION DEBRIEF";
  $("overTitle").textContent = reason === "time" ? "TIME EXPIRED" : "K.I.T.T. DISABLED";
  $("finalScore").textContent = stats.score.toLocaleString("en-US");
  $("finalDistance").textContent = `${stats.distance.toFixed(2)} MI`;
  $("finalSpeed").textContent = `${stats.topSpeed} MPH`;
  $("finalKills").textContent = stats.kills;
  $("finalCores").textContent = stats.cores;
  $("finalCombo").textContent = `×${stats.bestCombo.toFixed(2)}`;
  $("finalRank").textContent = stats.rank;
  $("finalQuote").textContent = stats.quote;
  gameOverTimer = setTimeout(() => {
    if (uiState === "over") overScreen.classList.remove("hidden");
  }, 1150);
}

function goMenu() {
  clearTimeout(gameOverTimer);
  uiState = "menu";
  game.reset(true);
  game.camera.fov = 52;
  startScreen.classList.remove("hidden", "leaving");
  pauseScreen.classList.add("hidden");
  overScreen.classList.add("hidden");
  hud.classList.add("hidden");
  touchControls.classList.add("hidden");
  targetLock.classList.remove("active");
  if (audio) audio.setMode("menu");
  displayScore = 0;
}

function togglePause() {
  if (uiState === "playing") {
    uiState = "paused";
    game.pause();
    pauseScreen.classList.remove("hidden");
    touchControls.classList.add("hidden");
  } else if (uiState === "paused") {
    uiState = "playing";
    game.resume();
    pauseScreen.classList.add("hidden");
    if (isTouch) touchControls.classList.remove("hidden");
    clock.getDelta();
  }
}

function bindInput() {
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
    if (e.repeat) {
      if (e.code === "KeyF") input.fire = true;
      return;
    }
    keys.add(e.code);
    if (e.code === "Enter") {
      if (uiState === "menu") startRun();
      else if (uiState === "over") startRun();
      return;
    }
    if (e.code === "KeyP" || e.code === "Escape") {
      if (uiState === "playing" || uiState === "paused") togglePause();
      return;
    }
    if (e.code === "KeyM") toggleSound();
    if (e.code === "KeyF") input.fire = true;
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.code);
    if (e.code === "KeyF") input.fire = false;
  });
  window.addEventListener("blur", () => {
    keys.clear();
    if (uiState === "playing") togglePause();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && uiState === "playing") togglePause();
  });

  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") {
      if (uiState === "playing") {
        mouseFire = true;
        input.fire = true;
        if (audio) audio.start();
      }
    }
  });
  window.addEventListener("pointerup", () => {
    if (mouseFire) {
      mouseFire = false;
      input.fire = keys.has("KeyF") || touch.fire;
    }
  });

  for (const btn of document.querySelectorAll("[data-touch]")) {
    const action = btn.dataset.touch;
    const press = (e) => {
      e.preventDefault();
      if (audio) audio.start();
      touch[action] = true;
      btn.classList.add("pressed");
      if (action === "fire") input.fire = true;
    };
    const release = (e) => {
      e.preventDefault();
      touch[action] = false;
      btn.classList.remove("pressed");
      if (action === "fire") input.fire = false;
    };
    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("pointerleave", release);
  }
}

function toggleSound() {
  soundOn = !soundOn;
  if (audio) {
    if (soundOn) audio.start();
    audio.setEnabled(soundOn);
  }
  $("soundWaves").classList.toggle("hidden", !soundOn);
  $("soundMute").classList.toggle("hidden", soundOn);
}

function onResize() {
  updateRotateHint();
  if (!renderer) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.6 : 2));
  renderer.setSize(w, h);
  if (composer) {
    composer.setSize(w, h);
    bloom?.setSize(w, h);
  }
}

function readInput() {
  input.throttle = keys.has("KeyW") || keys.has("ArrowUp") || (isTouch && uiState === "playing");
  input.brake = keys.has("KeyS") || keys.has("ArrowDown") || touch.brake;
  const left = keys.has("KeyA") || keys.has("ArrowLeft") || touch.left;
  const right = keys.has("KeyD") || keys.has("ArrowRight") || touch.right;
  input.steer = (right ? 1 : 0) - (left ? 1 : 0);
  input.boost = keys.has("ShiftLeft") || keys.has("ShiftRight") || touch.boost;
  input.fire = keys.has("KeyF") || mouseFire || touch.fire;
}

function animate() {
  requestAnimationFrame(animate);
  const dtRaw = clock.getDelta();
  const dt = Math.min(dtRaw, 0.05);
  const now = game ? game.time : 0;

  frameAvg = frameAvg * 0.94 + dtRaw * 1000 * 0.06;
  if (frameAvg > 34 && usePost && !reducedMotion) {
    slowFrames++;
    if (slowFrames > 120) {
      usePost = false;
      composer = null;
      slowFrames = 0;
    }
  } else {
    slowFrames = Math.max(0, slowFrames - 1);
  }

  readInput();
  if (game) game.update(dt, input);

  if (window.__debugView) {
    const d = window.__debugView;
    camera.position.set(...d.pos);
    camera.lookAt(...d.look);
    if (d.fov) { camera.fov = d.fov; camera.updateProjectionMatrix(); }
  }

  if (uiState !== "paused") effects.update(dt);

  const hudState = game ? game.getHud() : null;
  if (uiState !== "menu" && hudState) updateHud(now);
  updateScanner(scannerElements.title, now);
  updateScanner(scannerElements.pause, now);
  updateScanner(scannerElements.over, now);

  if (audio && audio.started) {
    audio.update(dt, {
      speedNorm: hudState ? hudState.speedNorm : 0,
      boost: hudState ? hudState.boostActive : false,
      playing: uiState === "playing",
    });
  }

  if (usePost && composer) composer.render();
  else renderer.render(scene, camera);
}

async function boot() {
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
    updateRotateHint();
    initScene();
    bindInput();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", updateRotateHint);
    $("startBtn").addEventListener("click", () => {
      if (audio) audio.click();
      startRun();
    });
    $("restartBtn").addEventListener("click", () => {
      if (audio) audio.click();
      startRun();
    });
    $("menuBtn").addEventListener("click", () => {
      if (audio) audio.click();
      goMenu();
    });
    $("resumeBtn").addEventListener("click", () => {
      if (audio) audio.click();
      togglePause();
    });
    $("quitBtn").addEventListener("click", () => {
      if (audio) audio.click();
      goMenu();
    });
    $("pauseBtn").addEventListener("click", () => {
      if (audio) audio.click();
      togglePause();
    });
    $("soundBtn").addEventListener("click", () => {
      if (audio) audio.start();
      toggleSound();
    });

    animate();
    requestAnimationFrame(() => {
      loading.classList.add("done");
      setTimeout(() => loading.classList.add("hidden"), 800);
    });
  } catch (err) {
    console.error(err);
    loading.innerHTML = `<div class="load-inner"><div class="load-text">WEBGL INITIALIZATION FAILED</div><div class="load-text" style="max-width:340px;text-align:center;line-height:1.7;font-size:8px;color:#8b94a8">${String(err.message || err)}</div></div>`;
  }
}

boot();
