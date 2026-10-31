import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  asphaltTexture, sidewalkTexture, sandTexture, grassTexture, facadeTextures,
  canvas2d, canvasTexture, glowTexture, signTexture, addGlow, makeRng, clamp,
} from './utils.js'

export const CITY = {
  n: 5,
  blockSize: 48,
  road: 16,
  pitch: 64,
  min: -168,
  max: 168,
}
CITY.roadCenters = Array.from({ length: CITY.n + 1 }, (_, i) => CITY.min + CITY.road / 2 + i * CITY.pitch)
CITY.blockCenters = Array.from({ length: CITY.n }, (_, i) => CITY.min + CITY.road + CITY.blockSize / 2 + i * CITY.pitch)

const PALETTE = {
  sun: 0xffb27c,
  fog: 0x5c4364,
}

/* ------------------------------------------------------------------ helpers */

function groundGlow(texture, color, size, opacity = 0.45) {
  const mat = new THREE.MeshBasicMaterial({
    map: texture, color, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.renderOrder = 1
  return mesh
}

function makeCloudTexture() {
  const { c, ctx } = canvas2d(512, 256)
  for (let i = 0; i < 22; i++) {
    const x = 40 + Math.random() * 432
    const y = 90 + Math.random() * 100
    const r = 28 + Math.random() * 72
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, 'rgba(255,220,220,0.36)')
    g.addColorStop(0.55, 'rgba(255,190,190,0.14)')
    g.addColorStop(1, 'rgba(255,190,190,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  return canvasTexture(c)
}

function makeStarTexture() {
  const { c, ctx } = canvas2d(64, 64)
  ctx.translate(32, 32)
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    ctx.lineTo(Math.cos(a) * 30, Math.sin(a) * 30)
    ctx.lineTo(Math.cos(a + Math.PI / 4) * 8, Math.sin(a + Math.PI / 4) * 8)
  }
  ctx.closePath()
  ctx.fill()
  return canvasTexture(c)
}

/* --------------------------------------------------------------------- sky */

function createSky(scene, sunDir) {
  const skyGeo = new THREE.SphereGeometry(820, 40, 28)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x10142e) },
      uMid: { value: new THREE.Color(0x5b3766) },
      uHorizon: { value: new THREE.Color(0xff9f70) },
      uSunDir: { value: sunDir.clone().normalize() },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uHorizon; uniform vec3 uSunDir;
      varying vec3 vDir;
      void main() {
        float h = clamp(vDir.y * 1.25 + 0.05, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.23, h));
        col = mix(col, uTop, smoothstep(0.18, 0.85, h));
        float sun = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
        col += vec3(1.0, 0.48, 0.18) * pow(sun, 7.0) * 0.55 * smoothstep(0.0, 0.28, h);
        col += vec3(1.0, 0.7, 0.35) * pow(sun, 40.0) * 0.15;
        float band = smoothstep(0.02, 0.06, h) * (1.0 - smoothstep(0.08, 0.2, h));
        col += vec3(0.45, 0.12, 0.18) * band * 0.18;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const sky = new THREE.Mesh(skyGeo, skyMat)
  sky.renderOrder = -100
  scene.add(sky)

  const sunPos = sunDir.clone().normalize().multiplyScalar(680)
  const glowTex = glowTexture('rgba(255,236,198,1)')
  addGlow(scene, glowTex, 0xffb070, 300, sunPos, 0.3)
  addGlow(scene, glowTex, 0xffd9a0, 150, sunPos, 0.48)
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(17, 28),
    new THREE.MeshBasicMaterial({ color: 0xffe9c4, fog: false, toneMapped: false, transparent: true, opacity: 0.95 }),
  )
  disc.position.copy(sunPos).multiplyScalar(0.97)
  disc.lookAt(0, 0, 0)
  scene.add(disc)

  const cloudTex = makeCloudTexture()
  for (let i = 0; i < 9; i++) {
    const mat = new THREE.SpriteMaterial({
      map: cloudTex, color: i % 2 ? 0xffb0a0 : 0xc4a5d8,
      transparent: true, opacity: 0.28 + Math.random() * 0.16, depthWrite: false, fog: false, toneMapped: false,
    })
    const s = new THREE.Sprite(mat)
    const a = Math.PI * (0.4 + Math.random() * 1.2)
    s.position.set(Math.cos(a) * 620, 70 + Math.random() * 100, Math.sin(a) * -620)
    const w = 190 + Math.random() * 240
    s.scale.set(w, w * 0.36, 1)
    scene.add(s)
  }

  // warm haze sitting low behind the skyline
  for (const [x, y, z, sx, sy, op] of [[-180, 70, -560, 640, 150, 0.16], [220, 105, -520, 520, 120, 0.12], [0, 130, -610, 900, 200, 0.1]]) {
    const haze = new THREE.Sprite(new THREE.SpriteMaterial({
      map: cloudTex, color: 0xffa070, transparent: true, opacity: op,
      depthWrite: false, fog: false, toneMapped: false,
    }))
    haze.position.set(x, y, z)
    haze.scale.set(sx, sy, 1)
    scene.add(haze)
  }
  return { sky, sunPos }
}

/* ------------------------------------------------------------------- hills */

function createHills(scene, rng) {
  const group = new THREE.Group()
  const mats = [0x3d4a42, 0x4c5043, 0x323d3d, 0x5b5647].map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.95, metalness: 0, flatShading: true }),
  )
  const geos = []
  for (let i = 0; i < 9; i++) {
    const geo = new THREE.ConeGeometry(1, 1, 8, 3)
    geos.push(geo)
    const mesh = new THREE.Mesh(geo, mats[i % mats.length])
    const x = -260 + i * 62 + rng.range(-20, 20)
    const h = 34 + rng.range(0, 58)
    mesh.scale.set(95 + rng.range(0, 50), h, 70 + rng.range(0, 30))
    mesh.position.set(x, h / 2 - 4, -275 - rng.range(0, 50))
    mesh.rotation.y = rng.range(0, Math.PI)
    group.add(mesh)
  }
  // low ridge in front of the mountains
  for (let i = 0; i < 7; i++) {
    const mesh = new THREE.Mesh(geos[0], mats[(i + 1) % mats.length])
    const h = 16 + rng.range(0, 20)
    mesh.scale.set(70 + rng.range(0, 40), h, 60 + rng.range(0, 20))
    mesh.position.set(-220 + i * 74, h / 2 - 3, -205 - rng.range(0, 20))
    mesh.rotation.y = rng.range(0, Math.PI)
    group.add(mesh)
  }
  scene.add(group)

}

