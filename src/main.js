import * as THREE from 'three'
import { createWorld, CITY } from './city.js'
import { VEHICLE_TYPES, buildVehicle, addVehicleLabel, updateVehicleVisuals } from './vehicles.js'
import { createCharacter, createPedestrian, animateCharacter } from './player.js'
import { UI } from './ui.js'
import { GameAudio } from './audio.js'
import { clamp, damp, lerp, makeRng, glowTexture, canvas2d, canvasTexture } from './utils.js'

const stage = document.getElementById('stage')
const ui = new UI()
const audio = new GameAudio()

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1800)

function responsiveFov() {
  const aspect = window.innerWidth / window.innerHeight
  return aspect < 0.7 ? 72 : aspect < 1 ? 64 : 58
}
camera.fov = responsiveFov()
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.domElement.id = 'game-canvas'
renderer.domElement.setAttribute('aria-label', 'San Andreas Neon State 3D world')
stage.appendChild(renderer.domElement)

const world = createWorld(scene, renderer)
ui.buildMap(world)

/* ------------------------------------------------------------------ state */

const state = {
  mode: 'foot', // foot | car | down
  playing: false,
  cash: 12450,
  health: 100,
  armor: 0,
  wanted: 0,
  battery: 100,
  elapsed: 0,
  clockStart: 19 * 60 + 42,
  activeVehicle: null,
  lastDamageAt: -99,
  lastCrimeAt: -99,
  lastCrashAt: -99,
  cameraShake: 0,
  bustedTimer: 0,
  police: [],
  endTimer: 0,
  missionCompleteCooldown: 0,
}

const input = {
  keys: new Set(),
  forward: 0,
  strafe: 0,
  run: false,
  handbrake: false,
  jumpQueued: false,
}

const cam = {
  yaw: 0,
  pitch: 0.17,
  dist: 7.7,
  lastDrag: 0,
  dragYaw: 0,
  dragging: false,
  lastX: 0,
  lastY: 0,
  target: new THREE.Vector3(),
  initialized: false,
}

const player = createCharacter({ player: true, hoodie: 0x2d6b50, pants: 0x394356, skin: 0x8a563a })
player.root.position.set(world.spawn.x, surfaceHeight(world.spawn.x, world.spawn.z), world.spawn.z)
player.root.rotation.y = world.spawn.heading
scene.add(player.root)
animateCharacter(player, 0, 0.016, { t: 0 })

const playerState = {
  heading: world.spawn.heading,
  speed: 0,
  vy: 0,
  jump: 0,
  grounded: true,
  step: 0,
}

const vehicles = []
const traffic = []
const peds = []
const shards = []
const labels = []
let missionMarker = null
let mission = null
let safeTick = 0

/* ------------------------------------------------------------- showcase cars */

const SHOWCASE_ORDER = ['cyber', 'mantis', 'aero', 'volt', 'nova', 'titan', 'lumen']
const showcaseX = [-17.1, -11.4, -5.7, 0, 5.7, 11.4, 17.1]

SHOWCASE_ORDER.forEach((id, i) => {
  const type = VEHICLE_TYPES.find((t) => t.id === id)
  const v = buildVehicle(type, { showcase: true })
  v.group.position.set(showcaseX[i], 0.30, world.showcase.z)
  v.group.rotation.y = world.showcase.heading
  v.parked = true
  v.home = v.group.position.clone()
  v.homeHeading = v.group.rotation.y
  v.typesIndex = VEHICLE_TYPES.indexOf(type)
  scene.add(v.group)
  addVehicleLabel(v)
  vehicles.push(v)
  labels.push(v.label)
})

/* ------------------------------------------------------------------- traffic */

const trafficRng = makeRng(778812)
const trafficTypeIds = ['lumen', 'aero', 'nova', 'titan', 'lumen', 'aero', 'nova', 'titan', 'aero', 'lumen', 'nova']
const trafficPaints = [0xe7e3da, 0x87909d, 0x33425c, 0x8c3040, 0x2f6b5b, 0xc3a467, 0x58497c, 0xbfbcb2, 0x292f3a, 0x7a3f3a]

function spawnTraffic() {
  for (let i = 0; i < 10; i++) {
    const base = VEHICLE_TYPES.find((t) => t.id === trafficTypeIds[i])
    const type = {
      ...base,
      color: trafficPaints[i % trafficPaints.length],
      accent: trafficPaints[(i + 3) % trafficPaints.length],
      id: `${base.id}-${i}`,
    }
    const v = buildVehicle(type, { ai: true })
    const axis = i % 2 === 0 ? 'x' : 'z'
    const dir = i % 4 < 2 ? 1 : -1
    const road = CITY.roadCenters[1 + Math.floor(trafficRng.next() * 4)]
    const lane = axis === 'x' ? road + dir * 4.15 : road - dir * 4.15
    let along = trafficRng.range(-150, 150)
    // keep the spawn block clear
    if (axis === 'x' && Math.abs(lane - 96) < 12) along = trafficRng.range(115, 155) * (trafficRng.next() > 0.5 ? 1 : -1)
    if (axis === 'z' && Math.abs(lane) < 40 && along > 40 && along < 110) along = -trafficRng.range(60, 150)
    v.group.position.set(axis === 'x' ? along : lane, 0.02, axis === 'x' ? lane : along)
    v.heading = axis === 'x' ? (dir > 0 ? Math.PI / 2 : -Math.PI / 2) : (dir > 0 ? 0 : Math.PI)
    v.group.rotation.y = v.heading
    v.parked = false
    v.ai = true
    scene.add(v.group)
    const t = { vehicle: v, axis, dir, road, lane, along, speed: trafficRng.range(7, 13), phase: trafficRng.range(0, 10) }
    traffic.push(t)
    vehicles.push(v)
  }
}
spawnTraffic()

/* --------------------------------------------------------------- pedestrians */

const pedRng = makeRng(44551)
const walkableBlocks = world.blockTypes.filter((b) => b.type !== 'plaza')
for (let i = 0; i < 20; i++) {
  const block = walkableBlocks[Math.floor(pedRng.next() * walkableBlocks.length)]
  const char = createPedestrian(i * 7 + 3)
  const edge = 22.2
  const perimeter = edge * 8
  const t = pedRng.range(0, perimeter)
  const speed = pedRng.range(0.85, 1.5)
  const ped = { char, block, t, perimeter, edge, speed, dir: pedRng.next() > 0.25 ? 1 : -1, state: 'walk', timer: 0, vx: 0, vz: 0, homeT: t }
  const pos = pedPos(ped)
  char.root.position.set(pos.x, surfaceHeight(pos.x, pos.z), pos.z)
  char.root.rotation.y = pos.heading
  scene.add(char.root)
  peds.push(ped)
}

