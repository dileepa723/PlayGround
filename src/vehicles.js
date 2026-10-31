import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { addBlobShadow, addGlow, glowTexture, labelTexture } from './utils.js'

export const VEHICLE_TYPES = [
  {
    id: 'volt', name: 'VOLT GT', brand: 'NEON MOTORS', className: 'ELECTRIC HYPERCAR',
    color: 0x27d8f2, accent: 0x7cf6ff, shape: 'hyper', drivetrain: 'TRI-MOTOR AWD',
    width: 2.08, length: 4.66, wheelbase: 2.86, wheelRadius: 0.38, rideHeight: 0.24,
    spec: { top: 340, accel: 1.9, handling: 'S+' },
  },
  {
    id: 'cyber', name: 'CYBER X', brand: 'ARC SYSTEMS', className: 'STAINLESS PICKUP',
    color: 0xc6ccd6, accent: 0xf4f7ff, shape: 'cyber', drivetrain: 'QUAD-MOTOR AWD',
    width: 2.18, length: 5.62, wheelbase: 3.42, wheelRadius: 0.44, rideHeight: 0.4,
    spec: { top: 209, accel: 2.8, handling: 'B' },
  },
  {
    id: 'aero', name: 'AERO S', brand: 'NEON MOTORS', className: 'LUXURY ELECTRIC SEDAN',
    color: 0xf1f2f4, accent: 0xa9f7ff, shape: 'sedan', drivetrain: 'DUAL-MOTOR AWD',
    width: 1.97, length: 4.94, wheelbase: 2.96, wheelRadius: 0.37, rideHeight: 0.25,
    spec: { top: 322, accel: 2.2, handling: 'A+' },
  },
  {
    id: 'mantis', name: 'MANTIS R', brand: 'RONIN EV', className: 'ELECTRIC SUPERBIKE',
    color: 0x8bff45, accent: 0x6dffa6, shape: 'bike', drivetrain: 'CHAIN DRIVE',
    width: 0.82, length: 2.26, wheelbase: 1.52, wheelRadius: 0.34, rideHeight: 0.0,
    spec: { top: 300, accel: 2.0, handling: 'S' },
  },
  {
    id: 'titan', name: 'TITAN EV', brand: 'SIERRA WORKS', className: 'ADVENTURE PICKUP',
    color: 0xff7b35, accent: 0xffb15c, shape: 'truck', drivetrain: '4×4 DUAL-MOTOR',
    width: 2.17, length: 5.34, wheelbase: 3.2, wheelRadius: 0.45, rideHeight: 0.38,
    spec: { top: 201, accel: 3.4, handling: 'C+' },
  },
  {
    id: 'nova', name: 'NOVA SUV', brand: 'AURELION', className: 'PERFORMANCE ELECTRIC SUV',
    color: 0x344a6a, accent: 0x9b7bff, shape: 'suv', drivetrain: 'DUAL-MOTOR AWD',
    width: 2.06, length: 4.98, wheelbase: 3.02, wheelRadius: 0.41, rideHeight: 0.3,
    spec: { top: 251, accel: 2.9, handling: 'B+' },
  },
  {
    id: 'lumen', name: 'LUMEN', brand: 'KITE MOBILITY', className: 'URBAN ELECTRIC HATCH',
    color: 0xd6b3ff, accent: 0xff7cf0, shape: 'compact', drivetrain: 'FWD SINGLE MOTOR',
    width: 1.8, length: 3.94, wheelbase: 2.5, wheelRadius: 0.34, rideHeight: 0.22,
    spec: { top: 178, accel: 4.1, handling: 'B' },
  },
  {
    id: 'apex', name: 'APEX P-9', brand: 'LSPD', className: 'PURSUIT INTERCEPTOR',
    color: 0x11151f, accent: 0x64a8ff, shape: 'police', drivetrain: 'DUAL-MOTOR AWD',
    width: 2.0, length: 5.02, wheelbase: 3.0, wheelRadius: 0.39, rideHeight: 0.26,
    spec: { top: 290, accel: 2.4, handling: 'A' },
  },
]

const TRAFFIC_PAINTS = [0xe8e6df, 0x8d929c, 0x3d4a66, 0x9c2f3d, 0x2c6b5d, 0xd5b26a, 0x5c4b7e, 0xc9c5bb, 0x2a2f3a]