/* --------------------------------------------------------------- palm trees */

function palmCrownGeometry() {
  const leaves = []
  for (let i = 0; i < 11; i++) {
    const angle = (i / 11) * Math.PI * 2 + Math.random() * 0.22
    const len = 2.7 + Math.random() * 1.2
    const droop = 0.85 + Math.random() * 0.55
    const positions = []
    const indices = []
    const segs = 6
    for (let s = 0; s <= segs; s++) {
      const t = s / segs
      const halfW = 0.32 * (1 - t) * (0.4 + Math.sin(t * Math.PI) * 0.9)
      const x = t * len
      const y = Math.sin(t * 2.1) * 0.18 - t * t * droop
      positions.push(x, y, -halfW, x, y, halfW)
      if (s < segs) {
        const a = s * 2
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    g.setIndex(indices)
    g.computeVertexNormals()
    g.rotateY(angle)
    leaves.push(g)
  }
  return mergeGeometries(leaves)
}

function createPalms(scene, spots, share) {
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2a5b3e, roughness: 0.88, side: THREE.DoubleSide, metalness: 0.02 })
  const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x3a6e46, roughness: 0.9, side: THREE.DoubleSide, metalness: 0.02 })
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6a4a32, roughness: 0.95 })
  const crownGeo = palmCrownGeometry()
  const trunkGeo = new THREE.CylinderGeometry(0.15, 0.32, 5.6, 7, 4)
  const palms = []
  for (const [x, z, scale = 1] of spots) {
    const group = new THREE.Group()
    const trunk = new THREE.Mesh(trunkGeo, trunkMat)
    trunk.position.y = 2.8
    trunk.rotation.z = (Math.random() - 0.5) * 0.08
    group.add(trunk)
    const crown = new THREE.Mesh(crownGeo, Math.random() > 0.45 ? leafMat : leafMat2)
    crown.position.y = 5.6
    crown.rotation.y = Math.random() * Math.PI * 2
    group.add(crown)
    const shadow = groundGlow(glowTexture('rgba(0,0,0,1)'), 0x000000, 5.5, 0.28)
    shadow.material.blending = THREE.NormalBlending
    shadow.position.y = 0.035
    group.add(shadow)
    group.position.set(x, 0, z)
    group.scale.setScalar(scale)
    group.rotation.y = Math.random() * Math.PI * 2
    scene.add(group)
    palms.push(group)
  }
  return palms
}

/* -------------------------------------------------------------- buildings */