function pedPos(ped) {
  const len = ped.edge * 2
  let t = ped.t % ped.perimeter
  if (t < 0) t += ped.perimeter
  let x, z, heading
  if (t < len) {
    x = ped.block.x - ped.edge + t
    z = ped.block.z - ped.edge
    heading = Math.PI / 2
  } else if (t < len * 2) {
    x = ped.block.x + ped.edge
    z = ped.block.z - ped.edge + (t - len)
    heading = 0
  } else if (t < len * 3) {
    x = ped.block.x + ped.edge - (t - len * 2)
    z = ped.block.z + ped.edge
    heading = -Math.PI / 2
  } else {
    x = ped.block.x - ped.edge
    z = ped.block.z + ped.edge - (t - len * 3)
    heading = Math.PI
  }
  if (ped.dir < 0) heading += Math.PI
  return { x, z, heading }
}

/* -------------------------------------------------------------- collectibles */

const shardGroup = new THREE.Group()
scene.add(shardGroup)
const shardGeo = new THREE.OctahedronGeometry(0.36)
const shardMat = new THREE.MeshStandardMaterial({ color: 0x66f4ff, emissive: 0x1bb8d8, emissiveIntensity: 2.1, metalness: 0.6, roughness: 0.12 })
const shardRingMat = new THREE.MeshBasicMaterial({ color: 0x66f4ff, transparent: true, opacity: 0.34, side: THREE.DoubleSide, toneMapped: false })
const shardGlowTex = glowTexture('rgba(140,250,255,1)')

for (let i = 0; i < world.shardSpots.length; i++) {
  const spot = safeSpot(world.shardSpots[i].x, world.shardSpots[i].z)
  const group = new THREE.Group()
  const crystal = new THREE.Mesh(shardGeo, shardMat)
  crystal.position.y = 1.25
  group.add(crystal)
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.8, 0.95, 24), shardRingMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.08
  group.add(ring)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: shardGlowTex, color: 0x66f4ff, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  }))
  glow.scale.set(2.8, 2.8, 1)
  glow.position.y = 1.28
  group.add(glow)
  group.position.set(spot.x, surfaceHeight(spot.x, spot.z), spot.z)
  shardGroup.add(group)
  shards.push({ group, crystal, ring, collected: false, spot: new THREE.Vector3(spot.x, 0, spot.z), phase: i * 0.7 })
}

function safeSpot(x, z) {
  let px = x
  let pz = z
  for (let i = 0; i < 12; i++) {
    const hit = world.colliders.some((c) => px > c.minX - 1 && px < c.maxX + 1 && pz > c.minZ - 1 && pz < c.maxZ + 1)
    if (!hit) break
    px += 7
    if (px > 160) { px = x; pz -= 7 }
    if (pz < -160) break
  }
  return { x: clamp(px, -225, 225), z: clamp(pz, -225, 224) }
}

/* ------------------------------------------------------------------- mission */

function makeMissionMarker(spot) {
  if (missionMarker) {
    scene.remove(missionMarker.group)
    missionMarker.group.traverse((o) => { if (o.geometry) o.geometry.dispose?.() })
  }
  const group = new THREE.Group()
  const gold = 0xffc857
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.9, 44, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.075, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }),
  )
  beam.position.y = 22
  group.add(beam)
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.7, 3.15, 48),
    new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.9, side: THREE.DoubleSide, toneMapped: false, depthWrite: false }),
  )
  ring.rotation.x = -Math.PI / 2
  ring.position.y = 0.12
  group.add(ring)
  const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(1.2, 1.35, 36),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide, toneMapped: false, depthWrite: false }),
  )
  ring2.rotation.x = -Math.PI / 2
  ring2.position.y = 0.13
  group.add(ring2)
  const diamond = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.62),
    new THREE.MeshBasicMaterial({ color: gold, toneMapped: false, transparent: true, opacity: 0.9 }),
  )
  diamond.position.y = 2.1
  group.add(diamond)
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: shardGlowTex, color: gold, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  }))
  glow.scale.set(5, 5, 1)
  glow.position.y = 2.1
  group.add(glow)

  const label = missionLabelSprite('DROP ZONE', `$${mission?.reward?.toLocaleString?.('en-US') || '2,500'}`)
  label.position.y = 4.2
  group.add(label)

  group.position.set(spot.x, surfaceHeight(spot.x, spot.z), spot.z)
  scene.add(group)
  missionMarker = { group, diamond, ring, ring2, beam, label, spot: new THREE.Vector3(spot.x, 0, spot.z) }
}

function missionLabelSprite(title, sub) {
  const { c, ctx } = canvas2d(512, 160)
  ctx.clearRect(0, 0, 512, 160)
  ctx.textAlign = 'center'
  ctx.font = '900 52px "Arial Black", Arial, sans-serif'
  ctx.shadowColor = '#ffc857'
  ctx.shadowBlur = 22
  ctx.fillStyle = '#ffffff'
  ctx.fillText(title, 256, 70)
  ctx.shadowBlur = 0
  ctx.font = '800 24px Arial, sans-serif'
  ctx.fillStyle = '#ffc857'
  ctx.fillText(sub, 256, 116)
  const tex = canvasTexture(c)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }))
  sprite.scale.set(5.6, 1.75, 1)
  return sprite
}

function startMission(index = 0) {
  const spot = safeSpot(world.missionSpots[index % world.missionSpots.length].x, world.missionSpots[index % world.missionSpots.length].z)
  const pos = new THREE.Vector3(spot.x, 0, spot.z)
  const names = ['PROTOTYPE CELL', 'NEON SIGN PARTS', 'MEDICAL CARGO', 'VINYL CRATE', 'SERVER RACK', 'BATTERY MODULE', 'HOLOGRAM REEL']
  const rewards = [2500, 2800, 3100, 3400, 3800, 4200, 4700]
  mission = {
    index,
    spot: pos,
    title: 'COURIER RUN',
    target: names[index % names.length],
    reward: rewards[index % rewards.length],
    timeLeft: Math.max(95, 165 - index * 7),
    maxTime: Math.max(95, 165 - index * 7),
    startDistance: player.root.position.distanceTo(pos),
    completed: false,
  }
  makeMissionMarker(pos)
  ui.toast(`NEW DROP · ${names[index % names.length]} · $${mission.reward.toLocaleString('en-US')}`, 'gold', 3200)
}

function completeMission() {
  if (!mission || mission.completed) return
  mission.completed = true
  state.cash += mission.reward
  audio.cash()
  ui.flash()
  ui.toast(`DELIVERY COMPLETE +$${mission.reward.toLocaleString('en-US')}`, 'gold', 3000)
  if (state.activeVehicle) {
    attachHeadlightFlare(state.activeVehicle)
  }
  const next = mission.index + 1
  ui.showCinematic('DELIVERY COMPLETE', `+$${mission.reward.toLocaleString('en-US')} · NEXT DROP INBOUND`, 1900)
  setTimeout(() => {
    if (!state.playing) return
    startMission(next)
  }, 2300)
}

