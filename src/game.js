import * as THREE from "three";
import { buildKitt, buildTrafficCar, buildEnemyCar, buildDataCore, buildRamp, updateKitt } from "./car.js";
import { LANES, ROAD_HALF } from "./world.js";

const START_TIME = 120;
const BASE_MAX = 96; // ~215 mph
const TURBO_MAX = 134; // ~300 mph
const CAR_X_LIMIT = ROAD_HALF - 1.1;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = THREE.MathUtils.lerp;
const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));

export class Game {
  constructor(scene, camera, world, effects, audio, callbacks = {}) {
    this.scene = scene;
    this.camera = camera;
    this.world = world;
    this.effects = effects;
    this.audio = audio;
    this.callbacks = callbacks;

    this.mode = "menu";
    this.time = 0;
    this.shake = 0;

    this.kitt = buildKitt();
    this.kitt.group.position.set(LANES[2], 0, 0);
    scene.add(this.kitt.group);

    this.carX = LANES[2];
    this.steer = 0;
    this.speed = 0;
    this.turbo = 100;
    this.shield = 100;
    this.score = 0;
    this.displayScore = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.timeLeft = START_TIME;
    this.distance = 0;
    this.topSpeed = 0;
    this.kills = 0;
    this.cores = 0;
    this.invuln = 0;
    this.jumpY = 0;
    this.jumpV = 0;
    this.airborne = false;
    this.laserCooldown = 0;
    this.boostActive = false;
    this.boostWasOn = false;
    this.elapsed = 0;
    this.trafficTimer = 1.2;
    this.enemyTimer = 6;
    this.coreTimer = 4;
    this.rampTimer = 22;
    this.targetEnemy = null;
    this.ended = false;
    this.endReason = "";

    this.traffic = [];
    this.enemies = [];
    this.coresList = [];
    this.ramps = [];

    this._buildPools();
    this.reset(true);
  }

  _buildPools() {
    const kinds = ["sedan", "suv", "truck", "sedan", "sedan", "suv", "truck", "sedan", "suv", "sedan", "sedan", "suv", "truck", "sedan"];
    for (const kind of kinds) {
      const group = buildTrafficCar(kind);
      group.visible = false;
      this.scene.add(group);
      this.traffic.push({
        group,
        kind,
        active: false,
        x: 0,
        z: -300,
        speed: 30,
        halfW: kind === "truck" ? 1.15 : 1.0,
        halfL: kind === "truck" ? 3.6 : 2.3,
        passed: false,
        scored: false,
      });
    }
    for (let i = 0; i < 5; i++) {
      const e = buildEnemyCar();
      e.group.visible = false;
      this.scene.add(e.group);
      this.enemies.push({
        ...e,
        active: false,
        x: 0,
        z: -300,
        speed: 32,
        lane: 0,
        phase: Math.random() * 10,
        passed: false,
        scored: false,
      });
    }
    for (let i = 0; i < 4; i++) {
      const c = buildDataCore();
      c.group.visible = false;
      this.scene.add(c.group);
      this.coresList.push({ ...c, active: false, x: 0, z: -200, bob: Math.random() * 6 });
    }
    for (let i = 0; i < 2; i++) {
      const group = buildRamp();
      group.visible = false;
      this.scene.add(group);
      this.ramps.push({ group, active: false, x: 0, z: -300 });
    }
  }

  reset(instant = false) {
    this.mode = "menu";
    this.time = 0;
    this.carX = LANES[2];
    this.steer = 0;
    this.speed = 0;
    this.turbo = 100;
    this.shield = 100;
    this.score = 0;
    this.displayScore = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.timeLeft = START_TIME;
    this.distance = 0;
    this.topSpeed = 0;
    this.kills = 0;
    this.cores = 0;
    this.invuln = 0;
    this.jumpY = 0;
    this.jumpV = 0;
    this.airborne = false;
    this.laserCooldown = 0;
    this.boostActive = false;
    this.elapsed = 0;
    this.trafficTimer = 1.6;
    this.enemyTimer = 7;
    this.coreTimer = 3;
    this.rampTimer = 20;
    this.targetEnemy = null;
    this.ended = false;
    this.endReason = "";
    this.shake = 0;
    this.bestCombo = 1;

    for (const list of [this.traffic, this.enemies, this.coresList, this.ramps]) {
      for (const e of list) {
        e.active = false;
        e.group.visible = false;
        e.passed = false;
        e.scored = false;
        e.collided = false;
      }
    }
    this.kitt.group.position.set(this.carX, 0, 0);
    this.kitt.group.rotation.set(0, 0, 0);
    this.kitt.group.visible = true;
    void instant;
  }