function createBuildings(scene, rng, blockTypes) {
  const colliders = []
  const landmarks = []
  const facadeVariants = []
  for (let i = 0; i < 6; i++) facadeVariants.push(facadeTextures(i, 100 + i * 31))
  const facadeCache = new Map()
  const roofMats = [0x6f6a70, 0x5d5a64, 0x79706b, 0x4c4a58].map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.92, metalness: 0.06 }),
  )
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x9a918c, roughness: 0.82 })
  const darkGlass = new THREE.MeshStandardMaterial({ color: 0x101624, roughness: 0.2, metalness: 0.75 })

  function materialFor(variant, w, h) {
    const key = `${variant}:${Math.round(w / 8)}:${Math.round(h / 10)}`
    if (facadeCache.has(key)) return facadeCache.get(key)
    const base = facadeVariants[variant]
    const map = base.map.clone()
    map.needsUpdate = true
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    map.repeat.set(Math.max(1, Math.round(w / 13)), Math.max(1, Math.round(h / 14)))
    const em = base.emissiveMap.clone()
    em.needsUpdate = true
    em.wrapS = em.wrapT = THREE.RepeatWrapping
    em.repeat.copy(map.repeat)
    const mat = new THREE.MeshStandardMaterial({
      map, emissiveMap: em, emissive: 0xffffff, emissiveIntensity: 0.7,
      roughness: 0.82, metalness: 0.05,
    })
    facadeCache.set(key, mat)
    return mat
  }

  function addTower(cx, cz, w, d, h, variant, opts = {}) {
    const mat = materialFor(variant, w, h)
    const roof = roofMats[Math.floor(rng.next() * roofMats.length)]
    const geo = new THREE.BoxGeometry(w, h, d)
    const mesh = new THREE.Mesh(geo, [mat, mat, roof, roof, mat, mat])
    mesh.position.set(cx, 0.18 + h / 2, cz)
    scene.add(mesh)
    colliders.push({ minX: cx - w / 2, maxX: cx + w / 2, minZ: cz - d / 2, maxZ: cz + d / 2, h })

    // roof lip
    const lip = new THREE.Mesh(new THREE.BoxGeometry(w + 0.55, 0.45, d + 0.55), trimMat)
    lip.position.set(cx, 0.18 + h + 0.2, cz)
    scene.add(lip)

    // rooftop units
    const units = rng.int(1, 3)
    for (let i = 0; i < units; i++) {
      const uw = rng.range(1.2, Math.min(4.4, w * 0.25))
      const ud = rng.range(1.2, Math.min(3.6, d * 0.25))
      const uh = rng.range(0.5, 1.8)
      const unit = new THREE.Mesh(new THREE.BoxGeometry(uw, uh, ud), darkGlass)
      unit.position.set(cx + rng.range(-w * 0.28, w * 0.28), 0.18 + h + 0.4 + uh / 2, cz + rng.range(-d * 0.28, d * 0.28))
      scene.add(unit)
    }

    // corner neon accent
    if (opts.neon || rng.chance(0.4)) {
      const color = facadeVariants[variant].accent
      const matNeon = new THREE.MeshBasicMaterial({ color, toneMapped: false })
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.09, h * 0.88, 0.09), matNeon)
      const sx = rng.chance(0.5) ? -1 : 1
      const sz = rng.chance(0.5) ? -1 : 1
      strip.position.set(cx + sx * (w / 2 + 0.02), 0.18 + h * 0.47, cz + sz * (d / 2 + 0.02))
      scene.add(strip)
      if (rng.chance(0.3)) {
        const strip2 = strip.clone()
        strip2.position.x = cx - sx * (w / 2 + 0.02)
        scene.add(strip2)
      }
    }

    // ground-floor storefront band
    if (h > 13 && opts.store !== false) {
      const bandH = 3.1
      const band = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, bandH, d + 0.16), darkGlass)
      band.position.set(cx, 0.18 + bandH / 2, cz)
      scene.add(band)
      const bandGlow = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.72, 0.12, 0.12),
        new THREE.MeshBasicMaterial({ color: rng.chance(0.5) ? 0xffd18a : 0x8ff4ff, toneMapped: false }),
      )
      bandGlow.position.set(cx, 0.18 + 2.85, cz + d / 2 + 0.09)
      scene.add(bandGlow)
    }

    // antenna
    if (h > 46 && rng.chance(0.55)) {
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.18, 8, 5), darkGlass)
      mast.position.set(cx, 0.18 + h + 4.4, cz)
      scene.add(mast)
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff3040, toneMapped: false }))
      beacon.position.set(cx, 0.18 + h + 8.4, cz)
      scene.add(beacon)
    }

    landmarks.push({ x: cx, z: cz, w, d, h, variant, accent: facadeVariants[variant].accent })
    return mesh
  }

  const billboards = [
    { lines: ['VOLT', 'THE FUTURE IS ELECTRIC', 'NEON MOTORS'], colors: ['#66f4ff', '#ff2e7e'] },
    { lines: ['NEON STATE', '2026', 'SAN ANDREAS'], colors: ['#ff7cb1', '#ffc857'] },
    { lines: ['APEX', 'JOIN THE PATROL', 'LSPD'], colors: ['#64a8ff', '#ffffff'] },
    { lines: ['LUMEN', 'CITY PROOF', 'KITE MOBILITY'], colors: ['#ff7cf0', '#66f4ff'] },
  ]

  let bi = 0
  for (const block of blockTypes) {
    if (block.type !== 'buildings' && block.type !== 'landmark') continue
    const { x, z, i, j } = block
    const downtown = j <= 1
    const variant = Math.floor(rng.next() * 6)
    const tallBias = downtown ? 1.7 : 1
    const layout = rng.int(0, 2)
    if (block.landmark) {
      // signature stepped tower
      addTower(x, z, 22, 22, 62, 3, { neon: true })
      addTower(x, z, 16, 16, 86, 3, { neon: true, store: false })
      addTower(x, z, 8, 8, 96, 3, { neon: true, store: false })
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.4, 18, 6), darkGlass)
      spire.position.set(x, 0.18 + 96 + 9, z)
      scene.add(spire)
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff4f72, toneMapped: false }))
      beacon.position.set(x, 0.18 + 96 + 18, z)
      scene.add(beacon)
      landmarks.push({ x, z, w: 22, d: 22, h: 96, variant: 3, accent: '#c4d4ff' })
      continue
    }
    if (layout === 0) {
      const w = rng.range(17, 25)
      const d = rng.range(17, 24)
      const h = clamp(rng.range(13, 34) * tallBias, 10, 62)
      const ox = rng.range(-(40 - w) / 2 + 1, (40 - w) / 2 - 1)
      const oz = rng.range(-(40 - d) / 2 + 1, (40 - d) / 2 - 1)
      addTower(x + ox, z + oz, w, d, h, variant)
    } else if (layout === 1) {
      const h1 = clamp(rng.range(20, 44) * tallBias, 15, 72)
      addTower(x - 8.5, z - 7, 18, 17, h1, variant)
      const w2 = rng.range(11, 15)
      const d2 = rng.range(11, 15)
      addTower(x + 9, z + 9.5, w2, d2, clamp(rng.range(9, 24), 8, 38), (variant + 2) % 6)
    } else {
      const w = rng.range(22, 28)
      const d = rng.range(20, 26)
      const podH = rng.range(5.2, 9)
      const towerW = w * rng.range(0.52, 0.7)
      const towerD = d * rng.range(0.5, 0.68)
      const h = clamp(rng.range(26, 54) * tallBias, 18, 78)
      addTower(x, z, w, d, podH, (variant + 1) % 6, { store: false, neon: false })
      addTower(x + rng.range(-1.5, 1.5), z + rng.range(-1.5, 1.5), towerW, towerD, h, variant)
    }

    // billboard on a random building in this block
    if (bi < billboards.length && rng.chance(0.55) && (i + j) % 2 === 0) {
      const bb = billboards[bi++]
      const tex = billboardTextureFor(bb)
      const w = 13
      const h = 8
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, side: THREE.DoubleSide }),
      )
      board.position.set(x + rng.range(-8, 8), 13 + rng.range(0, 8), z + 21.2)
      board.rotation.y = 0
      scene.add(board)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, h + 0.6, 0.4), darkTrim())
      frame.position.copy(board.position)
      frame.position.z -= 0.22
      frame.rotation.y = 0
      scene.add(frame)
      const glow = new THREE.PointLight(0xff7cb1, 22, 26, 2)
      glow.position.set(board.position.x, board.position.y, board.position.z + 5)
      scene.add(glow)
    }
  }

  function darkTrim() {
    return new THREE.MeshStandardMaterial({ color: 0x17161f, roughness: 0.8 })
  }

  function billboardTextureFor(bb) {
    return billboardTex(bb.lines, bb.colors)
  }

  return { colliders, landmarks }
}

let _billboardTexFn = null
function billboardTex(lines, colors) {
  if (!_billboardTexFn) _billboardTexFn = billboardsImport
  return _billboardTexFn(lines, colors)
}