/* ------------------------------------------------------------- interaction */

function surfaceHeight(x, z) {
  if (z > 168 && z < 232) return 0.025
  if (z >= 232) return -0.1
  for (const b of world.blockTypes) {
    if (Math.abs(x - b.x) < 24 && Math.abs(z - b.z) < 24) return 0.29
  }
  return 0.02
}

function nearestVehicle(maxDist = 4.6) {
  const p = player.root.position
  let best = null
  let bestDist = maxDist
  for (const v of vehicles) {
    if (v === state.activeVehicle) continue
    if (v.police) continue
    const d = Math.hypot(v.group.position.x - p.x, v.group.position.z - p.z)
    const limit = maxDist + Math.max(v.width, v.length) * 0.15
    if (d < limit && d < bestDist + 1) {
      best = v
      bestDist = d
    }
  }
  return best
}

function enterVehicle(v) {
  if (!v || state.mode !== 'foot') return
  state.mode = 'car'
  state.activeVehicle = v
  v.parked = true
  v.ai = false
  v.steer = 0
  v.speed = 0
  v.vel = new THREE.Vector3()
  v.heading = v.group.rotation.y
  v.battery = 100
  v.damage = 0
  v.accel = 0
  v.drift = 0
  v.boostBlend = 0
  v.lastCrash = -99

  const t = traffic.find((tr) => tr.vehicle === v)
  if (t) traffic.splice(traffic.indexOf(t), 1)

  player.root.visible = v.type.shape === 'bike'
  if (v.type.shape === 'bike') {
    player.root.position.copy(v.group.position)
    player.root.rotation.order = 'YXZ'
    player.root.rotation.y = v.heading
    player.root.position.y += 0.24
  }
  v.labelsHidden = true
  addHeadlights(v)
  cam.yaw = v.heading - Math.PI
  cam.pitch = 0.17
  cam.dist = v.type.shape === 'bike' ? 6.4 : 8.4
  cam.lastDrag = state.elapsed
  snapCamera()
  ui.showVehicleCard(v)
  ui.toast(`${v.type.name} · ${v.type.drivetrain}`, '', 2600)
  audio.enterCar()
  state.battery = 100
}

function exitVehicle() {
  const v = state.activeVehicle
  if (!v) return
  const h = v.heading
  const right = new THREE.Vector3(Math.cos(h), 0, -Math.sin(h))
  const candidates = [
    new THREE.Vector3().copy(v.group.position).addScaledVector(right, -2.4),
    new THREE.Vector3().copy(v.group.position).addScaledVector(right, 2.4),
    new THREE.Vector3().copy(v.group.position).add(new THREE.Vector3(0, 0, -v.length * 0.8)),
    new THREE.Vector3().copy(v.group.position).add(new THREE.Vector3(0, 0, v.length * 0.8)),
  ]
  let spot = candidates[0]
  for (const c of candidates) {
    const hitBuilding = world.colliders.some((b) => c.x > b.minX - 0.6 && c.x < b.maxX + 0.6 && c.z > b.minZ - 0.6 && c.z < b.maxZ + 0.6)
    if (!hitBuilding) { spot = c; break }
  }
  player.root.position.set(spot.x, surfaceHeight(spot.x, spot.z), spot.z)
  player.root.rotation.y = h + Math.PI / 2
  player.root.visible = true
  playerState.heading = player.root.rotation.y
  playerState.speed = 0
  playerState.jump = 0
  playerState.vy = 0
  removeHeadlights(v)
  v.speed = 0
  v.vel?.set(0, 0, 0)
  v.parked = true
  state.activeVehicle = null
  state.mode = 'foot'
  cam.yaw = h + Math.PI / 2 - Math.PI
  cam.dist = 7.7
  cam.lastDrag = state.elapsed
  snapCamera()
  audio.blip(220, 0.09, 0.04)
}

function addHeadlights(v) {
  removeHeadlights(v)
  const front = v.length / 2 + 0.1
  const positions = [-v.width * 0.3, v.width * 0.3]
  v.headlights = []
  for (const x of positions) {
    const light = new THREE.SpotLight(0xdff4ff, 120, 55, Math.PI / 7.5, 0.55, 1.4)
    light.position.set(x, 0.92, front)
    const target = new THREE.Object3D()
    target.position.set(x * 1.4, 0.1, front + 26)
    v.group.add(target)
    light.target = target
    v.group.add(light)
    v.headlights.push({ light, target })
  }
}

function removeHeadlights(v) {
  if (!v?.headlights) return
  for (const { light, target } of v.headlights) {
    v.group.remove(light)
    v.group.remove(target)
    light.dispose?.()
  }
  v.headlights = []
}

function attachHeadlightFlare() {
  // reserved for future vehicle-specific effects
}

/* --------------------------------------------------------------- police */

function spawnPolice() {
  if (state.police.length >= 3 || state.wanted <= 0) return
  const type = VEHICLE_TYPES.find((t) => t.id === 'apex')
  const v = buildVehicle(type, { ai: true })
  v.police = true
  v.ai = true
  v.speed = 0
  v.vel = new THREE.Vector3()
  const angle = Math.random() * Math.PI * 2
  const base = state.activeVehicle?.group.position || player.root.position
  const road = CITY.roadCenters[1 + Math.floor(Math.random() * 4)]
  const x = road
  const z = clamp(base.z + 70 * Math.sin(angle), -150, 150)
  v.group.position.set(x, 0.02, z)
  v.heading = Math.atan2(base.x - x, base.z - z)
  v.group.rotation.y = v.heading
  scene.add(v.group)
  state.police.push(v)
  vehicles.push(v)
  ui.toast('POLICE DISPATCHED · LOSE THEM', 'pink', 3000)
  audio.blip(300, 0.2, 0.05, 'square')
}

function clearPolice() {
  for (const v of state.police) {
    scene.remove(v.group)
    const idx = vehicles.indexOf(v)
    if (idx >= 0) vehicles.splice(idx, 1)
  }
  state.police.length = 0
  audio.setSiren(false)
}

function addWanted(n = 1, reason = 'CRIME') {
  if (state.mode === 'down') return
  state.wanted = Math.min(5, state.wanted + n)
  state.lastCrimeAt = state.elapsed
  ui.toast(`${reason.toUpperCase()} · WANTED ${'★'.repeat(state.wanted)}`, 'pink', 2600)
  if (state.wanted >= 2) spawnPolice()
}

/* ------------------------------------------------------------------ damage */

function damagePlayer(amount) {
  if (state.mode === 'down') return
  let dmg = amount
  if (state.armor > 0) {
    const absorbed = Math.min(state.armor, dmg * 0.6)
    state.armor -= absorbed
    dmg -= absorbed
  }
  state.health -= dmg
  state.lastDamageAt = state.elapsed
  state.cameraShake = Math.min(0.55, state.cameraShake + 0.14)
  if (state.health <= 0) {
    state.health = 0
    beginDown('wasted')
  }
}