  startRun() {
    this.reset();
    this.mode = "playing";
    this.speed = 42;
    this.invuln = 2.2;
    this.callbacks.toast?.("K.I.T.T. ONLINE — GO", "gold");
    // seed the highway
    this._spawnTrafficAt(-70, 0.55, 34);
    this._spawnTrafficAt(-130, 2.0, 30);
    this._spawnTrafficAt(-210, 3.0, 37);
    this._spawnTrafficAt(-300, 1.0, 28);
    this._spawnCoreAt(-150, 1.4);
    this._spawnEnemyAt(-260);
    this.audio.setMode("playing");
  }

  pause() {
    if (this.mode === "playing") {
      this.mode = "paused";
      this.audio.setMode("paused");
    }
  }

  resume() {
    if (this.mode === "paused") {
      this.mode = "playing";
      this.audio.setMode("playing");
    }
  }

  endRun(reason) {
    if (this.ended) return;
    this.ended = true;
    this.mode = "over";
    this.endReason = reason;
    this.audio.setMode("menu");
    this.audio.gameOver();
    for (const list of [this.traffic, this.enemies, this.coresList, this.ramps]) {
      for (const e of list) { e.active = false; e.group.visible = false; }
    }
    const stats = this.getStats();
    this.callbacks.gameOver?.(stats);
  }

  getStats() {
    const score = Math.floor(this.score);
    let rank = "D";
    let quote = "“Michael, perhaps we should review the manual.”";
    if (score >= 16000) {
      rank = "S";
      quote = "“Michael, that was almost elegant.”";
    } else if (score >= 10000) {
      rank = "A";
      quote = "“A commendable performance, Michael.”";
    } else if (score >= 6000) {
      rank = "B";
      quote = "“The Foundation will be pleased.”";
    } else if (score >= 3000) {
      rank = "C";
      quote = "“Not bad for a machine.”";
    }
    return {
      score,
      distance: this.distance / 1609.34,
      topSpeed: Math.round(this.topSpeed * 2.23694),
      kills: this.kills,
      cores: this.cores,
      bestCombo: this.bestCombo || 1,
      rank,
      quote,
      reason: this.endReason,
    };
  }

  addScore(base) {
    const mult = 1 + Math.min(this.combo, 12) * 0.25;
    this.score += base * mult;
    return mult;
  }

  bumpCombo() {
    this.combo++;
    this.comboTimer = 4.5;
    this.bestCombo = Math.max(this.bestCombo || 1, 1 + Math.min(this.combo, 12) * 0.25);
  }

  _spawnTrafficAt(z, laneIndex, speed) {
    const e = this.traffic.find((t) => !t.active);
    if (!e) return null;
    const lane = LANES[clamp(Math.round(laneIndex), 0, 3)];
    e.active = true;
    e.passed = false;
    e.scored = false;
    e.collided = false;
    e.z = z;
    e.x = lane + (Math.random() - 0.5) * 0.5;
    e.speed = speed;
    e.group.visible = true;
    e.group.position.set(e.x, 0, e.z);
    return e;
  }

  _spawnTraffic() {
    if (this.traffic.filter((t) => t.active).length >= 11) return;
    const laneIndex = (Math.random() * 4) | 0;
    const lane = LANES[laneIndex];
    for (const t of this.traffic) {
      if (!t.active) continue;
      if (Math.abs(t.x - lane) < 2.6 && t.z < -60 && t.z > -420) return;
    }
    const kindRoll = Math.random();
    let chosen = null;
    for (const t of this.traffic) {
      if (t.active) continue;
      const fits = kindRoll < 0.18 ? t.kind === "truck" : kindRoll < 0.44 ? t.kind === "suv" : t.kind === "sedan";
      if (fits) {
        chosen = t;
        break;
      }
    }
    if (!chosen) chosen = this.traffic.find((t) => !t.active);
    if (!chosen) return;
    const speed = chosen.kind === "truck" ? 23 + Math.random() * 6 : chosen.kind === "suv" ? 27 + Math.random() * 7 : 31 + Math.random() * 8;
    chosen.active = true;
    chosen.passed = false;
    chosen.scored = false;
    chosen.collided = false;
    chosen.z = -360 - Math.random() * 60;
    chosen.x = lane + (Math.random() - 0.5) * 0.55;
    chosen.speed = speed;
    chosen.group.visible = true;
    chosen.group.position.set(chosen.x, 0, chosen.z);
  }