const tireMat = new THREE.MeshStandardMaterial({ color: 0x0e0e13, roughness: 0.92, metalness: 0.05 })
const rimMat = new THREE.MeshStandardMaterial({ color: 0xb9c0ca, roughness: 0.26, metalness: 0.92 })
const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x11141b, roughness: 0.62, metalness: 0.45 })
const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0x0a1220, roughness: 0.08, metalness: 0.7, transparent: true, opacity: 0.86,
  clearcoat: 1, clearcoatRoughness: 0.08,
})
const headlightMat = new THREE.MeshBasicMaterial({ color: 0xf5fbff, toneMapped: false })
const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff1838, toneMapped: false })
const plateMat = new THREE.MeshBasicMaterial({ color: 0xdfe7ef, toneMapped: false })

let _glowTex = null
let _shadowReady = false

function makeWheel(radius, width, segments = 18, accent = 0x66f4ff) {
  const pivot = new THREE.Group()
  const spin = new THREE.Group()
  pivot.add(spin)
  // open-donut tire so the silver rim face is actually visible
  const tube = radius * 0.24
  const tireGeo = new THREE.TorusGeometry(radius - tube, tube, 8, segments)
  const tire = new THREE.Mesh(tireGeo, tireMat)
  tire.scale.z = width / (tube * 2)
  tire.rotation.y = Math.PI / 2
  tire.castShadow = false
  spin.add(tire)
  const rimGeo = new THREE.CylinderGeometry(radius * 0.64, radius * 0.64, width * 1.1, Math.max(10, segments - 4), 1)
  const rim = new THREE.Mesh(rimGeo, rimMat)
  rim.rotation.z = Math.PI / 2
  spin.add(rim)
  const hubGeo = new THREE.CylinderGeometry(radius * 0.24, radius * 0.24, width * 1.16, 8)
  const hub = new THREE.Mesh(hubGeo, darkTrimMat)
  hub.rotation.z = Math.PI / 2
  spin.add(hub)
  // luminous rim rings — an unmistakable modern-EV detail
  const ringMat = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false, transparent: true, opacity: 0.9 })
  for (const side of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.58, 0.013, 5, 22), ringMat)
    ring.rotation.y = Math.PI / 2
    ring.position.x = side * width * 0.585
    spin.add(ring)
  }
  return { pivot, spin }
}

function roundedBox(w, h, d, radius = 0.14, material = darkTrimMat) {
  const geo = new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, Math.min(w, h, d) * 0.45))
  return new THREE.Mesh(geo, material)
}

function wedgeBody(width, height, length, topLength, material, topOffset = -0.18) {
  const s = new THREE.Shape()
  s.moveTo(-length / 2, 0)
  s.lineTo(length / 2, 0)
  s.lineTo(length / 2 - (length - topLength) * 0.28, height)
  s.lineTo(-length / 2 + (length - topLength) * 0.72, height)
  s.lineTo(-length / 2, 0)
  const geo = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false, steps: 1 })
  geo.translate(0, 0, -width / 2)
  geo.rotateY(Math.PI / 2)
  geo.computeVertexNormals()
  const mesh = new THREE.Mesh(geo, material)
  mesh.position.z = topOffset
  return mesh
}

function cabinWedge(width, height, length, frontSlope, rearSlope, material) {
  const s = new THREE.Shape()
  s.moveTo(-length / 2, 0)
  s.lineTo(length / 2, 0)
  s.lineTo(length / 2 - frontSlope * length, height)
  s.lineTo(-length / 2 + rearSlope * length, height)
  s.lineTo(-length / 2, 0)
  const geo = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2, steps: 1 })
  geo.translate(0, 0, -width / 2)
  geo.rotateY(Math.PI / 2)
  geo.computeVertexNormals()
  return new THREE.Mesh(geo, material)
}

function buildWheels(group, type, ai) {
  const wheels = []
  const { width, wheelbase, wheelRadius, rideHeight } = type
  const track = width / 2 - (type.shape === 'bike' ? 0 : 0.04)
  const axleZ = wheelbase / 2
  if (type.shape === 'bike') {
    for (const z of [axleZ, -axleZ]) {
      const w = makeWheel(wheelRadius, 0.2, 20, type.accent)
      w.pivot.position.set(0, wheelRadius, z)
      group.add(w.pivot)
      wheels.push({ ...w, front: z > 0 })
    }
    return wheels
  }
  const positions = [
    [track, axleZ, true], [-track, axleZ, true],
    [track, -axleZ, false], [-track, -axleZ, false],
  ]
  for (const [x, z, front] of positions) {
    const w = makeWheel(wheelRadius, type.shape === 'truck' || type.shape === 'cyber' ? 0.34 : 0.28, ai ? 10 : 18, type.accent)
    w.pivot.position.set(x, wheelRadius, z)
    group.add(w.pivot)
    wheels.push({ ...w, front })
  }
  return wheels
}