function beginDown(kind) {
  if (state.mode === 'down') return
  state.mode = 'down'
  state.endTimer = 2.8
  ui.showEnd(kind)
  if (kind === 'busted') {
    state.cash = Math.max(0, state.cash - 500)
    audio.setSiren(false)
  } else {
    state.cash = Math.max(0, state.cash - 250)
  }
  audio.blip(kind === 'busted' ? 220 : 140, 0.7, 0.06, 'sawtooth')
  clearPolice()
  const v = state.activeVehicle
  if (v) {
    removeHeadlights(v)
    v.speed = 0
    v.vel?.set(0, 0, 0)
    state.activeVehicle = null
  }
  player.root.visible = false
}

function respawn() {
  clearPolice()
  state.wanted = 0
  state.health = 100
  state.armor = 0
  state.mode = 'foot'
  state.activeVehicle = null
  player.root.visible = true
  player.root.position.set(world.spawn.x, surfaceHeight(world.spawn.x, world.spawn.z), world.spawn.z)
  player.root.rotation.y = world.spawn.heading
  playerState.heading = world.spawn.heading
  playerState.speed = 0
  playerState.jump = 0
  playerState.vy = 0
  cam.yaw = 0
  cam.pitch = 0.17
  cam.dist = 7.7
  cam.lastDrag = state.elapsed
  ui.hideEnd()
  if (state.playing) {
    if (!mission || mission.completed) startMission(mission?.index ?? 0)
    else makeMissionMarker(mission.spot)
  }
}

/* ----------------------------------------------------------------- inputs */

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase()
  if (['w', 'a', 's', 'd', ' ', 'shift', 'e', 'm', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) e.preventDefault()
  if (input.keys.has(k)) return
  input.keys.add(k)
  if (k === 'e') interact()
  if (k === 'm') document.getElementById('mute-btn')?.click()
  if (k === ' ' && state.mode === 'foot') input.jumpQueued = true
  if (k === 'r' && state.activeVehicle) {
    const v = state.activeVehicle
    v.vel?.set(0, 0, 0)
    v.speed = 0
    v.group.position.y = surfaceHeight(v.group.position.x, v.group.position.z)
  }
})
window.addEventListener('keyup', (e) => input.keys.delete(e.key.toLowerCase()))
window.addEventListener('blur', () => input.keys.clear())

renderer.domElement.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return
  cam.dragging = true
  cam.lastX = e.clientX
  cam.lastY = e.clientY
  cam.dragYaw = cam.yaw
  renderer.domElement.setPointerCapture?.(e.pointerId)
})
renderer.domElement.addEventListener('pointermove', (e) => {
  if (!cam.dragging) return
  const dx = e.clientX - cam.lastX
  const dy = e.clientY - cam.lastY
  cam.lastX = e.clientX
  cam.lastY = e.clientY
  cam.yaw -= dx * 0.0052
  cam.pitch = clamp(cam.pitch + dy * 0.0032, 0.04, 0.82)
  cam.lastDrag = state.elapsed
  if (Math.abs(dx) + Math.abs(dy) > 2) cam.dragYaw = cam.yaw
})
const endDrag = () => { cam.dragging = false }
renderer.domElement.addEventListener('pointerup', endDrag)
renderer.domElement.addEventListener('pointercancel', endDrag)
renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault())
renderer.domElement.addEventListener('wheel', (e) => {
  cam.dist = clamp(cam.dist + Math.sign(e.deltaY) * 0.6, 5.2, 13)
  e.preventDefault()
}, { passive: false })

function interact() {
  if (!state.playing || state.mode === 'down') return
  if (state.mode === 'car') {
    const v = state.activeVehicle
    if (v && Math.abs(v.speed) > 7) {
      ui.toast('SLOW DOWN TO EXIT', '', 1200)
      return
    }
    exitVehicle()
    return
  }
  const v = nearestVehicle(5.2)
  if (v) enterVehicle(v)
}

ui.onAction = interact
ui.onMute = (muted) => audio.setMuted(muted)

ui.onPlay = () => {
  state.playing = true
  audio.init()
  audio.setMuted(document.body.classList.contains('muted'))
  cam.yaw = 0
  cam.pitch = 0.17
  cam.dist = 7.7
  cam.lastDrag = state.elapsed
  snapCamera()
  if (!mission) startMission(0)
  ui.toast('WELCOME TO NEON STATE · 2026', '', 2400)
  setTimeout(() => ui.toast('COURIER JOB ACTIVE · FOLLOW THE GOLD BEAM', 'gold', 3800), 900)
  ui.ready()
}

/* ---------------------------------------------------------------- gameplay */

function readInput() {
  const keys = input.keys
  const pad = ui.touch
  const kf = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0)
  const ks = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0)
  const run = keys.has('shift') || pad.boost
  const touchMove = Math.hypot(pad.x, pad.y)
  const forward = clamp(kf + (pad.y < -0.15 ? -pad.y * 1.3 : 0) + (pad.gas ? 1 : 0) - (pad.brake ? 1 : 0), -1, 1)
  const strafe = clamp(ks + pad.x, -1, 1)
  input.forward = forward
  input.strafe = strafe
  input.run = run
  input.handbrake = keys.has(' ') || pad.handbrake
  return {
    forward, strafe, run,
    handbrake: keys.has(' ') || pad.handbrake,
    boosting: keys.has('shift') || pad.boost,
    jump: input.jumpQueued,
    moving: Math.abs(forward) + Math.abs(strafe) + touchMove > 0.1,
  }
}