  _spawnEnemyAt(z) {
    const e = this.enemies.find((x) => !x.active);
    if (!e) return;
    const laneIndex = (Math.random() * 4) | 0;
    e.active = true;
    e.passed = false;
    e.scored = false;
    e.x = LANES[laneIndex];
    e.z = z;
    e.speed = 28 + Math.random() * 8;
    e.phase = Math.random() * 10;
    e.collided = false;
    e.group.visible = true;
    e.group.position.set(e.x, 0, e.z);
  }

  _spawnEnemy() {
    if (this.enemies.filter((e) => e.active).length >= 4) return;
    this._spawnEnemyAt(-380 - Math.random() * 60);
  }

  _spawnCoreAt(z, laneIndex) {
    const c = this.coresList.find((x) => !x.active);
    if (!c) return;
    c.active = true;
    c.z = z;
    c.x = LANES[clamp(Math.round(laneIndex ?? Math.random() * 3), 0, 3)] + (Math.random() - 0.5) * 1.2;
    c.group.visible = true;
    c.group.position.set(c.x, 1.2, c.z);
  }

  _spawnCore() {
    if (this.coresList.filter((c) => c.active).length >= 3) return;
    this._spawnCoreAt(-220 - Math.random() * 180);
  }

  _spawnRamp() {
    const r = this.ramps.find((x) => !x.active);
    if (!r) return;
    r.active = true;
    r.z = -320;
    r.x = LANES[(Math.random() * 4) | 0];
    r.group.visible = true;
    r.group.position.set(r.x, 0.02, r.z);
  }

  _deactivate(e) {
    e.active = false;
    e.group.visible = false;
  }

  fire() {
    if (this.mode !== "playing" || this.laserCooldown > 0) return;
    this.laserCooldown = 0.34;
    this.audio.laser();

    const noseY = 0.78 + this.jumpY;
    let target = null;
    let bestZ = -Infinity;
    for (const e of this.enemies) {
      if (!e.active || e.z > -4 || e.z < -85) continue;
      if (Math.abs(e.x - this.carX) > 6.5) continue;
      if (e.z > bestZ) {
        bestZ = e.z;
        target = e;
      }
    }
    const originL = new THREE.Vector3(this.carX - 0.45, noseY, -2.3);
    const originR = new THREE.Vector3(this.carX + 0.45, noseY, -2.3);
    this.effects.sparks(originL, "#bff6ff");
    this.effects.sparks(originR, "#bff6ff");

    if (target) {
      const to = new THREE.Vector3(target.x, 0.85, target.z + 1.2);
      this.effects.laser(originL, to);
      this.effects.laser(originR, to);
      this.effects.explosion(new THREE.Vector3(target.x, 1.0, target.z));
      this.effects.shockwave(new THREE.Vector3(target.x, 0.3, target.z), "#ff8a2a", 8, 0.5);
      this.audio.crash();
      this.kills++;
      this.bumpCombo();
      const mult = this.addScore(300);
      this.turbo = Math.min(100, this.turbo + 16);
      this.callbacks.toast?.(`INTERCEPTOR DOWN  +${Math.round(300 * mult)}`, "gold");
      this.shake = Math.max(this.shake, 0.35);
      this._deactivate(target);
      this.targetEnemy = null;
    } else {
      const to = new THREE.Vector3(this.carX + (Math.random() - 0.5) * 1.2, noseY - 0.08, -70);
      this.effects.laser(originL, to.clone().setX(this.carX - 0.5));
      this.effects.laser(originR, to.clone().setX(this.carX + 0.5));
      this.effects.sparks(to, "#9ff4ff");
    }
  }

  _hitVehicle(vehicle, isEnemy) {
    if (this.invuln > 0 || this.airborne) return;
    const pos = new THREE.Vector3((this.carX + vehicle.x) / 2, 0.9, (vehicle.z + 0) / 2);
    const ramming = this.boostActive && this.speed > 105 && !isEnemy;
    this.invuln = 1.4;
    this.shake = 1.2;
    this.audio.crash();
    this.effects.explosion(pos);
    this.effects.shockwave(new THREE.Vector3(vehicle.x, 0.25, vehicle.z), "#ff5a3c", 6, 0.45);
    this.combo = 0;
    this.comboTimer = 0;

    if (ramming) {
      this.shield = Math.max(0, this.shield - 12);
      this.speed *= 0.9;
      this.score += 250;
      this.callbacks.toast?.("TURBO RAM  +250", "cyan");
      this.callbacks.hit?.(0.35);
    } else {
      const dmg = isEnemy ? 34 : 28;
      this.shield = Math.max(0, this.shield - dmg);
      this.speed *= 0.52;
      this.callbacks.toast?.(`SHELL IMPACT  −${dmg}%`, "red");
      this.callbacks.hit?.(1);
    }
    this._deactivate(vehicle);
    if (this.shield <= 0) this.endRun("disabled");
  }