// small indirection keeps module imports tidy
function billboardsImport(lines, colors) {
  // implemented via signTexture-style canvas for a glossy digital billboard
  const { c, ctx } = canvas2d(512, 320)
  const grad = ctx.createLinearGradient(0, 0, 512, 320)
  grad.addColorStop(0, '#100b22')
  grad.addColorStop(0.55, '#1b1030')
  grad.addColorStop(1, '#2a0e2c')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 320)
  ctx.strokeStyle = colors[1]
  ctx.lineWidth = 5
  ctx.strokeRect(14, 14, 484, 292)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#fff'
  ctx.shadowColor = colors[0]
  ctx.shadowBlur = 26
  ctx.font = '900 78px "Arial Black", Arial, sans-serif'
  ctx.fillText(lines[0], 256, 140)
  ctx.shadowBlur = 0
  ctx.fillStyle = colors[0]
  ctx.font = '800 30px Arial, sans-serif'
  ctx.fillText(lines[1], 256, 208)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = '800 18px Arial, sans-serif'
  ctx.fillText(lines[2], 256, 260)
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`
    ctx.fillRect(14, 14 + Math.random() * 292, 484, 2)
  }
  return canvasTexture(c)
}

/* ---------------------------------------------------------------- showroom */

function createShowroom(scene, colliders) {
  const group = new THREE.Group()
  const acc = 0xff2e7e
  const cyan = 0x66f4ff

  // dark reflective plaza floor, laid above the sidewalk tiles
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(23, 64),
    new THREE.MeshStandardMaterial({ color: 0x141622, roughness: 0.24, metalness: 0.55 }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0.296
  floor.scale.z = 0.9
  scene.add(floor)
  const floorGlowTex = glowTexture()
  for (const [x, z, color, size, op] of [[-9, 65, 0xff2e7e, 34, 0.1], [10, 68, 0x66f4ff, 30, 0.1], [0, 50, 0xffc857, 20, 0.08]]) {
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size * 0.6),
      new THREE.MeshBasicMaterial({ map: floorGlowTex, color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
    )
    g.rotation.x = -Math.PI / 2
    g.position.set(x, 0.301, z)
    g.renderOrder = 1
    scene.add(g)
  }

  // inlaid neon rings
  for (const [r, color, op] of [[14.5, 0x66f4ff, 0.8], [19.5, 0xff2e7e, 0.65]]) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r, r + 0.12, 96),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, side: THREE.DoubleSide, toneMapped: false }),
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.305
    ring.scale.z = 0.9
    scene.add(ring)
  }

  // showroom pavilion at the north side
  const pav = new THREE.Group()
  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(30, 4.8, 8.6),
    new THREE.MeshStandardMaterial({ color: 0x0e111d, roughness: 0.25, metalness: 0.65 }),
  )
  shell.position.y = 2.4
  pav.add(shell)
  const glassFront = new THREE.Mesh(
    new THREE.BoxGeometry(28, 3.5, 0.25),
    new THREE.MeshPhysicalMaterial({ color: 0x7ce7ff, emissive: 0x1a7b96, emissiveIntensity: 0.4, transparent: true, opacity: 0.26, roughness: 0.08, metalness: 0.2 }),
  )
  glassFront.position.set(0, 2.05, 4.4)
  pav.add(glassFront)
  for (let i = -2; i <= 2; i++) {
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.7, 0.3), new THREE.MeshStandardMaterial({ color: 0x3a4355, metalness: 0.8, roughness: 0.3 }))
    mullion.position.set(i * 5.6, 2.05, 4.42)
    pav.add(mullion)
  }
  // interior light strips
  for (const x of [-9, -3, 3, 9]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.3, 0.2), new THREE.MeshBasicMaterial({ color: cyan, toneMapped: false }))
    strip.position.set(x, 1.95, 4.36)
    pav.add(strip)
  }
  // roof sign
  const signTex = signTexture('NEON MOTORS', { color: '#ff2e7e', bg: 'rgba(6,7,14,0.94)', sub: 'ELECTRIC PERFORMANCE · LOS SANTOS', w: 1024, h: 220 })
  const signMat = new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false })
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(13.8, 2.96), signMat)
  sign.position.set(0, 3.3, 4.62)
  pav.add(sign)
  const signBack = new THREE.Mesh(new THREE.BoxGeometry(14.6, 3.5, 0.35), new THREE.MeshStandardMaterial({ color: 0x0a0b12, metalness: 0.6, roughness: 0.4 }))
  signBack.position.set(0, 3.3, 4.4)
  pav.add(signBack)

  pav.position.set(0, 0.2, 43.1)
  scene.add(pav)
  colliders.push({ minX: -15, maxX: 15, minZ: 38.5, maxZ: 47.5, h: 5.2 })

  // arch at the plaza entrance
  const archMat = new THREE.MeshStandardMaterial({ color: 0x141824, metalness: 0.75, roughness: 0.3 })
  for (const x of [-16.5, 16.5]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.65, 4.2, 0.65), archMat)
    post.position.set(x, 2.1 + 0.2, 51.5)
    scene.add(post)
    colliders.push({ minX: x - 0.45, maxX: x + 0.45, minZ: 51, maxZ: 52, h: 4.2 })
    const neon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), new THREE.MeshBasicMaterial({ color: acc, toneMapped: false }))
    neon.position.set(x, 2.1, 51.84)
    scene.add(neon)
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(34.1, 0.4, 0.65), archMat)
  beam.position.set(0, 4.35, 51.5)
  scene.add(beam)

  // spotlights washing the display
  const spot = new THREE.PointLight(0x9fe9ff, 48, 26, 2)
  spot.position.set(0, 7.5, 58)
  scene.add(spot)
  const pinkLight = new THREE.PointLight(0xff3f8c, 28, 22, 2)
  pinkLight.position.set(-15, 3.5, 62)
  scene.add(pinkLight)
  const warm = new THREE.PointLight(0xffc98a, 24, 20, 2)
  warm.position.set(15, 3.5, 62)
  scene.add(warm)

  // low planters framing the display
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x2b2d34, roughness: 0.85 })
  for (const x of [-21, 21]) {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 6), planterMat)
    planter.position.set(x, 0.6, 61)
    scene.add(planter)
    const bush = new THREE.Mesh(new THREE.SphereGeometry(1.25, 8, 6), new THREE.MeshStandardMaterial({ color: 0x376041, roughness: 0.9 }))
    bush.position.set(x, 1.35, 61)
    bush.scale.z = 2.1
    scene.add(bush)
  }

  scene.add(group)
}

/* -------------------------------------------------------------------- beach */

function createBeach(scene, rng) {
  const sand = new THREE.Mesh(
    new THREE.PlaneGeometry(620, 66),
    new THREE.MeshStandardMaterial({ map: sandTexture(), roughness: 0.96, metalness: 0 }),
  )
  sand.rotation.x = -Math.PI / 2
  sand.position.set(0, 0.02, 201)
  scene.add(sand)

  // boardwalk edge
  const boardMat = new THREE.MeshStandardMaterial({ color: 0x5b4636, roughness: 0.85 })
  const boardwalk = new THREE.Mesh(new THREE.BoxGeometry(620, 0.18, 6), boardMat)
  boardwalk.position.set(0, 0.12, 172)
  scene.add(boardwalk)

  // shoreline foam
  const foamTex = glowTexture('rgba(255,255,255,0.9)')
  for (let i = 0; i < 7; i++) {
    const foam = groundGlow(foamTex, 0xd9f4ff, 40 + rng.range(0, 60), 0.14)
    foam.position.set(-250 + i * 78, 0.05, 231.6)
    foam.scale.x = 1.7
    scene.add(foam)
  }

  // lifeguard tower
  const tower = new THREE.Group()
  const wood = new THREE.MeshStandardMaterial({ color: 0xd7c5a2, roughness: 0.8 })
  for (const x of [-2, 2]) for (const z of [-1.4, 1.4]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 4.2, 6), wood)
    leg.position.set(x, 2.1, z)
    tower.add(leg)
  }
  const cab = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.4, 3.2), new THREE.MeshStandardMaterial({ color: 0xff6b5d, roughness: 0.7 }))
  cab.position.y = 4.7
  tower.add(cab)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 1.3, 4), new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: 0.7 }))
  roof.position.y = 6.55
  roof.rotation.y = Math.PI / 4
  tower.add(roof)
  tower.position.set(-44, 0, 195)
  tower.rotation.y = -0.25
  scene.add(tower)

  // beach umbrellas and loungers
  const umbrellaCols = [0xff5d8f, 0x52d9ff, 0xffcf5c, 0x8dffa6]
  for (let i = 0; i < 9; i++) {
    const x = -175 + i * 39 + rng.range(-8, 8)
    const z = 188 + rng.range(-6, 8)
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.9, 6), wood)
    pole.position.set(x, 1.45, z)
    scene.add(pole)
    const canopy = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 0.75, 10),
      new THREE.MeshStandardMaterial({ color: umbrellaCols[i % 4], roughness: 0.8, side: THREE.DoubleSide }),
    )
    canopy.position.set(x, 2.9, z)
    scene.add(canopy)
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 2.1), new THREE.MeshStandardMaterial({ color: 0xeee6d7, roughness: 0.7 }))
    chair.position.set(x + 2.4, 0.35, z + 0.8)
    chair.rotation.y = 0.4
    scene.add(chair)
  }

  // pier
  const pier = new THREE.Group()
  const plankMat = new THREE.MeshStandardMaterial({ color: 0x6a4b35, roughness: 0.9 })
  const deck = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 84), plankMat)
  deck.position.set(0, 0.55, 0)
  pier.add(deck)
  for (let i = 0; i < 14; i++) {
    for (const x of [-4.6, 4.6]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 4.4, 6), plankMat)
      p.position.set(x, -1.2, -39 + i * 6)
      pier.add(p)
    }
  }
  const railMat = new THREE.MeshStandardMaterial({ color: 0x3e2e24, roughness: 0.8 })
  for (const x of [-5.2, 5.2]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 84), railMat)
    rail.position.set(x, 1.5, 0)
    pier.add(rail)
    for (let i = 0; i < 10; i++) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1, 0.09), railMat)
      post.position.set(x, 1.1, -38 + i * 8.5)
      pier.add(post)
    }
  }
  pier.position.set(-78, 0, 272)
  scene.add(pier)

  // ferris wheel on the pier plaza
  createFerrisWheel(scene, 96, 0, 204)
}

function createFerrisWheel(scene, x, y, z) {
  const group = new THREE.Group()
  const metal = new THREE.MeshStandardMaterial({ color: 0xcdd6e3, metalness: 0.85, roughness: 0.3 })
  const accent = new THREE.MeshBasicMaterial({ color: 0xff3f8c, toneMapped: false })
  const cyan = new THREE.MeshBasicMaterial({ color: 0x66f4ff, toneMapped: false })
  const radius = 15
  const hubY = 21
  for (const side of [-1.1, 1.1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.16, 6, 48), side < 0 ? accent : cyan)
    ring.position.set(0, hubY, side)
    group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.55, 0.1, 5, 36), metal)
    ring2.position.set(0, hubY, side)
    group.add(ring2)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, radius, 4), metal)
      spoke.position.set(Math.cos(a) * radius * 0.5, hubY + Math.sin(a) * radius * 0.5, side)
      spoke.rotation.z = a + Math.PI / 2
      group.add(spoke)
    }
  }
  for (const side of [-6.5, 6.5]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, hubY + 2, 6), metal)
    leg.position.set(side, (hubY + 2) / 2, 0)
    leg.rotation.z = side < 0 ? -0.26 : 0.26
    group.add(leg)
  }
  const gondolaCols = [0xff3f8c, 0x66f4ff, 0xffc857, 0x8d5bff, 0x6dffa6]
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const g = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.7, 2.2),
      new THREE.MeshStandardMaterial({ color: gondolaCols[i % 5], roughness: 0.5, metalness: 0.3 }),
    )
    g.position.set(Math.cos(a) * radius, hubY + Math.sin(a) * radius, 0)
    group.add(g)
  }
  const light = new THREE.PointLight(0xff6fa8, 100, 60, 2)
  light.position.set(0, hubY, 4)
  group.add(light)
  group.position.set(x, y, z)
  group.rotation.y = 0.15
  scene.add(group)
}

/* --------------------------------------------------------------- props/lamps */

function createLamps(scene) {
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x24262e, metalness: 0.7, roughness: 0.45 })
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd7a0, toneMapped: false })
  const glowTex = glowTexture('rgba(255,220,160,1)')
  const pool = glowTexture()
  const spots = []
  for (const z of [CITY.roadCenters[2], CITY.roadCenters[3], CITY.roadCenters[4]]) {
    for (const x of [-138, -74, -10, 54, 118]) {
      spots.push([x, z + 8.9], [x + 20, z - 8.9])
    }
  }
  for (const x of [CITY.roadCenters[2], CITY.roadCenters[4]]) {
    for (const z of [-138, -74, 54, 118]) spots.push([x + 8.9, z], [x - 8.9, z + 20])
  }

  for (const [x, z] of spots) {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 5.4, 6), poleMat)
    pole.position.y = 2.7
    g.add(pole)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.08), poleMat)
    arm.position.set(0.65, 5.35, 0)
    g.add(arm)
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.13, 0.26), bulbMat)
    bulb.position.set(1.25, 5.28, 0)
    g.add(bulb)
    addGlow(g, glowTex, 0xffc27a, 2.2, new THREE.Vector3(1.25, 5.24, 0), 0.55)
    const p = groundGlow(pool, 0xffb570, 9, 0.2)
    p.position.set(1.25, 0.22, 0)
    g.add(p)
    g.position.set(x, 0, z)
    g.rotation.y = Math.random() > 0.5 ? 0 : Math.PI
    scene.add(g)
  }
}

function createTrafficLights(scene) {
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1d2028, metalness: 0.7, roughness: 0.4 })
  const spots = [
    [-32, 96], [32, 96], [-96, 64], [96, 64], [-32, 32], [32, 32],
  ]
  for (const [x, z] of spots) {
    const g = new THREE.Group()
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 5.8, 6), poleMat)
    pole.position.y = 2.9
    g.add(pole)
    const arm = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.1, 0.1), poleMat)
    arm.position.set(1.7, 5.6, 0)
    g.add(arm)
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.02, 0.3), poleMat)
    box.position.set(3.25, 5.15, 0)
    g.add(box)
    const cols = [0xff2e38, 0xffc857, 0x6dffa6]
    cols.forEach((c, i) => {
      const light = new THREE.Mesh(new THREE.CircleGeometry(0.11, 10), new THREE.MeshBasicMaterial({ color: c, toneMapped: false }))
      light.position.set(3.25, 5.47 - i * 0.3, 0.16)
      light.material.opacity = i === 0 ? 1 : 0.18
      light.material.transparent = true
      g.add(light)
    })
    g.position.set(x + 8.9, 0, z + 8.9)
    g.rotation.y = Math.random() > 0.5 ? 0 : Math.PI
    scene.add(g)
  }
}

/* ------------------------------------------------------------------- roads */

function createRoadMarkings(scene) {
  const dashGeo = new THREE.BoxGeometry(3.2, 0.02, 0.17)
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xe7e2d2, roughness: 0.72, metalness: 0.05 })
  const items = []
  for (const road of CITY.roadCenters) {
    for (const side of [-1, 1]) {
      for (let x = CITY.min + 6; x < CITY.max - 4; x += 8) {
        items.push({ x, z: road + side * 4.1, rot: 0 })
      }
      for (let z = CITY.min + 6; z < CITY.max - 4; z += 8) {
        items.push({ x: road + side * 4.1, z, rot: Math.PI / 2 })
      }
    }
  }
  const inst = new THREE.InstancedMesh(dashGeo, dashMat, items.length)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const s = new THREE.Vector3(1, 1, 1)
  items.forEach((it, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it.rot)
    m.compose(new THREE.Vector3(it.x, 0.028, it.z), q, s)
    inst.setMatrixAt(i, m)
  })
  inst.instanceMatrix.needsUpdate = true
  scene.add(inst)

  // double yellow center lines
  const yellowMat = new THREE.MeshBasicMaterial({ color: 0xcda24b })
  for (const road of CITY.roadCenters) {
    for (const off of [-0.18, 0.18]) {
      const hLine = new THREE.Mesh(new THREE.BoxGeometry(CITY.max - CITY.min - 8, 0.02, 0.1), yellowMat)
      hLine.position.set(0, 0.026, road + off)
      scene.add(hLine)
      const vLine = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, CITY.max - CITY.min - 8), yellowMat)
      vLine.position.set(road + off, 0.026, 0)
      scene.add(vLine)
    }
  }

  // crosswalks at the central intersections
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xe4dfd2, roughness: 0.8 })
  const stripes = []
  const intersections = [CITY.roadCenters[2], CITY.roadCenters[3], CITY.roadCenters[4]]
  for (const x of intersections) {
    for (const z of intersections) {
      for (let i = -3; i <= 3; i++) {
        stripes.push({ x: x + i * 1.35, z: z + 7.2, rot: 0 })
        stripes.push({ x: x + i * 1.35, z: z - 7.2, rot: 0 })
        stripes.push({ x: x + 7.2, z: z + i * 1.35, rot: Math.PI / 2 })
        stripes.push({ x: x - 7.2, z: z + i * 1.35, rot: Math.PI / 2 })
      }
    }
  }
  const stripeGeo = new THREE.BoxGeometry(0.74, 0.02, 3.2)
  const stripeInst = new THREE.InstancedMesh(stripeGeo, whiteMat, stripes.length)
  stripes.forEach((it, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it.rot)
    m.compose(new THREE.Vector3(it.x, 0.03, it.z), q, s)
    stripeInst.setMatrixAt(i, m)
  })
  stripeInst.instanceMatrix.needsUpdate = true
  scene.add(stripeInst)
}

/* -------------------------------------------------------------------- water */

function createWater(scene) {
  const geo = new THREE.PlaneGeometry(1600, 1200, 70, 50)
  const mat = new THREE.ShaderMaterial({
    transparent: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vW;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z += sin(p.x * 0.09 + uTime * 1.2) * 0.35 + cos(p.y * 0.13 - uTime * 0.8) * 0.22;
        vec4 wp = modelMatrix * vec4(p, 1.0);
        vW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vW;
      void main() {
        float depth = 1.0 - vUv.y;
        vec3 shore = vec3(0.20, 0.52, 0.57);
        vec3 mid = vec3(0.10, 0.22, 0.35);
        vec3 far = vec3(0.20, 0.16, 0.28);
        vec3 col = mix(shore, mid, smoothstep(0.0, 0.35, depth));
        col = mix(col, far, smoothstep(0.35, 1.0, depth));
        float wave = sin(vW.x * 0.16 + uTime * 1.1) * sin(vW.z * 0.22 - uTime * 0.7);
        float glitter = pow(max(0.0, wave), 12.0);
        col += vec3(1.0, 0.65, 0.36) * glitter * 0.35 * (1.0 - smoothstep(0.0, 0.7, depth));
        float sunStreak = smoothstep(0.72, 1.0, sin(vW.x * 0.03 + 1.2)) * (1.0 - smoothstep(0.0, 0.55, depth));
        col += vec3(1.0, 0.5, 0.22) * sunStreak * 0.12;
        float foam = smoothstep(0.03, 0.0, depth) * (0.55 + 0.45 * sin(vW.x * 0.5 + uTime * 2.0));
        col = mix(col, vec3(0.85, 0.93, 0.94), foam * 0.55);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const water = new THREE.Mesh(geo, mat)
  water.rotation.x = -Math.PI / 2
  water.position.set(0, -0.12, 830)
  scene.add(water)
  return mat
}

/* --------------------------------------------------------- reflections */

function createEnvironment(scene, renderer) {
  const { c, ctx } = canvas2d(1024, 512)
  // equirect: top = zenith, middle = horizon, bottom = ground
  const sky = ctx.createLinearGradient(0, 0, 0, 300)
  sky.addColorStop(0, '#0a0e22')
  sky.addColorStop(0.55, '#33204c')
  sky.addColorStop(0.86, '#7c3a63')
  sky.addColorStop(1, '#ff9a64')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, 1024, 300)

  // horizon city glow + silhouettes
  const horizon = ctx.createLinearGradient(0, 258, 0, 330)
  horizon.addColorStop(0, 'rgba(255,150,90,0)')
  horizon.addColorStop(0.35, 'rgba(255,138,96,0.5)')
  horizon.addColorStop(1, 'rgba(20,16,32,0)')
  ctx.fillStyle = horizon
  ctx.fillRect(0, 258, 1024, 72)

  let bx = 0
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  while (bx < 1024) {
    const w = 14 + rand() * 38
    const h = 20 + rand() * 58
    ctx.fillStyle = `rgba(9,10,20,${0.72 + rand() * 0.2})`
    ctx.fillRect(bx, 300 - h, w, h + 24)
    // lit windows, picking up the city's cyan/magenta palette
    for (let wy = 300 - h + 6; wy < 296; wy += 7) {
      for (let wx = bx + 4; wx < bx + w - 4; wx += 7) {
        if (rand() > 0.55) {
          ctx.fillStyle = rand() > 0.5 ? 'rgba(120,235,255,0.7)' : 'rgba(255,120,190,0.55)'
          ctx.fillRect(wx, wy, 2, 2)
        }
      }
    }
    bx += w + 3 + rand() * 9
  }
  // a couple of bright neon smears for paint highlights
  for (const [x, y, r, col] of [[150, 292, 70, 'rgba(255,60,150,0.55)'], [720, 286, 60, 'rgba(70,225,255,0.5)'], [470, 296, 45, 'rgba(255,190,110,0.5)']]) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, col)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  const ground = ctx.createLinearGradient(0, 320, 0, 512)
  ground.addColorStop(0, '#241a2c')
  ground.addColorStop(0.5, '#121019')
  ground.addColorStop(1, '#08070c')
  ctx.fillStyle = ground
  ctx.fillRect(0, 320, 1024, 192)

  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromEquirectangular(tex).texture
  scene.environment = env
  scene.environmentIntensity = 0.85
  tex.dispose()
  pmrem.dispose()
}

/* ------------------------------------------------------------------- world */

export function createWorld(scene, renderer) {
  const rng = makeRng(20261031)
  const colliders = []
  const palms = []

  scene.fog = new THREE.Fog(PALETTE.fog, 105, 640)
  scene.background = new THREE.Color(0x1b1730)
  createEnvironment(scene, renderer)

  const hemi = new THREE.HemisphereLight(0x8888dd, 0x34232a, 0.78)
  scene.add(hemi)
  const sunDir = new THREE.Vector3(-0.62, 0.24, -0.75)
  const sun = new THREE.DirectionalLight(0xffa66e, 2.35)
  sun.position.copy(sunDir).multiplyScalar(300)
  scene.add(sun)
  const fill = new THREE.DirectionalLight(0x6f7dff, 0.38)
  fill.position.set(80, 45, 140)
  scene.add(fill)
  const ambient = new THREE.AmbientLight(0x241c38, 0.55)
  scene.add(ambient)

  createSky(scene, sunDir)
  createHills(scene, rng)

  // island / city floor
  const base = new THREE.Mesh(
    new THREE.PlaneGeometry(700, 700),
    new THREE.MeshStandardMaterial({ color: 0x574c45, roughness: 1 }),
  )
  base.rotation.x = -Math.PI / 2
  base.position.y = -0.06
  scene.add(base)

  const asphalt = new THREE.Mesh(
    new THREE.PlaneGeometry(CITY.max - CITY.min + 22, CITY.max - CITY.min + 22),
    new THREE.MeshStandardMaterial({ map: asphaltTexture(), roughness: 0.93, metalness: 0.02, color: 0x9595a6 }),
  )
  asphalt.rotation.x = -Math.PI / 2
  asphalt.position.y = 0
  scene.add(asphalt)

  // block classification
  const blockTypes = []
  for (let i = 0; i < CITY.n; i++) {
    for (let j = 0; j < CITY.n; j++) {
      const x = CITY.blockCenters[i]
      const z = CITY.blockCenters[j]
      let type = 'buildings'
      if (i === 2 && j === 3) type = 'plaza'
      else if (i === 1 && j === 2) type = 'park'
      else if (i === 3 && j === 3) type = 'parking'
      else if (i === 2 && j === 0) type = 'landmark'
      else if (rng.chance(0.08)) type = 'park'
      blockTypes.push({ i, j, x, z, type, landmark: type === 'landmark' })
    }
  }

  const sidewalkTex = sidewalkTexture()
  sidewalkTex.repeat.set(12, 12)
  const grassTex = grassTexture()
  grassTex.repeat.set(6, 6)
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x817a72, roughness: 0.9 })
  const parkMat = new THREE.MeshStandardMaterial({ map: grassTex, roughness: 0.95 })

  for (const b of blockTypes) {
    const walk = new THREE.Mesh(new THREE.BoxGeometry(CITY.blockSize, 0.18, CITY.blockSize), new THREE.MeshStandardMaterial({ map: sidewalkTex, roughness: 0.9, color: 0xc4bbae }))
    walk.position.set(b.x, 0.09, b.z)
    scene.add(walk)
    if (b.type === 'park') {
      const grass = new THREE.Mesh(new THREE.PlaneGeometry(39, 39), parkMat)
      grass.rotation.x = -Math.PI / 2
      grass.position.set(b.x, 0.2, b.z)
      scene.add(grass)
      // paths
      const pathMat = new THREE.MeshStandardMaterial({ color: 0xb7a58c, roughness: 0.9 })
      for (const rot of [0, Math.PI / 2]) {
        const path = new THREE.Mesh(new THREE.PlaneGeometry(39, 3.2), pathMat)
        path.rotation.x = -Math.PI / 2
        path.rotation.z = rot
        path.position.set(b.x, 0.205, b.z)
        scene.add(path)
      }
      // fountain
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.3, 0.7, 24), curbMat)
      basin.position.set(b.x, 0.55, b.z)
      scene.add(basin)
      const water = new THREE.Mesh(
        new THREE.CylinderGeometry(4.5, 4.5, 0.15, 24),
        new THREE.MeshBasicMaterial({ color: 0x56c9d6, transparent: true, opacity: 0.75 }),
      )
      water.position.set(b.x, 0.92, b.z)
      scene.add(water)
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 3.6, 12), curbMat)
      column.position.set(b.x, 2.5, b.z)
      scene.add(column)
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 1.6, 0.5, 18), curbMat)
      bowl.position.set(b.x, 4.2, b.z)
      scene.add(bowl)
      for (let k = 0; k < 5; k++) {
        palms.push([b.x - 14 + k * 7, b.z + (k % 2 ? 15 : -15), 0.75 + rng.range(0, 0.2)])
      }
    }
    if (b.type === 'parking') {
      const lot = new THREE.Mesh(
        new THREE.PlaneGeometry(39, 39),
        new THREE.MeshStandardMaterial({ color: 0x23242e, roughness: 0.9 }),
      )
      lot.rotation.x = -Math.PI / 2
      lot.position.set(b.x, 0.19, b.z)
      scene.add(lot)
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xc9c4b8 })
      for (let k = -3; k <= 3; k++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 9), lineMat)
        line.position.set(b.x + k * 4.4, 0.2, b.z - 10)
        scene.add(line)
        const line2 = line.clone()
        line2.position.z = b.z + 10
        scene.add(line2)
      }
    }
    // curb outline
    const curb = new THREE.Mesh(new THREE.BoxGeometry(CITY.blockSize + 0.4, 0.24, CITY.blockSize + 0.4), curbMat)
    curb.position.set(b.x, 0.12, b.z)
    scene.add(curb)
    walk.position.y = 0.2
    walk.scale.set(0.995, 1, 0.995)
  }

  // remove the block center plaza collider issues by adding showroom last
  createShowroom(scene, colliders)
  const buildingData = createBuildings(scene, rng, blockTypes)
  colliders.push(...buildingData.colliders)

  // sidewalk palms
  for (const b of blockTypes) {
    if (b.type === 'buildings' || b.type === 'landmark') {
      for (const [dx, dz] of [[-21, -21], [21, -21], [-21, 21], [21, 21]]) {
        if (rng.chance(0.46)) palms.push([b.x + dx, b.z + dz, 0.85 + rng.range(0, 0.35)])
      }
    }
    if (b.type === 'plaza') {
      for (const [dx, dz] of [[-21, -16], [21, -16], [-21, 5], [21, 5], [-18, 23], [18, 23]]) palms.push([b.x + dx, b.z + dz, 0.95])
    }
    if (b.type === 'parking') {
      for (const [dx, dz] of [[-17, 17], [17, 17]]) palms.push([b.x + dx, b.z + dz, 1.05])
    }
  }
  // boulevard and beach palms
  for (let i = 0; i < 12; i++) {
    palms.push([-150 + i * 27 + rng.range(-3, 3), 164 + rng.range(-1, 2), 1 + rng.range(0, 0.4)])
  }
  for (let i = 0; i < 14; i++) {
    palms.push([-240 + i * 36, 182 + rng.range(-4, 10), 0.9 + rng.range(0, 0.5)])
  }
  for (let i = 0; i < 8; i++) {
    palms.push([-166 + rng.range(-2, 2), -120 + i * 32, 0.9 + rng.range(0, 0.3)])
  }
  const palmGroups = createPalms(scene, palms.filter((p) => Math.abs(p[0]) < 260), null)

  createRoadMarkings(scene)
  createLamps(scene)
  createTrafficLights(scene)
  createBeach(scene, rng)
  const waterMat = createWater(scene)

  // ambient dust motes
  const dustGeo = new THREE.BufferGeometry()
  const dustPos = new Float32Array(420 * 3)
  for (let i = 0; i < 420; i++) {
    dustPos[i * 3] = rng.range(-150, 150)
    dustPos[i * 3 + 1] = rng.range(1, 26)
    dustPos[i * 3 + 2] = rng.range(-150, 170)
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xffd8a8, size: 0.09, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }),
  )
  scene.add(dust)

  const starTex = makeStarTexture()
  for (let i = 0; i < 26; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: starTex, color: 0xfff1d0, transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false, fog: false }))
    const x = rng.range(-260, 260)
    const z = rng.range(176, 240)
    s.position.set(x, rng.range(16, 30), z)
    s.scale.setScalar(rng.range(0.35, 0.7))
    scene.add(s)
  }

  return {
    colliders,
    palms: palmGroups,
    blockTypes,
    landmarks: buildingData.landmarks,
    showcase: {
      x: 0,
      z: 64,
      heading: 0, // model front is +z: face south toward the player
    },
    spawn: { x: -2.8, z: 68.5, heading: Math.PI },
    missionSpots: [
      new THREE.Vector3(-32, 0, -22),
      new THREE.Vector3(96, 0, 94),
      new THREE.Vector3(-128, 0, -30),
      new THREE.Vector3(30, 0, 130),
      new THREE.Vector3(-96, 0, 64),
      new THREE.Vector3(160, 0, -96),
      new THREE.Vector3(32, 0, -128),
    ],
    shardSpots: [
      new THREE.Vector3(-10, 0.6, 82),
      new THREE.Vector3(-64, 0.6, 0),
      new THREE.Vector3(78, 0.6, 40),
      new THREE.Vector3(30, 0.6, -64),
      new THREE.Vector3(-96, 0.6, 112),
      new THREE.Vector3(128, 0.6, 128),
      new THREE.Vector3(-64, 0.6, -128),
      new THREE.Vector3(140, 0.6, 190),
      new THREE.Vector3(-120, 0.6, 196),
      new THREE.Vector3(40, 0.6, 96),
    ],
    update(dt, t) {
      waterMat.uniforms.uTime.value = t
      dust.position.y = Math.sin(t * 0.12) * 0.4
      dust.rotation.y = t * 0.004
      for (let i = 0; i < palmGroups.length; i++) {
        const p = palmGroups[i]
        if (p) p.rotation.z = Math.sin(t * 0.7 + i) * 0.008
      }
    },
  }
}