function updateOnFoot(dt, inp) {
  const camForward = new THREE.Vector3(-Math.sin(cam.yaw), 0, -Math.cos(cam.yaw))
  const camRight = new THREE.Vector3(Math.cos(cam.yaw), 0, -Math.sin(cam.yaw))
  const dir = new THREE.Vector3()
  dir.addScaledVector(camForward, inp.forward)
  dir.addScaledVector(camRight, inp.strafe)
  const len = dir.length()
  let speed = 0
  if (len > 0.08) {
    dir.normalize()
    const targetHeading = Math.atan2(dir.x, dir.z)
    playerState.heading = dampAngle(playerState.heading, targetHeading, 12, dt)
    speed = inp.run ? 6.6 : 3.5
    speed *= Math.min(1, len)
    player.root.position.x += dir.x * speed * dt
    player.root.position.z += dir.z * speed * dt
  }
  playerState.speed = damp(playerState.speed, speed, 9, dt)
  player.root.rotation.y = playerState.heading

  // jump physics
  if (inp.jump && playerState.grounded) {
    playerState.vy = 5.6
    playerState.grounded = false
    input.jumpQueued = false
  }
  if (!playerState.grounded) {
    playerState.vy -= 15.5 * dt
    playerState.jump += playerState.vy * dt
    if (playerState.jump <= 0) {
      playerState.jump = 0
      playerState.vy = 0
      playerState.grounded = true
    }
  }

  let x = player.root.position.x
  let z = player.root.position.z
  x = clamp(x, -228, 228)
  z = clamp(z, -228, 224)
  const r = 0.38
  for (const c of world.colliders) {
    const nx = clamp(x, c.minX, c.maxX)
    const nz = clamp(z, c.minZ, c.maxZ)
    const dx = x - nx
    const dz = z - nz
    const d2 = dx * dx + dz * dz
    if (d2 < r * r) {
      let d = Math.sqrt(d2)
      if (d < 0.0001) {
        const dl = x - c.minX, dr = c.maxX - x, dtp = z - c.minZ, db = c.maxZ - z
        const m = Math.min(dl, dr, dtp, db)
        if (m === dl) x = c.minX - r
        else if (m === dr) x = c.maxX + r
        else if (m === dtp) z = c.minZ - r
        else z = c.maxZ + r
      } else {
        x += (dx / d) * (r - d)
        z += (dz / d) * (r - d)
      }
    }
  }
  // solid cars
  for (const v of vehicles) {
    if (v === state.activeVehicle) continue
    const dx = x - v.group.position.x
    const dz = z - v.group.position.z
    const rr = Math.max(v.width * 0.55, 0.7) + 0.32
    const d = Math.hypot(dx, dz)
    if (d < rr && d > 0.0001) {
      x += (dx / d) * (rr - d)
      z += (dz / d) * (rr - d)
    }
  }
  player.root.position.x = x
  player.root.position.z = z
  player.root.position.y = surfaceHeight(x, z) + playerState.jump

  animateCharacter(player, playerState.speed, dt, { t: state.elapsed })
}

function updateCar(dt, inp) {
  const v = state.activeVehicle
  if (!v) { state.mode = 'foot'; return }
  if (!v.vel) v.vel = new THREE.Vector3()
  const spec = v.type.spec
  const shape = v.type.shape
  const maxSpeedMs = (spec.top / 3.6) * (shape === 'bike' ? 1.0 : 1.0)
  const accelBase = shape === 'bike' ? 21 : shape === 'truck' || shape === 'cyber' ? 12 : 16
  const handling = spec.handling
  const turnRate = handling.startsWith('S') ? 2.65 : handling.startsWith('A') ? 2.25 : handling.startsWith('B') ? 1.85 : 1.55
  const boost = inp.boosting && state.battery > 0.5
  const throttle = inp.forward
  const braking = throttle < -0.05 && v.vel.dot(new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading))) > 0.5

  const forwardVec = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading))
  const rightVec = new THREE.Vector3(Math.cos(v.heading), 0, -Math.sin(v.heading))
  let vf = v.vel.dot(forwardVec)
  let vl = v.vel.dot(rightVec)

  // throttle / reverse
  if (throttle > 0.02) vf += accelBase * (boost ? 1.45 : 1) * dt
  else if (throttle < -0.02) {
    if (vf > 0.5) vf -= 27 * dt * -throttle
    else vf += accelBase * 0.55 * -throttle * dt
  }
  // drag
  vf *= Math.exp(-(0.26 + (boost ? 0 : 0.05)) * dt)
  const topNow = maxSpeedMs * (boost ? 1.1 : 1) * (state.battery > 0 ? 1 : 0.75)
  vf = clamp(vf, -maxSpeedMs * 0.32, topNow)

  // lateral grip
  const grip = inp.handbrake ? 1.1 : shape === 'bike' ? 9.5 : 7.2
  vl *= Math.exp(-grip * dt)

  // steering
  const steerTarget = inp.strafe * 0.46
  v.steer = damp(v.steer || 0, steerTarget, 11, dt)
  const speedFactor = clamp(Math.abs(vf) / 7 + 0.18, 0, 1)
  const reverseSign = vf < -0.3 ? -1 : 1
  v.heading += v.steer * turnRate * speedFactor * reverseSign * dt * (inp.handbrake ? 1.28 : 1)
  v.heading = (v.heading + Math.PI * 3) % (Math.PI * 2) - Math.PI

  // handbrake slow down
  if (inp.handbrake) vf *= Math.exp(-1.1 * dt)

  v.vel.copy(forwardVec).multiplyScalar(vf).addScaledVector(rightVec, vl)
  v.group.position.addScaledVector(v.vel, dt)
  v.group.rotation.order = 'YXZ'
  v.group.rotation.y = v.heading

  const impact = collideCar(v, dt)
  if (impact > 0) {
    damagePlayer(Math.max(0, impact - 5) * 1.5)
    if (state.elapsed - v.lastCrash > 0.6) audio.crash(impact / 10)
  }

  // body attitude
  const targetPitch = clamp(-vf * 0.0028, -0.06, 0.06)
  const targetRoll = clamp(-v.steer * Math.abs(vf) * 0.0022, -0.055, 0.055)
  v.group.rotation.x = damp(v.group.rotation.x, targetPitch, 5, dt)
  v.group.rotation.z = damp(v.group.rotation.z, targetRoll, 5, dt)

  // ride height
  const ground = surfaceHeight(v.group.position.x, v.group.position.z) + 0.015
  v.group.position.y = damp(v.group.position.y, ground, 9, dt)

  // battery
  if (boost && Math.abs(vf) > 0.1) {
    state.battery = Math.max(0, state.battery - 13 * dt)
  } else {
    state.battery = Math.min(100, state.battery + 3.2 * dt)
  }
  v.battery = state.battery

  v.speed = vf
  updateVehicleVisuals(v, vf, v.steer, dt, braking, state.elapsed)

  if (v.type.shape === 'bike') {
    player.root.visible = true
    player.root.position.copy(v.group.position)
    player.root.rotation.order = 'YXZ'
    player.root.rotation.y = v.heading
    player.root.position.y += 0.24
    animateCharacter(player, 0, dt, { riding: true, t: state.elapsed })
  } else {
    player.root.visible = false
  }

  // near-miss pedestrians
  if (Math.abs(vf) > 2) {
    for (const ped of peds) {
      if (ped.state !== 'walk') continue
      const dx = ped.char.root.position.x - v.group.position.x
      const dz = ped.char.root.position.z - v.group.position.z
      if (dx * dx + dz * dz < 5.5 && vf > 2.5) {
        ped.state = 'knocked'
        ped.timer = 0
        const speedK = Math.min(10, vf)
        ped.vx = (dx / Math.max(0.2, Math.hypot(dx, dz))) * speedK * 0.7 + v.vel.x * 0.25
        ped.vz = (dz / Math.max(0.2, Math.hypot(dx, dz))) * speedK * 0.7 + v.vel.z * 0.25
        ped.char.dead = true
        addWanted(1, 'ASSAULT')
        audio.crash(0.55)
        vf *= 0.985
      }
    }
  }
}