  _nearMiss(vehicle) {
    if (vehicle.scored) return;
    vehicle.scored = true;
    const dist = Math.abs((vehicle.group?.position.x ?? vehicle.x) - this.carX);
    if (dist > 3.4 || dist < 1.95) return;
    this.bumpCombo();
    const mult = this.addScore(120);
    this.turbo = Math.min(100, this.turbo + 4.5);
    this.audio.nearMiss();
    if (this.combo === 1 || this.combo % 3 === 0) {
      this.callbacks.toast?.(`NEAR MISS  ×${mult.toFixed(2)}`, "cyan");
    }
  }

  update(dt, input) {
    this.time += dt;
    this.laserCooldown = Math.max(0, this.laserCooldown - dt);
    this.shake = Math.max(0, this.shake - dt * 2.4);
    this.invuln = Math.max(0, this.invuln - dt);

    if (this.mode === "menu") {
      this.world.update(dt, 12 + Math.sin(this.time * 0.4) * 2);
      this.speed = 8;
      this.kitt.group.position.set(this.carX, 0, 0);
      this.steer = Math.sin(this.time * 0.3) * 0.06;
      updateKitt(this.kitt, dt, { speed: 8, steer: this.steer, time: this.time });
      this.kitt.group.rotation.y = damp(this.kitt.group.rotation.y, -this.steer * 0.04, 3, dt);
      this.targetEnemy = null;
      this._updateCamera(dt);
      return;
    }

    if (this.mode === "paused") {
      updateKitt(this.kitt, dt * 0.15, { speed: 0, steer: this.steer, time: this.time });
      return;
    }

    if (this.mode === "over") {
      this.speed = damp(this.speed, 0, 1.1, dt);
      this.world.update(dt, this.speed);
      this.kitt.group.position.set(this.carX, this.jumpY, 0);
      updateKitt(this.kitt, dt, { speed: this.speed, steer: this.steer, time: this.time, braking: true });
      this._updateCamera(dt);
      return;
    }

    // ---------------- playing ----------------
    this.elapsed += dt;
    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.endRun("time");
      return;
    }

    this.comboTimer -= dt;
    if (this.comboTimer <= 0 && this.combo > 0) this.combo = 0;

    // throttle / brake
    const throttle = input.throttle || input.boost;
    this.boostActive = !!input.boost && this.turbo > 1 && this.speed > 4;
    if (this.boostActive) {
      this.turbo = Math.max(0, this.turbo - 23 * dt);
      this.speed += 38 * dt;
      if (!this.boostWasOn) {
        this.audio.boost();
        this.callbacks.toast?.("TURBO BOOST", "cyan");
        this.shake = Math.max(this.shake, 0.4);
      }
      this.boostWasOn = true;
    } else {
      this.boostWasOn = false;
      this.turbo = Math.min(100, this.turbo + 4.2 * dt);
      if (throttle) this.speed += 17 * dt;
      if (input.brake) this.speed -= 44 * dt;
      else if (!throttle) this.speed -= 7 * dt;
      if (this.speed > BASE_MAX) this.speed = Math.max(BASE_MAX, this.speed - 12 * dt);
    }
    this.speed = clamp(this.speed, 0, this.boostActive ? TURBO_MAX : Math.max(BASE_MAX, this.speed));

    // steering
    const steerTarget = input.steer || 0;
    this.steer = damp(this.steer, steerTarget, 9, dt);
    const lateralSpeed = 8 + this.speed * 0.036;
    this.carX += this.steer * lateralSpeed * dt;
    if (this.carX < -CAR_X_LIMIT) {
      this.carX = -CAR_X_LIMIT;
      this.steer *= 0.4;
      this.shake = Math.max(this.shake, 0.1);
    }
    if (this.carX > CAR_X_LIMIT) {
      this.carX = CAR_X_LIMIT;
      this.steer *= 0.4;
      this.shake = Math.max(this.shake, 0.1);
    }