function addLightBar(group, type, zFront, zRear, yFront, yRear) {
  const { width, accent } = type
  const front = new THREE.Mesh(new THREE.BoxGeometry(width * 0.62, 0.055, 0.05), headlightMat)
  front.position.set(0, yFront, zFront)
  group.add(front)
  if (!_glowTex) _glowTex = glowTexture()
  addGlow(group, _glowTex, 0xdff6ff, width * 0.5, new THREE.Vector3(0, yFront, zFront + 0.06), 0.4)
  const rear = new THREE.Mesh(new THREE.BoxGeometry(width * 0.68, 0.055, 0.045), taillightMat.clone())
  rear.position.set(0, yRear, zRear)
  rear.userData.isTail = true
  group.add(rear)
  addGlow(group, _glowTex, 0xff1838, width * 0.5, new THREE.Vector3(0, yRear, zRear - 0.05), 0.34)
  addGlow(group, _glowTex, accent, width * 0.32, new THREE.Vector3(0, yRear - 0.05, zRear - 0.04), 0.2)
  return rear
}

export function buildVehicle(type, { ai = false, showcase = false } = {}) {
  if (!_glowTex) _glowTex = glowTexture()
  const group = new THREE.Group()
  group.name = `vehicle-${type.id}`
  const { width, length, wheelRadius, rideHeight, shape } = type

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: type.color,
    metalness: type.id === 'cyber' ? 0.8 : 0.52,
    roughness: type.id === 'cyber' ? 0.32 : 0.3,
    clearcoat: 1,
    clearcoatRoughness: type.id === 'cyber' ? 0.28 : 0.1,
    emissive: type.color,
    emissiveIntensity: 0.045,
  })
  const accentMat = new THREE.MeshStandardMaterial({
    color: type.accent, emissive: type.accent, emissiveIntensity: 0.75,
    roughness: 0.3, metalness: 0.6,
  })

  let bodyY = 0.62 + rideHeight * 0.4
  let cabinH = 0.52

  if (shape === 'bike') {
    const frame = roundedBox(0.22, 0.3, 1.5, 0.08, bodyMat)
    frame.position.y = 0.72
    group.add(frame)
    const battery = roundedBox(0.34, 0.4, 0.56, 0.1, darkTrimMat)
    battery.position.set(0, 0.8, -0.12)
    group.add(battery)
    const tank = roundedBox(0.4, 0.36, 0.68, 0.16, bodyMat)
    tank.position.set(0, 1.0, 0.1)
    group.add(tank)
    const stripe = roundedBox(0.13, 0.045, 0.6, 0.02, darkTrimMat)
    stripe.position.set(0, 1.18, 0.1)
    group.add(stripe)
    const seat = roundedBox(0.29, 0.13, 0.6, 0.06, darkTrimMat)
    seat.position.set(0, 1.04, -0.5)
    group.add(seat)
    const tail = roundedBox(0.28, 0.2, 0.42, 0.09, bodyMat)
    tail.position.set(0, 1.0, -0.93)
    group.add(tail)
    const tailTip = roundedBox(0.16, 0.1, 0.16, 0.04, bodyMat)
    tailTip.position.set(0, 1.05, -1.15)
    group.add(tailTip)
    const forkMat = new THREE.MeshStandardMaterial({ color: 0xc7ced8, metalness: 0.95, roughness: 0.16 })
    for (const x of [-0.1, 0.1]) {
      const fork = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.85, 8), forkMat)
      fork.position.set(x, 0.62, 0.82)
      fork.rotation.x = -0.26
      group.add(fork)
    }
    const bars = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.68, 8), darkTrimMat)
    bars.rotation.z = Math.PI / 2
    bars.position.set(0, 1.18, 0.7)
    group.add(bars)
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.03), glassMat)
    screen.position.set(0, 1.24, 0.82)
    screen.rotation.x = -0.5
    group.add(screen)
    // front fairing hugging the headlight
    const fairing = roundedBox(0.38, 0.3, 0.36, 0.12, bodyMat)
    fairing.position.set(0, 1.02, 0.86)
    group.add(fairing)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), headlightMat)
    head.position.set(0, 0.98, 1.02)
    group.add(head)
    addGlow(group, _glowTex, 0xffffff, 0.55, new THREE.Vector3(0, 0.98, 1.07), 0.5)
    const rearLight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.04), taillightMat.clone())
    rearLight.position.set(0, 1.0, -1.24)
    rearLight.userData.isTail = true
    group.add(rearLight)
    addGlow(group, _glowTex, 0xff1838, 0.42, new THREE.Vector3(0, 1.0, -1.27), 0.4)
    const accentLine = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.03, 0.5), accentMat)
    accentLine.position.set(0, 0.79, -0.06)
    group.add(accentLine)
    // fenders frame each wheel
    const fenderMat = new THREE.MeshStandardMaterial({ color: 0x171a22, metalness: 0.55, roughness: 0.38 })
    for (const z of [type.wheelbase / 2, -type.wheelbase / 2]) {
      const fender = new THREE.Mesh(new THREE.TorusGeometry(wheelRadius + 0.06, 0.045, 4, 12, Math.PI * 0.9), fenderMat)
      fender.rotation.y = Math.PI / 2
      fender.rotation.z = -0.05
      fender.scale.z = 2.4
      fender.position.set(0, wheelRadius + 0.02, z)
      group.add(fender)
    }
  } else if (shape === 'cyber') {
    const lower = roundedBox(width, 0.66, length, 0.08, bodyMat)
    lower.position.y = 0.68 + rideHeight * 0.3
    group.add(lower)
    const upper = wedgeBody(width * 0.97, 0.72, length * 0.92, length * 0.4, bodyMat, -0.32)
    upper.position.y = 1.0 + rideHeight * 0.28
    group.add(upper)
    const glassBand = roundedBox(width * 0.9, 0.2, length * 0.36, 0.04, glassMat)
    glassBand.position.set(0, 1.52 + rideHeight * 0.2, 0.1)
    glassBand.rotation.x = -0.22
    group.add(glassBand)
    const bed = roundedBox(width * 0.8, 0.13, length * 0.3, 0.03, darkTrimMat)
    bed.position.set(0, 1.33, -1.84)
    group.add(bed)
    const bumper = roundedBox(width * 1.01, 0.2, 0.24, 0.03, darkTrimMat)
    bumper.position.set(0, 0.52, length / 2 - 0.02)
    group.add(bumper)
    const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.78, 0.035, 0.04), headlightMat)
    strip.position.set(0, 0.92, length / 2 - 0.03)
    group.add(strip)
    addGlow(group, _glowTex, 0xe8f8ff, width * 0.55, new THREE.Vector3(0, 0.92, length / 2), 0.45)
    const rear = addLightBar(group, type, length / 2, -length / 2, 1.32, 0.9)
    // fender flares
    for (const x of [-1, 1]) {
      for (const z of [type.wheelbase / 2, -type.wheelbase / 2]) {
        const flare = roundedBox(0.16, 0.1, 1.28, 0.04, darkTrimMat)
        flare.position.set(x * (width / 2 - 0.02), wheelRadius + 0.5, z)
        group.add(flare)
      }
    }
  } else {
    // Generic modern EV body: low slung for hyper/sedan, tall for SUV/truck
    const tall = shape === 'suv' || shape === 'truck' ? 1 : 0
    const h = 0.56 + tall * 0.18
    const body = roundedBox(width, h, length * 0.94, shape === 'hyper' ? 0.24 : 0.18, bodyMat)
    body.position.y = bodyY
    group.add(body)

    // nose and tail
    const nose = roundedBox(width * 0.93, 0.22 + tall * 0.08, length * 0.22, 0.1, bodyMat)
    nose.position.set(0, 0.7 + tall * 0.12, length * 0.36)
    group.add(nose)
    const tail = roundedBox(width * 0.92, 0.26 + tall * 0.1, length * 0.18, 0.1, bodyMat)
    tail.position.set(0, 0.72 + tall * 0.12, -length * 0.39)
    group.add(tail)

    // greenhouse — sloped glass wedge gives the car a modern silhouette
    const cabinLen = length * (shape === 'hyper' ? 0.46 : shape === 'compact' ? 0.46 : 0.44)
    const cabinHeight = shape === 'hyper' ? 0.33 : shape === 'suv' ? 0.58 : shape === 'truck' ? 0.52 : 0.47
    const cabinW = width * (shape === 'hyper' ? 0.7 : 0.78)
    const cabin = cabinWedge(
      cabinW, cabinHeight, cabinLen,
      shape === 'hyper' ? 0.32 : 0.27,
      shape === 'hyper' ? 0.3 : 0.24,
      glassMat,
    )
    cabin.position.set(0, bodyY + h / 2 - 0.02, -length * (shape === 'compact' ? 0.02 : 0.07))
    group.add(cabin)

    // roof cap / pillars
    const roof = roundedBox(cabinW * 0.94, 0.05, cabinLen * 0.44, 0.02, bodyMat)
    roof.position.set(0, cabin.position.y + cabinHeight + 0.005, cabin.position.z - cabinLen * 0.055)
    group.add(roof)
    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.035, cabinHeight * 0.94, 0.16), bodyMat)
      pillar.position.set(side * (cabinW / 2 - 0.01), cabin.position.y + cabinHeight / 2, cabin.position.z - cabinLen * 0.27)
      group.add(pillar)
    }
    if (shape === 'suv' || shape === 'truck') {
      const railMat = new THREE.MeshStandardMaterial({ color: 0x2a2d36, metalness: 0.8, roughness: 0.35 })
      for (const x of [-0.65, 0.65]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, cabinLen * 0.8), railMat)
        rail.position.set(x, roof.position.y + 0.06, roof.position.z)
        group.add(rail)
      }
    }

    // dark lower trim + bumpers
    const skirt = roundedBox(width * 1.01, 0.16, length * 0.6, 0.05, darkTrimMat)
    skirt.position.y = 0.41 + rideHeight * 0.2
    group.add(skirt)
    const frontBumper = roundedBox(width * 1.01, 0.22, 0.24, 0.05, darkTrimMat)
    frontBumper.position.set(0, 0.52, length / 2 - 0.04)
    group.add(frontBumper)
    const rearBumper = roundedBox(width * 1.01, 0.22, 0.2, 0.05, darkTrimMat)
    rearBumper.position.set(0, 0.52, -length / 2 + 0.04)
    group.add(rearBumper)

    // headlight strip + taillight strip
    const rear = addLightBar(group, type, length / 2 + 0.005, -length / 2 - 0.005, 0.78 + tall * 0.2, 0.78 + tall * 0.2)

    // side accent
    if (shape !== 'compact') {
      for (const x of [-1, 1]) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.045, length * 0.44), accentMat)
        blade.position.set(x * (width / 2 + 0.005), 0.63 + tall * 0.2, -0.2)
        group.add(blade)
      }
    }

    // mirrors
    for (const x of [-1, 1]) {
      const mirror = roundedBox(0.15, 0.09, 0.25, 0.03, bodyMat)
      mirror.position.set(x * (width / 2 + 0.1), cabin.position.y - 0.02, cabin.position.z + cabinLen * 0.38)
      group.add(mirror)
    }

    // spoiler for hyper
    if (shape === 'hyper') {
      const wing = roundedBox(width * 0.82, 0.05, 0.3, 0.02, darkTrimMat)
      wing.position.set(0, 1.03, -length * 0.43)
      group.add(wing)
      for (const x of [-0.6, 0.6]) {
        const strut = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.1), darkTrimMat)
        strut.position.set(x, 0.9, -length * 0.42)
        group.add(strut)
      }
    }

    // truck bed
    if (shape === 'truck') {
      const bed = roundedBox(width * 0.86, 0.14, length * 0.34, 0.04, darkTrimMat)
      bed.position.set(0, 1.38, -length * 0.3)
      group.add(bed)
      for (const x of [-0.72, 0.72]) {
        const wall = roundedBox(0.08, 0.24, length * 0.34, 0.02, bodyMat)
        wall.position.set(x, 1.48, -length * 0.3)
        group.add(wall)
      }
    }

    // police livery
    if (type.id === 'apex') {
      const white = new THREE.MeshStandardMaterial({ color: 0xe8edf4, metalness: 0.35, roughness: 0.4 })
      for (const x of [-1, 1]) {
        const door = roundedBox(0.03, 0.34, 1.45, 0.01, white)
        door.position.set(x * (width / 2 + 0.012), 0.69, -0.06)
        group.add(door)
      }
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.1, 0.24), new THREE.MeshBasicMaterial({ color: 0x14213a }))
      bar.position.set(0, roof.position.y + 0.12, roof.position.z)
      group.add(bar)
      const red = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.11, 0.18), new THREE.MeshBasicMaterial({ color: 0xff2030, toneMapped: false }))
      red.position.set(-0.33, roof.position.y + 0.2, roof.position.z)
      group.add(red)
      const blue = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.11, 0.18), new THREE.MeshBasicMaterial({ color: 0x2070ff, toneMapped: false }))
      blue.position.set(0.33, roof.position.y + 0.2, roof.position.z)
      group.add(blue)
      group.userData.policeLights = [red, blue]
      addGlow(group, _glowTex, 0xff3040, 1.2, new THREE.Vector3(-0.33, roof.position.y + 0.24, roof.position.z), 0.5)
      addGlow(group, _glowTex, 0x3080ff, 1.2, new THREE.Vector3(0.33, roof.position.y + 0.24, roof.position.z), 0.5)
    }

    group.userData.rearLight = rear
  }

  const wheels = buildWheels(group, type, ai)

  // fender archesthat frame the wheels
  if (shape !== 'bike') {
    const archMat = new THREE.MeshStandardMaterial({ color: 0x171a22, metalness: 0.55, roughness: 0.38 })
    for (const side of [-1, 1]) {
      for (const z of [type.wheelbase / 2, -type.wheelbase / 2]) {
        const arch = new THREE.Mesh(new THREE.TorusGeometry(wheelRadius + 0.1, 0.055, 4, 12, Math.PI), archMat)
        arch.rotation.y = Math.PI / 2
        arch.position.set(side * (width / 2 + 0.015), wheelRadius + 0.01, z)
        group.add(arch)
      }
    }
  }

  // underglow — a defining modern-EV cue
  if (!ai) {
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 1.3, length * 1.02),
      new THREE.MeshBasicMaterial({
        map: _glowTex, color: type.accent, transparent: true, opacity: 0.34,
        blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
      }),
    )
    glow.rotation.x = -Math.PI / 2
    glow.position.y = 0.055
    glow.renderOrder = 3
    group.add(glow)
  }

  addBlobShadow(group, Math.max(width, length) * 0.66, 0.9, 0.035)

  const vehicle = {
    group, type, wheels, width, length, wheelRadius, rideHeight,
    collisionRadius: Math.max(width * 0.62, 0.6),
    label: null,
    headlights: [],
  }

  group.userData.vehicle = vehicle
  return vehicle
}