function collideCar(v, dt) {
  let maxImpact = 0
  const pos = v.group.position
  const samples = [-0.34, 0, 0.34]
  const radius = Math.max(0.62, v.width * 0.54)
  const sin = Math.sin(v.heading)
  const cos = Math.cos(v.heading)
  const normal = new THREE.Vector3()
  for (const s of samples) {
    const sx = pos.x + sin * s * v.length
    const sz = pos.z + cos * s * v.length
    for (const c of world.colliders) {
      const nx = clamp(sx, c.minX, c.maxX)
      const nz = clamp(sz, c.minZ, c.maxZ)
      const dx = sx - nx
      const dz = sz - nz
      const d2 = dx * dx + dz * dz
      if (d2 < radius * radius) {
        let d = Math.sqrt(d2)
        let nX, nZ
        if (d < 0.0001) {
          const dl = sx - c.minX, dr = c.maxX - sx, dtp = sz - c.minZ, db = c.maxZ - sz
          const m = Math.min(dl, dr, dtp, db)
          if (m === dl) { nX = -1; nZ = 0; d = 0 }
          else if (m === dr) { nX = 1; nZ = 0; d = 0 }
          else if (m === dtp) { nX = 0; nZ = -1; d = 0 }
          else { nX = 0; nZ = 1; d = 0 }
        } else {
          nX = dx / d
          nZ = dz / d
        }
        const push = radius - d
        pos.x += nX * push
        pos.z += nZ * push
        const vn = v.vel.x * nX + v.vel.z * nZ
        if (vn < 0) {
          maxImpact = Math.max(maxImpact, -vn)
          v.vel.x -= nX * vn * 1.3
          v.vel.z -= nZ * vn * 1.3
          v.vel.multiplyScalar(0.86)
        }
      }
    }
  }

  // world bounds and ocean
  if (Math.abs(pos.x) > 226) {
    pos.x = clamp(pos.x, -226, 226)
    v.vel.x *= -0.3
    maxImpact = Math.max(maxImpact, Math.abs(v.vel.x))
  }
  if (pos.z > 222) {
    pos.z = 222
    v.vel.z *= -0.3
    maxImpact = Math.max(maxImpact, Math.abs(v.vel.z))
  }
  if (pos.z < -226) {
    pos.z = -226
    v.vel.z *= -0.3
  }

  // collisions with other vehicles
  for (const other of vehicles) {
    if (other === v) continue
    const dx = pos.x - other.group.position.x
    const dz = pos.z - other.group.position.z
    const d = Math.hypot(dx, dz)
    const rr = Math.max(v.width, other.width) * 0.62 + Math.max(v.length, other.length) * 0.25
    if (d < rr && d > 0.001) {
      const nX = dx / d
      const nZ = dz / d
      const overlap = rr - d
      pos.x += nX * overlap * 0.6
      pos.z += nZ * overlap * 0.6
      other.group.position.x -= nX * overlap * 0.12
      other.group.position.z -= nZ * overlap * 0.12
      const vn = v.vel.x * nX + v.vel.z * nZ
      if (vn < 0) {
        maxImpact = Math.max(maxImpact, -vn * 0.6)
        v.vel.x -= nX * vn * 1.1
        v.vel.z -= nZ * vn * 1.1
        v.vel.multiplyScalar(0.9)
      }
      if (state.elapsed - (v.lastVehicleHit || -9) > 1.4 && Math.abs(v.speed) > 6) {
        v.lastVehicleHit = state.elapsed
        if (!other.police) addWanted(1, 'RECKLESS DRIVING')
        audio.crash(0.65)
      }
    }
  }

  // don't let the car roll into buildings on spawn
  return maxImpact
}

function dampAngle(current, target, lambda, dt) {
  let diff = target - current
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return current + diff * (1 - Math.exp(-lambda * dt))
}

/* ----------------------------------------------------------------- traffic */

function updateTraffic(dt) {
  const activePos = state.activeVehicle?.group.position || player.root.position
  for (const t of traffic) {
    const v = t.vehicle
    // brake if the player is close ahead
    const dx = activePos.x - v.group.position.x
    const dz = activePos.z - v.group.position.z
    const ahead = dx * Math.sin(v.heading) + dz * Math.cos(v.heading)
    const side = Math.abs(dx * Math.cos(v.heading) - dz * Math.sin(v.heading))
    const targetSpeed = ahead > 0 && ahead < 12 && side < 2.7 ? 1.5 : t.speed
    v.aiSpeed = damp(v.aiSpeed ?? t.speed, targetSpeed, 2, dt)
    t.along += v.aiSpeed * dt * t.dir
    if (t.along > 164) t.along = -164
    if (t.along < -164) t.along = 164
    if (t.axis === 'x') {
      v.group.position.set(t.along, 0.02, t.lane)
      v.heading = t.dir > 0 ? Math.PI / 2 : -Math.PI / 2
    } else {
      v.group.position.set(t.lane, 0.02, t.along)
      v.heading = t.dir > 0 ? 0 : Math.PI
    }
    v.group.rotation.y = v.heading
    updateVehicleVisuals(v, v.aiSpeed * t.dir, 0, dt, false, state.elapsed + t.phase)
    // if the player steps out in front, give them a nudge
    if (state.mode === 'foot') {
      const pdx = player.root.position.x - v.group.position.x
      const pdz = player.root.position.z - v.group.position.z
      if (pdx * pdx + pdz * pdz < 3.6 && v.aiSpeed > 4) {
        player.root.position.x += pdx * 0.1 + 0.2
        player.root.position.z += pdz * 0.1 + 0.2
        damagePlayer(3)
        audio.horn()
      }
    }
  }
}

function updatePedestrians(dt) {
  for (const ped of peds) {
    if (ped.state === 'knocked') {
      ped.timer += dt
      ped.char.root.position.x += ped.vx * dt
      ped.char.root.position.z += ped.vz * dt
      ped.vx *= Math.exp(-2.3 * dt)
      ped.vz *= Math.exp(-2.3 * dt)
      ped.char.root.rotation.z = damp(ped.char.root.rotation.z, Math.PI / 2, 5, dt)
      ped.char.root.position.y = damp(ped.char.root.position.y, surfaceHeight(ped.char.root.position.x, ped.char.root.position.z) + 0.18, 6, dt)
      animateCharacter(ped.char, 0, dt, { t: state.elapsed })
      if (ped.timer > 6) {
        ped.state = 'walk'
        ped.t = ped.homeT
        ped.char.dead = false
        ped.char.root.rotation.set(0, 0, 0)
        ped.char.hips.rotation.z = 0
        const pos = pedPos(ped)
        ped.char.root.position.set(pos.x, surfaceHeight(pos.x, pos.z), pos.z)
      }
      continue
    }
    ped.t += ped.speed * ped.dir * dt
    const pos = pedPos(ped)
    ped.char.root.position.x = pos.x
    ped.char.root.position.z = pos.z
    ped.char.root.position.y = surfaceHeight(pos.x, pos.z)
    ped.char.root.rotation.y = pos.heading
    animateCharacter(ped.char, ped.speed, dt, { t: state.elapsed })
  }
}