    // jump physics
    if (this.airborne) {
      this.jumpY += this.jumpV * dt;
      this.jumpV -= 30 * dt;
      if (this.jumpY <= 0) {
        this.jumpY = 0;
        this.jumpV = 0;
        this.airborne = false;
        this.shake = Math.max(this.shake, 0.5);
        this.effects.sparks(new THREE.Vector3(this.carX, 0.2, 1.8), "#ffb648");
        this.audio.crash();
      }
    }

    this.distance += this.speed * dt;
    this.topSpeed = Math.max(this.topSpeed, this.speed);
    this.score += this.speed * dt * 0.28;

    // entities
    const scroll = speedDt(this.speed, dt);
    this._updateEntities(dt, scroll);

    // spawns
    this.trafficTimer -= dt;
    if (this.trafficTimer <= 0) {
      this.trafficTimer = Math.max(0.58, 1.55 - this.elapsed * 0.012);
      this._spawnTraffic();
    }
    this.enemyTimer -= dt;
    if (this.enemyTimer <= 0) {
      this.enemyTimer = Math.max(3.6, 8.5 - this.elapsed * 0.05);
      this._spawnEnemy();
    }
    this.coreTimer -= dt;
    if (this.coreTimer <= 0) {
      this.coreTimer = 6.5 + Math.random() * 3;
      this._spawnCore();
    }
    this.rampTimer -= dt;
    if (this.rampTimer <= 0) {
      this.rampTimer = 22 + Math.random() * 14;
      this._spawnRamp();
    }

    if (input.fire) this.fire();

    // visuals
    this.kitt.group.position.set(this.carX, this.jumpY, 0);
    this.kitt.group.rotation.y = damp(this.kitt.group.rotation.y, -this.steer * 0.075, 7, dt);
    updateKitt(this.kitt, dt, {
      speed: this.speed,
      steer: this.steer,
      braking: !!input.brake,
      boost: this.boostActive,
      time: this.time,
      airborne: this.airborne,
    });

    // exhaust trail
    if (this.boostActive) {
      const rear = new THREE.Vector3(this.carX + (Math.random() - 0.5) * 1.1, 0.45 + this.jumpY, 2.45);
      this.effects.trail(rear, new THREE.Color("#ff7a22"), 0.5, 7);
      this.effects.trail(rear, new THREE.Color("#7fe8ff"), 0.3, 4);
    }