const labelTexCache = new Map()
export function addVehicleLabel(vehicle) {
  const t = vehicle.type
  if (!labelTexCache.has(t.id)) labelTexCache.set(t.id, labelTexture(t.name, t.className, `#${t.accent.toString(16).padStart(6, '0')}`))
  const mat = new THREE.SpriteMaterial({ map: labelTexCache.get(t.id), transparent: true, depthWrite: false, toneMapped: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(4.5, 1.125, 1)
  sprite.position.set(0, t.shape === 'bike' ? 2.1 : t.shape === 'cyber' ? 2.55 : 2.35, 0)
  sprite.userData.baseY = sprite.position.y
  vehicle.group.add(sprite)
  vehicle.label = sprite
  return sprite
}

export function updateVehicleVisuals(vehicle, speed, steer, dt, braking = false, elapsed = 0) {
  for (const w of vehicle.wheels) {
    if (w.front) w.pivot.rotation.y = steer
    w.spin.rotation.x -= (speed * dt) / Math.max(0.2, vehicle.wheelRadius)
  }
  const tail = vehicle.group.userData.rearLight
  if (tail && tail.material) {
    tail.material.color.setHex(braking ? 0xff5a4a : 0xff1838)
    tail.scale.y = braking ? 1.5 : 1
  }
  const pl = vehicle.group.userData.policeLights
  if (pl) {
    const phase = Math.floor(elapsed * 6) % 2
    pl[0].visible = phase === 0
    pl[1].visible = phase === 1
  }
  if (vehicle.label) {
    vehicle.label.position.y = vehicle.label.userData.baseY + Math.sin(elapsed * 1.6) * 0.06
  }
}

export function trafficTypeFor(typeIndex, color) {
  const base = { ...VEHICLE_TYPES[typeIndex], color, accent: color, label: null }
  return base
}
