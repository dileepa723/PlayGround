import * as THREE from '../vendor/three.module.js'
import { clamp, lerp } from './world.js'

function taperedBox(wb, db, wt, dt, h, shift = 0) {
  const hb = wb / 2, hd = db / 2, ht = wt / 2, td = dt / 2
  const verts = [
    -hb, 0, -hd, hb, 0, -hd, hb, 0, hd, -hb, 0, hd,
    -ht, h, -td + shift, ht, h, -td + shift, ht, h, td + shift, -ht, h, td + shift,
  ]
  const idx = [
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    0, 1, 5, 0, 5, 4,
    1, 2, 6, 1, 6, 5,
    2, 3, 7, 2, 7, 6,
    3, 0, 4, 3, 4, 7,
  ]
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  g.setIndex(idx)
  g.computeVertexNormals()
  return g
}

function makeCar(color = 0xff5432) {
  const car = new THREE.Group()
  const paint = new THREE.MeshStandardMaterial({
    color, metalness: 0.55, roughness: 0.28, envMapIntensity: 1.2,
  })
  const dark = new THREE.MeshStandardMaterial({ color: 0x181c1f, metalness: 0.5, roughness: 0.55 })
  const glass = new THREE.MeshStandardMaterial({
    color: 0x0d1a22, metalness: 0.95, roughness: 0.08, envMapIntensity: 1.6,
  })
  const chrome = new THREE.MeshStandardMaterial({ color: 0xc8d0d4, metalness: 1, roughness: 0.18 })

  const body = new THREE.Mesh(taperedBox(1.94, 4.25, 2.02, 3.75, 0.52), paint)
  body.position.y = 0.28
  body.castShadow = true
  car.add(body)

  const nose = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 1.15), paint)
  nose.position.set(0, 0.8, 1.42)
  nose.castShadow = true
  car.add(nose)

  const cabin = new THREE.Mesh(taperedBox(1.62, 2.55, 1.28, 1.62, 0.52, -0.18), glass)
  cabin.position.set(0, 0.8, -0.12)
  cabin.castShadow = true
  car.add(cabin)

  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 1.55), paint)
  roof.position.set(0, 1.32, -0.3)
  car.add(roof)

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.09, 0.55), dark)
  splitter.position.set(0, 0.24, 2.03)
  car.add(splitter)
  const skirtL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 2.5), dark)
  skirtL.position.set(-1.0, 0.24, 0)
  car.add(skirtL)
  const skirtR = skirtL.clone()
  skirtR.position.x = 1.0
  car.add(skirtR)

  const wing = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.08, 0.42), dark)
  wing.position.set(0, 1.0, -2.02)
  car.add(wing)
  for (const x of [-0.66, 0.66]) {
    const support = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.24, 0.18), dark)
    support.position.set(x, 0.88, -2.0)
    car.add(support)
  }

  const lightMat = new THREE.MeshStandardMaterial({
    color: 0xfff6dc, emissive: 0xfff0c8, emissiveIntensity: 2.4,
  })
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0xff2b1c, emissive: 0xff1a0a, emissiveIntensity: 1.8,
  })
  for (const x of [-0.64, 0.64]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.12, 0.1), lightMat)
    hl.position.set(x, 0.68, 2.13)
    car.add(hl)
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.08), tailMat)
    tl.position.set(x, 0.7, -2.12)
    car.add(tl)
  }
  const brakeBar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.06), tailMat)
  brakeBar.position.set(0, 0.92, -2.12)
  car.add(brakeBar)

  // wheels
  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 14)
  wheelGeo.rotateZ(Math.PI / 2)
  const rimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.315, 8)
  rimGeo.rotateZ(Math.PI / 2)
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x141516, roughness: 0.92 })
  const wheels = []
  const frontWheels = []
  const wheelOffsets = [
    [-0.94, 0.42, 1.38, true], [0.94, 0.42, 1.38, true],
    [-0.94, 0.42, -1.42, false], [0.94, 0.42, -1.42, false],
  ]
  for (const [x, y, z, front] of wheelOffsets) {
    const pivot = new THREE.Group()
    pivot.position.set(x, y, z)
    const tyre = new THREE.Mesh(wheelGeo, tyreMat)
    tyre.castShadow = true
    const rim = new THREE.Mesh(rimGeo, chrome)
    pivot.add(tyre, rim)
    car.add(pivot)
    wheels.push({ pivot, tyre, rim })
    if (front) frontWheels.push(pivot)
  }

  // boost flames
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x7fe6ff, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })
  const flames = []
  for (const x of [-0.45, 0.45]) {
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.4, 8), flameMat)
    f.rotation.x = -Math.PI / 2
    f.position.set(x, 0.52, -2.55)
    f.visible = false
    car.add(f)
    flames.push(f)
  }

  car.traverse(o => { if (o.isMesh) o.castShadow = true })
  return { car, paint, wheels, frontWheels, flames, tailMat, lightMat, flameMat }
}

function makeShadowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.55, 'rgba(0,0,0,0.28)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  return t
}

export class Vehicle {
  constructor(world, scene, { color } = {}) {
    this.world = world
    this.scene = scene
    const { car, paint, wheels, frontWheels, flames, tailMat, flameMat } = makeCar(color)
    this.group = car
    this.paint = paint
    this.wheels = wheels
    this.frontWheels = frontWheels
    this.flames = flames
    this.tailMat = tailMat
    this.flameMat = flameMat
    scene.add(car)

    const shadowMat = new THREE.MeshBasicMaterial({
      map: makeShadowTexture(), transparent: true, depthWrite: false, opacity: 0.55,
    })
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 5.6), shadowMat)
    this.shadow.rotation.x = -Math.PI / 2
    scene.add(this.shadow)

    this.pos = new THREE.Vector3(0, 8, 300)
    this.yaw = Math.PI
    this.velocity = new THREE.Vector3()
    this.vy = 0
    this.steer = 0
    this.steerTarget = 0
    this.wheelSpin = 0
    this.grounded = true
    this.pitch = 0
    this.roll = 0
    this.boost = 1
    this.boosting = false
    this.drifting = false
    this.speed = 0
    this.speedKmh = 0
    this.airTime = 0
    this.offroad = false
    this.suspension = 0
    this.wallHit = 0
    this.landed = 0
    this.boostPadCooldown = 0
    this.lastSafe = new THREE.Vector3(0, 8, 300)
    this.safeYaw = Math.PI
    this.safeTimer = 0
    this.radius = 2.05
    this.time = 0
    this.input = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false }
    this.collision = null
  }

  respawn(x = this.lastSafe.x, z = this.lastSafe.z, yaw = this.safeYaw) {
    this.pos.set(x, this.world.heightAt(x, z) + 0.05, z)
    this.yaw = yaw
    this.velocity.set(0, 0, 0)
    this.vy = 0
    this.steer = this.steerTarget = 0
    this.boost = Math.max(this.boost, 0.35)
    this.grounded = true
    this.airTime = 0
    this.syncVisual(0)
  }

  resetToStart() {
    this.lastSafe.set(0, this.world.heightAt(0, 300), 300)
    this.safeYaw = Math.PI
    this.respawn(0, 300, Math.PI)
  }

  update(dt, input) {
    this.time += dt
    dt = Math.min(dt, 0.05)
    const world = this.world
    const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))

    let vForward = this.velocity.dot(fwd)
    let vRight = this.velocity.dot(right)

    const throttle = clamp(input.throttle - input.brake, -1, 1)
    const steerInput = clamp(input.steer, -1, 1)
    const steerSpeed = Math.abs(vForward)
    this.steerTarget = steerInput * (0.62 - 0.24 * clamp(steerSpeed / 60, 0, 1))
    this.steer = lerp(this.steer, this.steerTarget, 1 - Math.exp(-12 * dt))

    const ground = world.heightAt(this.pos.x, this.pos.z)
    this.offroad = world.nearestRoad(this.pos.x, this.pos.z).d > 11.5
    const grip = input.handbrake ? 1.9 : this.offroad ? 5.2 : 9.2

    this.boosting = false
    if (input.boost && this.boost > 0.01 && this.grounded && vForward > -1) {
      this.boosting = true
      this.boost = Math.max(0, this.boost - dt * 0.29)
    } else {
      this.boost = Math.min(1, this.boost + dt * (this.offroad ? 0.04 : 0.075))
    }

    const maxSpeed = this.boosting ? 64 : this.offroad ? 34 : 47

    if (this.grounded) {
      let accel = 0
      if (throttle > 0) {
        accel = throttle * (this.boosting ? 38 : 22) * (1 - clamp(vForward / maxSpeed, 0, 1) * 0.72)
      } else if (throttle < 0) {
        if (vForward > 0.8) accel = throttle * 32
        else accel = throttle * 13
      }
      if (this.boosting) accel += 17
      vForward += accel * dt

      if (this.boosting && vForward > maxSpeed) vForward = lerp(vForward, maxSpeed, 1 - Math.exp(-2 * dt))
      if (vForward > maxSpeed) vForward -= (vForward - maxSpeed) * (1 - Math.exp(-1.4 * dt))
      if (vForward < -14) vForward = -14

      // rolling + air drag
      const drag = (this.offroad ? 0.9 : 0.32) + Math.abs(vForward) * 0.008
      vForward *= Math.exp(-drag * dt)
      if (throttle === 0 && Math.abs(vForward) < 0.35) vForward = 0

      // lateral grip
      vRight *= Math.exp(-grip * dt)

      // steering
      const speedFactor = clamp(steerSpeed / 5, 0, 1) * (1 - 0.5 * clamp(steerSpeed / 70, 0, 1))
      const turnRate = 1.55
      this.yaw += this.steer * turnRate * speedFactor * dt * (vForward < -0.2 ? -1 : 1)
      if (input.handbrake && steerSpeed > 5) {
        this.yaw += this.steer * 0.95 * dt * speedFactor
        vRight *= 0.985
      }

      this.drifting = Math.abs(vRight) > 3.4 && steerSpeed > 8 && !this.offroad
    } else {
      this.drifting = false
      this.airTime += dt
      vRight *= Math.exp(-0.4 * dt)
      vForward *= Math.exp(-0.12 * dt)
    }

    // recompose velocity
    fwd.set(Math.sin(this.yaw), 0, Math.cos(this.yaw))
    right.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    this.velocity.set(fwd.x * vForward + right.x * vRight, 0, fwd.z * vForward + right.z * vRight)

    // integrate
    this.pos.x += this.velocity.x * dt
    this.pos.z += this.velocity.z * dt

    const groundNow = world.heightAt(this.pos.x, this.pos.z)
    if (this.pos.y <= groundNow + 0.08) {
      if (!this.grounded && this.airTime > 0.18) {
        this.landed = clamp(this.airTime * 9, 0.4, 3.2)
        if (this.vy < -6) this.suspension = clamp(-this.vy * 0.03, 0, 0.5)
      }
      this.grounded = true
      this.airTime = 0
      this.pos.y = groundNow
      this.vy = 0
    } else {
      this.grounded = false
      this.vy -= 21 * dt
      this.pos.y += this.vy * dt
      if (this.pos.y < groundNow) {
        this.pos.y = groundNow
        this.vy = 0
        this.grounded = true
        this.airTime = 0
      }
    }

    // collisions
    this.collideBuildings()
    this.collideBounds()

    // water / falling out of world
    if (this.pos.y < 0.55 || groundNow < 0.25) {
      this.safeTimer += dt
      if (this.safeTimer > 0.6) {
        this.safeTimer = 0
        this.respawn(this.lastSafe.x, this.lastSafe.z, this.safeYaw)
        this.collision = 'water'
      }
    } else {
      this.safeTimer = 0
    }

    // remember safe asphalt spot
    if (this.grounded && !this.offroad && this.pos.y > 1) {
      this.safeTimer = 0
      if (this.time - (this._safeAt || 0) > 1.2) {
        this._safeAt = this.time
        this.lastSafe.copy(this.pos)
        this.safeYaw = this.yaw
      }
    }

    this.speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2)
    this.speedKmh = this.speed * 3.6

    // visual orientation from terrain
    const hF = world.heightAt(this.pos.x + fwd.x * 1.4, this.pos.z + fwd.z * 1.4)
    const hB = world.heightAt(this.pos.x - fwd.x * 1.4, this.pos.z - fwd.z * 1.4)
    const hR = world.heightAt(this.pos.x + right.x * 0.95, this.pos.z + right.z * 0.95)
    const hL = world.heightAt(this.pos.x - right.x * 0.95, this.pos.z - right.z * 0.95)
    let targetPitch = -Math.atan2(hF - hB, 2.8)
    let targetRoll = Math.atan2(hR - hL, 1.9)
    if (!this.grounded) {
      targetPitch = lerp(this.pitch, 0, 0.02)
      targetRoll = lerp(this.roll, 0, 0.02)
    }
    const k = 1 - Math.exp(-(this.grounded ? 9 : 2) * dt)
    this.pitch = lerp(this.pitch, targetPitch, k)
    this.roll = lerp(this.roll, targetRoll, k)

    this.suspension = lerp(this.suspension, 0, 1 - Math.exp(-8 * dt))
    this.wheelSpin += (vForward / 0.42) * dt
    this.wallHit = Math.max(0, this.wallHit - dt * 2.4)

    this.syncVisual(dt)

    this.input = input
  }

  collideBuildings() {
    const buildings = this.world.buildings
    const r = this.radius
    for (const b of buildings) {
      const dx = this.pos.x - b.x
      const dz = this.pos.z - b.z
      if (Math.abs(dx) > b.w / 2 + r + 2 || Math.abs(dz) > b.d / 2 + r + 2) continue
      if (this.pos.y > b.y + b.h) continue
      const cx = clamp(this.pos.x, b.x - b.w / 2, b.x + b.w / 2)
      const cz = clamp(this.pos.z, b.z - b.d / 2, b.z + b.d / 2)
      let nx = this.pos.x - cx, nz = this.pos.z - cz
      let dist = Math.hypot(nx, nz)
      if (dist < r) {
        if (dist < 0.0001) {
          nx = dx > 0 ? 1 : -1; nz = 0; dist = 1
        }
        nx /= dist; nz /= dist
        const push = r - dist
        this.pos.x += nx * push
        this.pos.z += nz * push
        const into = this.velocity.x * nx + this.velocity.z * nz
        if (into < 0) {
          this.velocity.x -= nx * into * 1.35
          this.velocity.z -= nz * into * 1.35
        }
        this.velocity.multiplyScalar(0.72)
        this.wallHit = 1
        this.collision = 'wall'
      }
    }
  }

  collideBounds() {
    const r = Math.hypot(this.pos.x, this.pos.z)
    if (r > 940) {
      const nx = this.pos.x / r, nz = this.pos.z / r
      this.pos.x = nx * 940
      this.pos.z = nz * 940
      const into = this.velocity.x * nx + this.velocity.z * nz
      if (into > 0) {
        this.velocity.x -= nx * into * 1.5
        this.velocity.z -= nz * into * 1.5
      }
    }
  }

  syncVisual(dt) {
    const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw))
    this.group.position.set(this.pos.x, this.pos.y + 0.02 - this.suspension, this.pos.z)
    const eu = new THREE.Euler(this.pitch, this.yaw, this.roll, 'YXZ')
    this.group.quaternion.setFromEuler(eu)

    // wheels
    this.wheels.forEach((w, i) => {
      w.tyre.rotation.x = this.wheelSpin
      w.rim.rotation.x = this.wheelSpin
      if (i < 2) w.pivot.rotation.y = this.steer * 0.85
    })

    // boost flames
    const on = this.boosting
    this.flames.forEach((f, i) => {
      f.visible = on
      if (on) {
        const s = 0.7 + Math.sin(this.time * 40 + i * 2) * 0.18 + Math.random() * 0.12
        f.scale.set(1, s, 1)
        f.position.z = -2.5 - s * 0.25
      }
    })
    this.flameMat.opacity = on ? 0.75 + Math.random() * 0.2 : 0
    this.tailMat.emissiveIntensity = (this.input.brake > 0 || this.input.handbrake) ? 3.6 : 1.6

    // ground shadow
    this.shadow.position.set(this.pos.x, this.pos.y + 0.09, this.pos.z)
    this.shadow.rotation.z = -this.yaw
    this.shadow.material.opacity = this.grounded ? 0.55 : 0.2

    if (dt > 0) {
      this.paint.color.offsetHSL(0, 0, 0)
    }
  }
}