/* ------------------------------------------------------------------ police */

function updatePolice(dt) {
  const activePos = state.activeVehicle?.group.position || player.root.position
  let nearest = 999
  for (const v of state.police) {
    const dx = activePos.x - v.group.position.x
    const dz = activePos.z - v.group.position.z
    const dist = Math.hypot(dx, dz)
    nearest = Math.min(nearest, dist)
    const desired = Math.atan2(dx, dz)
    let diff = desired - v.heading
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    v.heading += clamp(diff, -1, 1) * 2.1 * dt
    const speedTarget = dist > 9 ? 30 : 10
    v.speed = damp(v.speed || 0, speedTarget, 1.8, dt)
    const forward = new THREE.Vector3(Math.sin(v.heading), 0, Math.cos(v.heading))
    v.group.position.addScaledVector(forward, v.speed * dt)
    v.group.position.y = damp(v.group.position.y, surfaceHeight(v.group.position.x, v.group.position.z) + 0.015, 8, dt)
    v.group.rotation.y = v.heading
    updateVehicleVisuals(v, v.speed, 0, dt, false, state.elapsed)
    v.group.position.x = clamp(v.group.position.x, -220, 220)
    v.group.position.z = clamp(v.group.position.z, -220, 220)

    if (dist < 4.2 && state.mode !== 'down') {
      const playerSpeed = state.activeVehicle ? Math.abs(state.activeVehicle.speed) : 0
      if (playerSpeed < 4.8) {
        state.bustedTimer += dt
        if (state.bustedTimer > 0.7) beginDown('busted')
      } else {
        state.bustedTimer = 0
        damagePlayer(8 * dt)
        state.cameraShake = Math.min(0.4, state.cameraShake + 0.02)
      }
    }
  }
  if (!state.police.length) state.bustedTimer = 0
  else if (nearest > 4.2) state.bustedTimer = Math.max(0, state.bustedTimer - dt * 2)
  audio.setSiren(state.police.length > 0 && nearest < 75)
}

/* ------------------------------------------------------------------ camera */

function updateCamera(dt, snap = false) {
  const active = state.activeVehicle
  const t = snap ? 1 : 1 - Math.exp(-8 * dt)
  if (state.mode === 'foot' || state.mode === 'down') {
    cam.target.set(player.root.position.x, player.root.position.y + 1.75, player.root.position.z)
    if (state.mode === 'foot') {
      const moving = playerState.speed > 0.4
      if (!cam.dragging && moving && state.elapsed - cam.lastDrag > 1.1) {
        cam.yaw = dampAngle(cam.yaw, playerState.heading - Math.PI, 1.4, dt)
      }
    }
  } else if (active) {
    cam.target.set(active.group.position.x, active.group.position.y + 1.55, active.group.position.z)
    if (!cam.dragging && state.elapsed - cam.lastDrag > 1.4) {
      cam.yaw = dampAngle(cam.yaw, active.heading - Math.PI, 2.1, dt)
    }
  }
  const dist = cam.dist
  const cosP = Math.cos(cam.pitch)
  const desired = new THREE.Vector3(
    cam.target.x + Math.sin(cam.yaw) * dist * cosP,
    cam.target.y + Math.sin(cam.pitch) * dist + 0.55,
    cam.target.z + Math.cos(cam.yaw) * dist * cosP,
  )
  const minY = surfaceHeight(desired.x, desired.z) + 0.55
  if (desired.y < minY) desired.y = minY
  if (state.cameraShake > 0.001) {
    desired.x += (Math.random() - 0.5) * state.cameraShake
    desired.y += (Math.random() - 0.5) * state.cameraShake
    desired.z += (Math.random() - 0.5) * state.cameraShake
    state.cameraShake *= Math.exp(-5 * dt)
  }
  if (snap || !cam.initialized) {
    camera.position.copy(desired)
    cam.smoothTarget = cam.target.clone()
    cam.initialized = true
  } else {
    camera.position.lerp(desired, 1 - Math.exp(-7 * dt))
    if (!cam.smoothTarget) cam.smoothTarget = cam.target.clone()
    cam.smoothTarget.lerp(cam.target, 1 - Math.exp(-10 * dt))
  }
  camera.lookAt(cam.smoothTarget || cam.target)
}

function snapCamera() {
  updateCamera(0.016, true)
  cam.initialized = true
}

/* ------------------------------------------------------------------ update */

function updateGame(dt) {
  const inp = readInput()
  if (state.mode === 'foot') updateOnFoot(dt, inp)
  else if (state.mode === 'car') updateCar(dt, inp)
  else if (state.mode === 'down') {
    state.endTimer -= dt
    if (state.endTimer <= 0) {
      respawn()
      return
    }
  }

  updateTraffic(dt)
  updatePedestrians(dt)
  updatePolice(dt)

  // health regen
  if (state.mode !== 'down' && state.elapsed - state.lastDamageAt > 7) {
    state.health = Math.min(100, state.health + 1.6 * dt)
  }

  // wanted decay
  if (state.wanted > 0 && state.elapsed - state.lastCrimeAt > 22 && state.elapsed - (state.lastWantedDecay || 0) > 9 && state.police.every((p) => p.group.position.distanceTo(state.activeVehicle?.group.position || player.root.position) > 55)) {
    state.wanted = Math.max(0, state.wanted - 1)
    state.lastWantedDecay = state.elapsed
    if (state.wanted === 0) clearPolice()
  }

  // shard collection
  const activePos = state.activeVehicle?.group.position || player.root.position
  for (const shard of shards) {
    if (shard.collected) continue
    shard.crystal.rotation.y += dt * 1.8
    shard.crystal.position.y = 1.25 + Math.sin(state.elapsed * 2 + shard.phase) * 0.16
    shard.ring.scale.setScalar(1 + Math.sin(state.elapsed * 2.2 + shard.phase) * 0.12)
    shard.ring.material.opacity = 0.24 + Math.sin(state.elapsed * 2 + shard.phase) * 0.1
    const dx = activePos.x - shard.spot.x
    const dz = activePos.z - shard.spot.z
    if (dx * dx + dz * dz < 6.2) {
      shard.collected = true
      shard.group.visible = false
      state.cash += 250
      audio.cash()
      ui.toast('DATA SHARD SECURED +$250', 'gold', 2200)
      ui.flash()
    }
  }

  // mission marker animation and delivery
  if (missionMarker) {
    missionMarker.group.rotation.y += dt * 0.35
    missionMarker.diamond.rotation.y += dt * 2.2
    missionMarker.diamond.position.y = 2.1 + Math.sin(state.elapsed * 2.4) * 0.18
    const pulse = 1 + Math.sin(state.elapsed * 2.8) * 0.08
    missionMarker.ring.scale.setScalar(pulse)
    missionMarker.ring2.scale.setScalar(1.4 - (pulse - 1) * 3)
    missionMarker.label.position.y = 4.2 + Math.sin(state.elapsed * 1.7) * 0.12
    if (mission && !mission.completed) {
      const dx = activePos.x - mission.spot.x
      const dz = activePos.z - mission.spot.z
      const dist = Math.hypot(dx, dz)
      mission.distance = dist
      if (dist < 4.2) completeMission()
    }
  }

  // mission timer
  if (mission && !mission.completed) {
    mission.timeLeft -= dt
    if (mission.timeLeft <= 0) {
      mission.timeLeft = 0
      mission.completed = true
      ui.toast('DROP MISSED · REROUTING', 'pink', 3000)
      audio.blip(150, 0.5, 0.05, 'sawtooth')
      setTimeout(() => {
        if (state.playing) startMission(mission ? mission.index : 0)
      }, 2600)
    }
  }

  updateCamera(dt)
}