    // target lock
    let target = null;
    let best = -Infinity;
    for (const e of this.enemies) {
      if (!e.active || e.z > -4 || e.z < -85) continue;
      if (Math.abs(e.x - this.carX) > 6.5) continue;
      if (e.z > best) {
        best = e.z;
        target = e;
      }
    }
    this.targetEnemy = target;
    this._updateCamera(dt);
  }

  _updateEntities(dt, scroll) {
    const scrollStatic = scroll;
    for (const t of this.traffic) {
      if (!t.active) continue;
      t.z += scroll - t.speed * dt;
      t.group.position.set(t.x, 0, t.z);
      if (t.z > 1.5 && !t.passed) {
        t.passed = true;
        this._nearMiss(t);
      }
      if (Math.abs(t.z) < 3.9 && !t.collided && Math.abs(t.x - this.carX) < 1.2 + t.halfW - 0.35) {
        t.collided = true;
        t.scored = true;
        this._hitVehicle(t, false);
      }
      if (t.z > 32) this._deactivate(t);
    }

    for (const e of this.enemies) {
      if (!e.active) continue;
      e.z += scroll - e.speed * dt;
      e.phase += dt * 1.8;
      const targetX = e.x + Math.sin(e.phase) * 0.9;
      e.group.position.set(targetX, 0, e.z);
      e.group.rotation.z = Math.sin(e.phase * 0.7) * 0.03;
      const blink = Math.sin(this.time * 11 + e.phase) > 0;
      e.redLight.visible = blink;
      e.blueLight.visible = !blink;
      e.lightGlow.material.color.set(blink ? "#ff2038" : "#2a6bff");
      if (e.z > 1.5 && !e.passed) {
        e.passed = true;
        this._nearMiss(e);
      }
      if (Math.abs(e.z) < 4.1 && !e.collided && Math.abs(targetX - this.carX) < 1.95) {
        e.collided = true;
        e.scored = true;
        this._hitVehicle(e, true);
      }
      if (e.z > 32) this._deactivate(e);
    }

    for (const c of this.coresList) {
      if (!c.active) continue;
      c.z += scrollStatic;
      c.bob += dt * 2;
      c.group.position.set(c.x, 1.25 + Math.sin(c.bob) * 0.22, c.z);
      c.group.rotation.y += dt * 1.6;
      c.ring2.rotation.z += dt * 2.2;
      c.core.rotation.x += dt * 1.1;
      c.core.rotation.y += dt * 0.8;
      if (Math.abs(c.z) < 3.2 && Math.abs(c.x - this.carX) < 2.3 && !this.airborne) {
        this._deactivate(c);
        this.cores++;
        this.bumpCombo();
        this.timeLeft = Math.min(999, this.timeLeft + 7);
        this.shield = Math.min(100, this.shield + 10);
        this.turbo = Math.min(100, this.turbo + 30);
        const mult = this.addScore(200);
        this.audio.pickup();
        this.effects.pickup(new THREE.Vector3(c.x, 1.2, c.z));
        this.callbacks.toast?.(`DATA CORE  +7s  +${Math.round(200 * mult)}`, "gold");
      }
      if (c.z > 30) this._deactivate(c);
    }

    for (const r of this.ramps) {
      if (!r.active) continue;
      r.z += scrollStatic;
      r.group.position.set(r.x, 0.02, r.z);
      if (Math.abs(r.z) < 3.2 && Math.abs(r.x - this.carX) < 2.0 && !this.airborne) {
        this.airborne = true;
        this.jumpV = 11.5;
        this.jumpY = 0.15;
        this.audio.jump();
        this.shake = Math.max(this.shake, 0.45);
        this.callbacks.toast?.("TURBO JUMP", "cyan");
        this.effects.sparks(new THREE.Vector3(this.carX, 0.4, 2), "#7fe8ff");
      }
      if (r.z > 25) this._deactivate(r);
    }
  }

  _updateCamera(dt) {
    if (this.mode === "menu") {
      const a = 0.78 + Math.sin(this.time * 0.1) * 0.1;
      const cx = this.carX - 8.4 * Math.cos(a);
      const cz = -1.8 - 9.2 * Math.sin(a);
      this.camera.position.set(cx, 2.3 + Math.sin(this.time * 0.27) * 0.1, cz);
      this.camera.lookAt(this.carX + 1.9, 0.74, 0.35);
      if (Math.abs(this.camera.fov - 40) > 0.01) {
        this.camera.fov = damp(this.camera.fov, 40, 4, dt);
        this.camera.updateProjectionMatrix();
      }
      return;
    }

    const speedNorm = clamp(this.speed / TURBO_MAX, 0, 1);
    const jumpLift = this.jumpY * 0.55;
    const desired = new THREE.Vector3(
      this.carX * 0.8,
      3.55 + jumpLift + speedNorm * 0.55,
      8.4 + speedNorm * 2.4
    );
    const k = 1 - Math.exp(-5.2 * dt);
    this.camera.position.lerp(desired, k);
    const look = new THREE.Vector3(
      this.carX * 0.62,
      1.0 + this.jumpY * 0.8,
      -7 - speedNorm * 5
    );
    this.camera.lookAt(look);
    const targetFov = 61 + speedNorm * 11 + (this.boostActive ? 5 : 0);
    this.camera.fov = damp(this.camera.fov, targetFov, 3.6, dt);
    this.camera.updateProjectionMatrix();

    if (this.shake > 0.001) {
      const s = this.shake;
      this.camera.position.x += (Math.random() - 0.5) * 0.42 * s;
      this.camera.position.y += (Math.random() - 0.5) * 0.3 * s;
      this.camera.rotateZ((Math.random() - 0.5) * 0.02 * s);
    }
  }

  getHud() {
    return {
      mode: this.mode,
      speedMph: Math.round(this.speed * 2.23694),
      speedNorm: clamp(this.speed / TURBO_MAX, 0, 1),
      score: Math.floor(this.score),
      timer: Math.max(0, this.timeLeft),
      distance: this.distance / 1609.34,
      shield: this.shield,
      turbo: this.turbo,
      combo: this.combo,
      multiplier: 1 + Math.min(this.combo, 12) * 0.25,
      kills: this.kills,
      cores: this.cores,
      topSpeed: Math.round(this.topSpeed * 2.23694),
      target: this.targetEnemy ? this.targetEnemy.group.position : null,
      laserCooldown: this.laserCooldown,
      boostActive: this.boostActive,
      airborne: this.airborne,
      invuln: this.invuln,
    };
  }
}

function speedDt(speed, dt) {
  return speed * dt;
}