/* --------------------------------------------------------------- UI update */

function clockText() {
  const total = Math.floor(state.clockStart + state.elapsed / 5) % (24 * 60)
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function updateUI() {
  const active = state.activeVehicle
  const pos = active?.group.position || player.root.position
  const missionDist = mission && mission.spot ? Math.hypot(pos.x - mission.spot.x, pos.z - mission.spot.z) : 0
  const prompt = state.mode === 'foot' ? (() => {
    const v = nearestVehicle(5.2)
    return v ? `DRIVE · ${v.type.name}` : ''
  })() : state.mode === 'car' ? (Math.abs(active?.speed || 0) < 2.2 ? 'EXIT VEHICLE' : '') : ''

  const speedKmh = active ? Math.abs(active.speed || 0) * 3.6 : playerState.speed * 3.6
  let gear = 'N'
  if (active) {
    if (active.speed < -0.4) gear = 'R'
    else if (Math.abs(active.speed) < 0.2) gear = 'N'
    else gear = 'D'
  }
  const timerText = mission ? `${String(Math.max(0, Math.floor(mission.timeLeft / 60))).padStart(2, '0')}:${String(Math.max(0, Math.floor(mission.timeLeft % 60))).padStart(2, '0')}` : '--:--'
  const distanceText = missionDist > 999 ? `${(missionDist / 1000).toFixed(1)} km` : `${Math.round(missionDist)} m`
  const startDist = mission?.startDistance || Math.max(1, missionDist)
  const progress = mission ? clamp(1 - missionDist / Math.max(startDist, 60), 0.02, 1) : 0

  ui.update({
    player: { x: pos.x, z: pos.z, heading: active ? active.heading : playerState.heading },
    speedKmh,
    gear,
    cash: state.cash,
    health: state.health,
    armor: state.armor,
    wanted: state.wanted,
    clock: clockText(),
    district: ui.districtFor(pos.x, pos.z),
    vehicle: active ? active.type : null,
    battery: state.battery,
    prompt,
    mission: mission && !mission.completed ? {
      title: mission.title,
      target: mission.target,
      timerText,
      distanceText,
      progress,
    } : null,
    markers: {
      mission: mission && !mission.completed ? mission.spot : null,
      shards: shards.filter((s) => !s.collected).map((s) => s.spot),
      traffic: [
        ...traffic.map((t) => t.vehicle.group.position),
        ...state.police.map((p) => p.group.position),
      ].map((p, i) => ({ x: p.x, z: p.z, police: i >= traffic.length })),
    },
  })
  ui._prompt = prompt
}

/* ---------------------------------------------------------------- render */

let last = performance.now()
let firstFrame = true

function loop(now) {
  requestAnimationFrame(loop)
  const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
  last = now
  state.elapsed += dt

  world.update(dt, state.elapsed)

  if (state.playing) {
    if (state.mode !== 'down') updateGame(dt)
    else {
      state.endTimer -= dt
      if (state.endTimer <= 0) respawn()
      updateTraffic(dt)
      updatePedestrians(dt)
      updateCamera(dt)
    }
    updateUI()
    audio.updateEngine({
      driving: state.mode === 'car',
      speed: state.activeVehicle?.speed || 0,
      throttle: input.forward,
      braking: input.keys.has('s'),
      boosting: input.keys.has('shift') || ui.touch.boost,
      drifting: !!state.activeVehicle && Math.abs(state.activeVehicle.steer || 0) > 0.2 && Math.abs(state.activeVehicle.speed || 0) > 8,
    })
  } else {
    animateCharacter(player, 0, dt, { t: state.elapsed })
    for (const ped of peds) animateCharacter(ped.char, ped.speed, dt, { t: state.elapsed })
    for (const t of traffic) updateVehicleVisuals(t.vehicle, t.aiSpeed || 0, 0, dt, false, state.elapsed)
    updateCamera(dt)
  }

  // label visibility
  const labelMax = 32
  const ref = state.activeVehicle?.group.position || player.root.position
  for (const v of vehicles) {
    if (!v.label) continue
    const d = v.group.position.distanceTo(ref)
    v.label.visible = state.playing && !state.activeVehicle && d < labelMax && state.mode !== 'down'
  }

  // traffic light beacons / blobs not needed every frame; keep camera light stable
  renderer.render(scene, camera)
  if (firstFrame) {
    firstFrame = false
    ui.ready()
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.fov = responsiveFov()
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65))
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onResize)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) audio.suspend()
  else if (state.playing) audio.resume()
})

// Debug/introspection hook used by the automated capture harness.
window.__SA = {
  state,
  player,
  playerState,
  world,
  vehicles,
  traffic,
  peds,
  shards,
  input,
  camera,
  renderer,
  scene,
  nearestVehicle,
  enterVehicle,
  exitVehicle,
  startMission,
  updateGame,
  updateUI,
  addWanted,
  damagePlayer,
  surfaceHeight,
  get mission() { return mission },
  get police() { return state.police },
  teleport(x, z) {
    const y = surfaceHeight(x, z)
    player.root.position.set(x, y, z)
    if (state.activeVehicle) {
      state.activeVehicle.group.position.set(x, y, z)
      state.activeVehicle.speed = 0
      state.activeVehicle.vel?.set(0, 0, 0)
    }
  },
  setCamera(yaw, pitch, dist) {
    if (typeof yaw === 'number') cam.yaw = yaw
    if (typeof pitch === 'number') cam.pitch = pitch
    if (typeof dist === 'number') cam.dist = dist
    cam.initialized = false
  },
  // advance simulation deterministically, independent of render frame rate
  step(dt = 1 / 60, frames = 1) {
    for (let i = 0; i < frames; i++) {
      state.elapsed += dt
      updateGame(dt)
    }
    updateUI()
  },
}

// initial camera framing
snapCamera()
updateUI()
requestAnimationFrame(loop)
