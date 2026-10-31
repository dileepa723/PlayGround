// Procedural city + terrain for SAN VERDE.
// Everything here is generated at runtime from primitives and canvas textures.
import * as THREE from '../vendor/three.module.js'

export const CELL = 80
export const GRID = 9
export const HALF = (CELL * GRID) / 2 // 360
export const BLOCK = 56
export const SIDEWALK = 4
export const ROAD = CELL - BLOCK // 24
export const WORLD_LIMIT = HALF - 10
export const SIDEWALK_Y = 0.18

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const BUILDING_COLORS = [
  '#c8a47c', '#bd8c69', '#d6c1a3', '#a98263', '#c27f61',
  '#93a6a1', '#d7b184', '#b4a289', '#a9b0a5', '#cba37e',
  '#d2b48c', '#8f9aa5'
]
const CAR_COLORS = [
  '#c93a32', '#2f6fb0', '#e0b33c', '#3d8a5f', '#d7d7d7',
  '#2b2b30', '#c46a2c', '#7a4b8f', '#4b8fa8', '#b5b0a0'
]

// ---------------------------------------------------------------------------
// Geometry batching: one draw call for hundreds of boxes.
// ---------------------------------------------------------------------------

class BoxBatch {
  constructor() {
    this.pos = []
    this.norm = []
    this.uv = []
    this.col = []
    this.idx = []
    this.count = 0
  }

  addBox(cx, cy, cz, sx, sy, sz, color, uvScale = 0, opts = {}) {
    const hx = sx / 2
    const hy = sy / 2
    const hz = sz / 2
    const c = new THREE.Color(color)
    const faces = []

    if (opts.top !== false) {
      faces.push({
        n: [0, 1, 0],
        v: [
          [-hx, hy, -hz, 0, 0], [-hx, hy, hz, 0, sz], [hx, hy, hz, sx, sz], [hx, hy, -hz, sx, 0]
        ]
      })
    }
    if (opts.bottom === true) {
      faces.push({
        n: [0, -1, 0],
        v: [
          [-hx, -hy, hz, 0, 0], [-hx, -hy, -hz, 0, sz], [hx, -hy, -hz, sx, sz], [hx, -hy, hz, sx, 0]
        ]
      })
    }
    // sides
    faces.push(
      {
        n: [1, 0, 0],
        v: [
          [hx, -hy, -hz, 0, 0], [hx, hy, -hz, 0, sy], [hx, hy, hz, sz, sy], [hx, -hy, hz, sz, 0]
        ]
      },
      {
        n: [-1, 0, 0],
        v: [
          [-hx, -hy, hz, 0, 0], [-hx, hy, hz, 0, sy], [-hx, hy, -hz, sz, sy], [-hx, -hy, -hz, sz, 0]
        ]
      },
      {
        n: [0, 0, 1],
        v: [
          [-hx, -hy, hz, 0, 0], [hx, -hy, hz, sx, 0], [hx, hy, hz, sx, sy], [-hx, hy, hz, 0, sy]
        ]
      },
      {
        n: [0, 0, -1],
        v: [
          [hx, -hy, -hz, 0, 0], [-hx, -hy, -hz, sx, 0], [-hx, hy, -hz, sx, sy], [hx, hy, -hz, 0, sy]
        ]
      }
    )

    for (const face of faces) {
      const base = this.count
      for (const [x, y, z, u, v] of face.v) {
        this.pos.push(cx + x, cy + y, cz + z)
        this.norm.push(face.n[0], face.n[1], face.n[2])
        this.uv.push(u * uvScale, v * uvScale)
        this.col.push(c.r, c.g, c.b)
      }
      this.idx.push(base, base + 1, base + 2, base, base + 2, base + 3)
      this.count += 4
    }
  }

  build(material) {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(this.norm, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3))
    geo.setIndex(this.idx)
    geo.computeBoundingSphere()
    const mesh = new THREE.Mesh(geo, material)
    mesh.matrixAutoUpdate = false
    return mesh
  }
}

// Merge simple geometries (used for palms and park trees).
function mergeGeometries(geos) {
  const pos = []
  const norm = []
  const col = []
  for (const { geo, color } of geos) {
    const g = geo.index ? geo.toNonIndexed() : geo
    const p = g.attributes.position.array
    const n = g.attributes.normal.array
    const c = new THREE.Color(color)
    for (let i = 0; i < p.length; i += 3) {
      pos.push(p[i], p[i + 1], p[i + 2])
      norm.push(n[i], n[i + 1], n[i + 2])
      col.push(c.r, c.g, c.b)
    }
    if (g !== geo) g.dispose()
    geo.dispose()
  }
  const out = new THREE.BufferGeometry()
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  out.setAttribute('normal', new THREE.Float32BufferAttribute(norm, 3))
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  out.computeBoundingSphere()
  return out
}

function makeCanvas(size) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  return c
}

function makeFacadeTextures() {
  const size = 256
  const map = makeCanvas(size)
  const em = makeCanvas(size)
  const g = map.getContext('2d')
  const e = em.getContext('2d')

  g.fillStyle = '#ffffff'
  g.fillRect(0, 0, size, size)
  e.fillStyle = '#000000'
  e.fillRect(0, 0, size, size)

  // subtle floor lines
  g.strokeStyle = 'rgba(0,0,0,0.10)'
  g.lineWidth = 3
  for (let y = 0; y <= size; y += 64) {
    g.beginPath()
    g.moveTo(0, y)
    g.lineTo(size, y)
    g.stroke()
  }

  const rand = mulberry32(97)
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = 18 + col * 58
      const y = 14 + row * 58
      const w = 40
      const h = 34
      // window glass, slightly varied
      const shade = 38 + Math.floor(rand() * 26)
      g.fillStyle = `rgb(${shade}, ${shade + 12}, ${shade + 24})`
      g.fillRect(x, y, w, h)
      g.fillStyle = 'rgba(255,255,255,0.18)'
      g.fillRect(x, y, w, 7)
      g.strokeStyle = 'rgba(0,0,0,0.35)'
      g.lineWidth = 2
      g.strokeRect(x, y, w, h)
      if (rand() < 0.3) {
        e.fillStyle = `rgba(255, ${170 + Math.floor(rand() * 60)}, ${90 + Math.floor(rand() * 70)}, ${0.5 + rand() * 0.5})`
        e.fillRect(x + 2, y + 2, w - 4, h - 4)
      }
    }
  }

  const mapTex = new THREE.CanvasTexture(map)
  mapTex.wrapS = mapTex.wrapT = THREE.RepeatWrapping
  mapTex.colorSpace = THREE.SRGBColorSpace
  mapTex.anisotropy = 4
  const emTex = new THREE.CanvasTexture(em)
  emTex.wrapS = emTex.wrapT = THREE.RepeatWrapping
  emTex.colorSpace = THREE.SRGBColorSpace
  emTex.anisotropy = 4
  return { map: mapTex, emissive: emTex }
}

function makeGroundTexture(size) {
  const c = makeCanvas(size)
  const g = c.getContext('2d')
  const scale = size / (HALF * 2)
  const px = (x) => (x + HALF) * scale

  g.fillStyle = '#26272b'
  g.fillRect(0, 0, size, size)

  // asphalt speckle
  const rand = mulberry32(11)
  for (let i = 0; i < size * 14; i++) {
    const v = 28 + Math.floor(rand() * 24)
    g.fillStyle = `rgba(${v},${v},${v + 2},0.5)`
    const s = 1 + rand() * 2
    g.fillRect(rand() * size, rand() * size, s, s)
  }

  const roadAt = (v) => ((v + HALF) / CELL) % 1 === 0
  const nearIntersection = (x, z) => {
    const fx = Math.abs(((x + HALF) / CELL) % 1)
    const fz = Math.abs(((z + HALF) / CELL) % 1)
    return Math.min(fx, 1 - fx) * CELL < 15 && Math.min(fz, 1 - fz) * CELL < 15
  }

  // dashed centre lines
  g.fillStyle = 'rgba(235,235,220,0.72)'
  for (let k = 0; k <= GRID; k++) {
    const line = -HALF + k * CELL
    for (let t = -HALF + 4; t < HALF; t += 11) {
      const z = t
      if (!nearIntersection(line, z)) {
        g.fillRect(px(line) - 1.4, px(z), 2.8, 6 * scale)
      }
      if (!nearIntersection(z, line)) {
        g.fillRect(px(z), px(line) - 1.4, 6 * scale, 2.8)
      }
    }
  }

  // zebra crossings
  g.fillStyle = 'rgba(225,225,215,0.55)'
  for (let i = 0; i <= GRID; i++) {
    for (let j = 0; j <= GRID; j++) {
      const x = -HALF + i * CELL
      const z = -HALF + j * CELL
      for (const off of [-16, 16]) {
        for (let s = -8; s <= 8; s += 4) {
          g.fillRect(px(x + s), px(z + off) - 5 * scale, 2.2 * scale, 10 * scale)
          g.fillRect(px(x + off) - 5 * scale, px(z + s), 10 * scale, 2.2 * scale)
        }
      }
    }
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function makeSkyTexture(inner, outer) {
  const c = makeCanvas(128)
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64)
  grad.addColorStop(0, inner)
  grad.addColorStop(0.35, outer)
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makePalmGeometry() {
  const geos = []
  const trunk = new THREE.CylinderGeometry(0.16, 0.28, 4.4, 5, 1)
  trunk.translate(0, 2.2, 0)
  geos.push({ geo: trunk, color: '#7a5a3a' })

  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.BoxGeometry(3.4, 0.07, 0.62)
    leaf.translate(1.55, 0, 0)
    const m = new THREE.Matrix4()
    m.makeRotationY((i / 7) * Math.PI * 2)
    m.multiply(new THREE.Matrix4().makeRotationZ(-0.32))
    leaf.applyMatrix4(m)
    leaf.translate(0, 4.4, 0)
    geos.push({ geo: leaf, color: i % 2 ? '#3f6b32' : '#4d7c39' })
  }
  const crown = new THREE.SphereGeometry(0.34, 6, 5)
  crown.translate(0, 4.45, 0)
  geos.push({ geo: crown, color: '#4b6b2f' })
  return mergeGeometries(geos)
}

function makeTreeGeometry() {
  const geos = []
  const trunk = new THREE.CylinderGeometry(0.18, 0.26, 1.7, 5)
  trunk.translate(0, 0.85, 0)
  geos.push({ geo: trunk, color: '#6b5136' })
  const a = new THREE.IcosahedronGeometry(1.25, 0)
  a.translate(0, 2.4, 0)
  geos.push({ geo: a, color: '#4f7a3c' })
  const b = new THREE.IcosahedronGeometry(0.85, 0)
  b.translate(0.5, 3.0, 0.2)
  geos.push({ geo: b, color: '#5c8a45' })
  return mergeGeometries(geos)
}

// ---------------------------------------------------------------------------

export class World {
  constructor(scene, { quality = 'high' } = {}) {
    this.scene = scene
    this.quality = quality
    this.buildings = []
    this.blocks = []
    this.roadNodes = []
    this._hash = new Map()
    this._qid = 0
    this.hour = 17.4
    this.night = 0

    this.buildGround()
    this.buildBlocks()
    this.buildTerrain()
    this.buildSky()
    this.buildLights()
    this.update(0, this.hour)
  }

  // ---- collision -----------------------------------------------------------

  _cellKey(ix, iz) {
    return ix + ',' + iz
  }

  _registerBuilding(b) {
    b._q = -1
    this.buildings.push(b)
    const x0 = Math.floor((b.x - b.hx + HALF) / CELL)
    const x1 = Math.floor((b.x + b.hx + HALF) / CELL)
    const z0 = Math.floor((b.z - b.hz + HALF) / CELL)
    const z1 = Math.floor((b.z + b.hz + HALF) / CELL)
    for (let ix = x0; ix <= x1; ix++) {
      for (let iz = z0; iz <= z1; iz++) {
        const key = this._cellKey(ix, iz)
        if (!this._hash.has(key)) this._hash.set(key, [])
        this._hash.get(key).push(b)
      }
    }
  }

  resolveCircle(x, z, radius) {
    let nx = x
    let nz = z
    let hit = false
    const qid = ++this._qid
    const cx = Math.floor((x + HALF) / CELL)
    const cz = Math.floor((z + HALF) / CELL)
    for (let ix = cx - 1; ix <= cx + 1; ix++) {
      for (let iz = cz - 1; iz <= cz + 1; iz++) {
        const list = this._hash.get(this._cellKey(ix, iz))
        if (!list) continue
        for (const b of list) {
          if (b._q === qid) continue
          b._q = qid
          const minX = b.x - b.hx
          const maxX = b.x + b.hx
          const minZ = b.z - b.hz
          const maxZ = b.z + b.hz
          const closestX = clamp(nx, minX, maxX)
          const closestZ = clamp(nz, minZ, maxZ)
          let dx = nx - closestX
          let dz = nz - closestZ
          let d2 = dx * dx + dz * dz
          if (d2 < radius * radius) {
            hit = true
            if (d2 > 1e-7) {
              const d = Math.sqrt(d2)
              nx += (dx / d) * (radius - d)
              nz += (dz / d) * (radius - d)
            } else {
              const left = nx - minX
              const right = maxX - nx
              const up = nz - minZ
              const down = maxZ - nz
              const m = Math.min(left, right, up, down)
              if (m === left) nx = minX - radius
              else if (m === right) nx = maxX + radius
              else if (m === up) nz = minZ - radius
              else nz = maxZ + radius
            }
          }
        }
      }
    }
    nx = clamp(nx, -WORLD_LIMIT, WORLD_LIMIT)
    nz = clamp(nz, -WORLD_LIMIT, WORLD_LIMIT)
    return { x: nx, z: nz, hit }
  }

  pointBlocked(x, y, z, pad = 0.4) {
    const cx = Math.floor((x + HALF) / CELL)
    const cz = Math.floor((z + HALF) / CELL)
    for (let ix = cx - 1; ix <= cx + 1; ix++) {
      for (let iz = cz - 1; iz <= cz + 1; iz++) {
        const list = this._hash.get(this._cellKey(ix, iz))
        if (!list) continue
        for (const b of list) {
          if (
            y > 0.1 && y < b.h + 1.2 &&
            x > b.x - b.hx - pad && x < b.x + b.hx + pad &&
            z > b.z - b.hz - pad && z < b.z + b.hz + pad
          ) return true
        }
      }
    }
    return false
  }

  // ---- queries -------------------------------------------------------------

  groundHeight(x, z) {
    if (Math.abs(x) > HALF || Math.abs(z) > HALF) return 0
    const fx = (((x + HALF) % CELL) + CELL) % CELL
    const fz = (((z + HALF) % CELL) + CELL) % CELL
    const onBlock = Math.abs(fx - CELL / 2) < BLOCK / 2 && Math.abs(fz - CELL / 2) < BLOCK / 2
    return onBlock ? SIDEWALK_Y : 0
  }

  isOnRoad(x, z) {
    return this.groundHeight(x, z) === 0 && Math.abs(x) < HALF && Math.abs(z) < HALF
  }

  nearestNode(x, z) {
    const i = clamp(Math.round((x + HALF) / CELL), 0, GRID)
    const j = clamp(Math.round((z + HALF) / CELL), 0, GRID)
    return { x: i * CELL - HALF, z: j * CELL - HALF, i, j }
  }

  randomNodeNear(x, z, minDist = 40, maxDist = 300, rand = Math.random) {
    for (let tries = 0; tries < 60; tries++) {
      const node = this.roadNodes[Math.floor(rand() * this.roadNodes.length)]
      const d = Math.hypot(node.x - x, node.z - z)
      if (d >= minDist && d <= maxDist) return node
    }
    return this.roadNodes[Math.floor(rand() * this.roadNodes.length)]
  }

  findFreeSpot(x, z, rand = Math.random) {
    for (let i = 0; i < 80; i++) {
      const a = rand() * Math.PI * 2
      const r = 4 + rand() * 30
      const px = clamp(x + Math.cos(a) * r, -WORLD_LIMIT + 4, WORLD_LIMIT - 4)
      const pz = clamp(z + Math.sin(a) * r, -WORLD_LIMIT + 4, WORLD_LIMIT - 4)
      const res = this.resolveCircle(px, pz, 1.2)
      if (!res.hit && Math.hypot(res.x - px, res.z - pz) < 0.01) return { x: px, z: pz }
    }
    return { x, z }
  }

  // ---- construction --------------------------------------------------------

  buildGround() {
    const size = this.quality === 'high' ? 2048 : 1024
    const tex = makeGroundTexture(size)
    const geo = new THREE.PlaneGeometry(HALF * 2, HALF * 2)
    geo.rotateX(-Math.PI / 2)
    const mat = new THREE.MeshLambertMaterial({ map: tex, color: 0xffffff })
    this.ground = new THREE.Mesh(geo, mat)
    this.ground.receiveShadow = false
    this.scene.add(this.ground)
  }

  buildBlocks() {
    const rand = mulberry32(20261031)
    const sidewalkBatch = new BoxBatch()
    const buildingBatch = new BoxBatch()
    const roofBatch = new BoxBatch()
    const grassBatch = new BoxBatch()
    const { map, emissive } = makeFacadeTextures()

    const facadeMat = new THREE.MeshLambertMaterial({
      map,
      emissiveMap: emissive,
      emissive: 0xffc27a,
      emissiveIntensity: 0,
      vertexColors: true
    })
    const roofMat = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true })
    const sidewalkMat = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true })
    const grassMat = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true })
    this.facadeMat = facadeMat

    const palmSpots = []
    const treeSpots = []
    const lampSpots = []

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const cx = -HALF + (i + 0.5) * CELL
        const cz = -HALF + (j + 0.5) * CELL
        this.blocks.push({ x: cx, z: cz, i, j })
        sidewalkBatch.addBox(cx, SIDEWALK_Y / 2, cz, BLOCK, SIDEWALK_Y, BLOCK, '#8b877e', 0.15)

        const dist = Math.hypot(cx, cz)
        const downtown = clamp(1 - dist / 430, 0, 1)
        const kind = rand()

        if (kind < 0.1) {
          // park
          grassBatch.addBox(cx, SIDEWALK_Y + 0.015, cz, BLOCK - 8, 0.03, BLOCK - 8, '#5f7a44')
          for (let t = 0; t < 4; t++) {
            treeSpots.push({
              x: cx + (rand() - 0.5) * 38,
              z: cz + (rand() - 0.5) * 38,
              s: 0.8 + rand() * 0.6,
              rot: rand() * Math.PI * 2
            })
          }
          for (let t = 0; t < 2; t++) {
            palmSpots.push({
              x: cx + (rand() - 0.5) * 40,
              z: cz + (rand() - 0.5) * 40,
              s: 0.9 + rand() * 0.5,
              rot: rand() * Math.PI * 2
            })
          }
        } else if (kind < 0.18) {
          // parking lot
          sidewalkBatch.addBox(cx, SIDEWALK_Y + 0.02, cz, BLOCK - 10, 0.04, BLOCK - 10, '#35363a')
          this.parkedSpots = this.parkedSpots || []
          for (let t = 0; t < 3; t++) {
            this.parkedSpots.push({
              x: cx + (rand() - 0.5) * 30,
              z: cz + (rand() - 0.5) * 30,
              rot: rand() < 0.5 ? 0 : Math.PI / 2
            })
          }
        } else {
          for (const ox of [-12, 12]) {
            for (const oz of [-12, 12]) {
              if (rand() < 0.18) continue
              const lotX = cx + ox
              const lotZ = cz + oz
              const w = 11 + rand() * 9
              const d = 11 + rand() * 9
              let h = 7 + rand() * 16
              if (rand() < 0.18 + downtown * 0.35) h = 20 + rand() * (24 + downtown * 34)
              h = Math.min(h, 74)
              const color = BUILDING_COLORS[Math.floor(rand() * BUILDING_COLORS.length)]
              const y = SIDEWALK_Y
              buildingBatch.addBox(lotX, y + h / 2, lotZ, w, h, d, color, 0.06)
              roofBatch.addBox(lotX, y + h + 0.08, lotZ, w + 0.5, 0.16, d + 0.5, '#6f6a62')
              this._registerBuilding({ x: lotX, z: lotZ, hx: w / 2, hz: d / 2, h: y + h })
              if (h > 14 && rand() < 0.55) {
                roofBatch.addBox(
                  lotX + (rand() - 0.5) * w * 0.4,
                  y + h + 0.55,
                  lotZ + (rand() - 0.5) * d * 0.4,
                  2 + rand() * 2.5,
                  0.9,
                  2 + rand() * 2,
                  '#8d8a82'
                )
              }
            }
          }
        }

        // street furniture around the block
        for (let t = 0; t < 2; t++) {
          const edge = Math.floor(rand() * 4)
          const along = (rand() - 0.5) * 40
          let x = cx
          let z = cz
          if (edge === 0) { x = cx + along; z = cz - 26.5 }
          else if (edge === 1) { x = cx + along; z = cz + 26.5 }
          else if (edge === 2) { x = cx - 26.5; z = cz + along }
          else { x = cx + 26.5; z = cz + along }
          if (rand() < 0.55) {
            palmSpots.push({ x, z, s: 0.85 + rand() * 0.5, rot: rand() * Math.PI * 2 })
          } else if (rand() < 0.4) {
            lampSpots.push({ x, z, rot: rand() < 0.5 ? 0 : Math.PI })
          }
        }
      }
    }

    this.scene.add(buildingBatch.build(facadeMat))
    this.scene.add(roofBatch.build(roofMat))
    this.scene.add(sidewalkBatch.build(sidewalkMat))
    this.scene.add(grassBatch.build(grassMat))

    // palms
    const palmGeo = makePalmGeometry()
    const palmMat = new THREE.MeshLambertMaterial({ vertexColors: true })
    const palms = new THREE.InstancedMesh(palmGeo, palmMat, palmSpots.length)
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const s = new THREE.Vector3()
    const p = new THREE.Vector3()
    palmSpots.forEach((spot, idx) => {
      p.set(spot.x, SIDEWALK_Y, spot.z)
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), spot.rot)
      s.set(spot.s, spot.s, spot.s)
      m.compose(p, q, s)
      palms.setMatrixAt(idx, m)
    })
    palms.instanceMatrix.needsUpdate = true
    palms.frustumCulled = false
    this.scene.add(palms)

    // park trees
    if (treeSpots.length) {
      const treeGeo = makeTreeGeometry()
      const trees = new THREE.InstancedMesh(treeGeo, palmMat, treeSpots.length)
      treeSpots.forEach((spot, idx) => {
        p.set(spot.x, SIDEWALK_Y, spot.z)
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), spot.rot)
        s.set(spot.s, spot.s, spot.s)
        m.compose(p, q, s)
        trees.setMatrixAt(idx, m)
      })
      trees.instanceMatrix.needsUpdate = true
      this.scene.add(trees)
    }

    // street lamps
    const poleGeo = new THREE.CylinderGeometry(0.07, 0.09, 5.2, 5)
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x3c3f44 })
    const lampGeo = new THREE.BoxGeometry(0.55, 0.16, 0.28)
    const lampMat = new THREE.MeshLambertMaterial({ color: 0x2f3237, emissive: 0xffd9a0, emissiveIntensity: 0 })
    this.lampMat = lampMat
    const poles = new THREE.InstancedMesh(poleGeo, poleMat, lampSpots.length)
    const lamps = new THREE.InstancedMesh(lampGeo, lampMat, lampSpots.length)
    lampSpots.forEach((spot, idx) => {
      p.set(spot.x, SIDEWALK_Y + 2.6, spot.z)
      q.identity()
      s.set(1, 1, 1)
      m.compose(p, q, s)
      poles.setMatrixAt(idx, m)
      p.set(spot.x + Math.sin(spot.rot) * 0.5, SIDEWALK_Y + 5.15, spot.z + Math.cos(spot.rot) * 0.5)
      m.compose(p, q, s)
      lamps.setMatrixAt(idx, m)
    })
    poles.instanceMatrix.needsUpdate = true
    lamps.instanceMatrix.needsUpdate = true
    this.scene.add(poles, lamps)

    // road node graph
    for (let i = 0; i <= GRID; i++) {
      for (let j = 0; j <= GRID; j++) {
        this.roadNodes.push({ x: -HALF + i * CELL, z: -HALF + j * CELL, i, j })
      }
    }
  }

  buildTerrain() {
    const seg = 72
    const size = 2400
    const geo = new THREE.PlaneGeometry(size, size, seg, seg)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const low = new THREE.Color('#6f7d4b')
    const mid = new THREE.Color('#8b7c5b')
    const high = new THREE.Color('#a9a18c')
    const tmp = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const d = Math.hypot(x, z)
      const t = Math.max(0, (d - 370) / 330)
      let h = Math.pow(t, 1.7) * 150
      h += Math.sin(x * 0.013) * Math.cos(z * 0.011) * 18 * Math.min(1, t * 3)
      h += Math.sin(x * 0.031 + 1.3) * Math.cos(z * 0.027) * 5 * Math.min(1, t * 4)
      pos.setY(i, h - 1.2)
      const k = clamp(h / 190, 0, 1)
      tmp.copy(low).lerp(mid, clamp(k * 2.2, 0, 1)).lerp(high, clamp((k - 0.45) * 2, 0, 1))
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.matrixAutoUpdate = false
    this.scene.add(mesh)
  }

  buildSky() {
    this.scene.fog = new THREE.Fog(0xcfe4f2, 85, 520)
    this.skyUniforms = {
      topColor: { value: new THREE.Color('#2c6cb5') },
      bottomColor: { value: new THREE.Color('#cfe4f2') },
      offset: { value: 24 },
      exponent: { value: 0.85 }
    }
    const skyGeo = new THREE.SphereGeometry(1500, 24, 16)
    const skyMat = new THREE.ShaderMaterial({
      uniforms: this.skyUniforms,
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false
    })
    this.sky = new THREE.Mesh(skyGeo, skyMat)
    this.sky.frustumCulled = false
    this.scene.add(this.sky)

    const sunTex = makeSkyTexture('#fff8e8', 'rgba(255,170,80,0.9)')
    this.sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sunTex, color: 0xffffff, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending
    }))
    this.sunSprite.scale.setScalar(220)
    this.scene.add(this.sunSprite)

    const moonTex = makeSkyTexture('#f4f6ff', 'rgba(190,205,255,0.65)')
    this.moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: moonTex, color: 0xffffff, transparent: true, depthWrite: false, fog: false
    }))
    this.moonSprite.scale.setScalar(110)
    this.scene.add(this.moonSprite)

    const starCount = 700
    const starPos = new Float32Array(starCount * 3)
    const rand = mulberry32(7)
    for (let i = 0; i < starCount; i++) {
      const a = rand() * Math.PI * 2
      const e = 0.1 + rand() * 1.2
      const r = 1350
      starPos[i * 3] = Math.cos(a) * Math.cos(e) * r
      starPos[i * 3 + 1] = Math.sin(e) * r
      starPos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    this.starMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false
    })
    const stars = new THREE.Points(starGeo, this.starMat)
    stars.frustumCulled = false
    this.scene.add(stars)

    this.fogColor = new THREE.Color('#cfe4f2')
  }

  buildLights() {
    this.hemi = new THREE.HemisphereLight(0xbfd7ff, 0x6b5a44, 0.9)
    this.scene.add(this.hemi)
    this.sunLight = new THREE.DirectionalLight(0xfff0d8, 2.2)
    this.sunLight.position.set(120, 200, 80)
    this.scene.add(this.sunLight)
    this.fill = new THREE.DirectionalLight(0x8fa8d8, 0.25)
    this.fill.position.set(-140, 90, -120)
    this.scene.add(this.fill)
  }

  // ---- time of day ---------------------------------------------------------

  update(dt, hour) {
    this.hour = ((hour % 24) + 24) % 24
    const a = ((this.hour - 6) / 12) * Math.PI
    const el = Math.sin(a)
    const day = smoothstep(-0.09, 0.24, el)
    const night = 1 - day
    this.night = night
    this.day = day

    this.sunDir = new THREE.Vector3(Math.cos(a), el, 0.34).normalize()
    this.sunLight.position.copy(this.sunDir).multiplyScalar(320)
    this.sunLight.intensity = Math.max(0, el) * 2.6 + 0.04
    this.hemi.intensity = 0.22 + day * 0.95
    this.fill.intensity = 0.12 + day * 0.25

    const nightTop = new THREE.Color('#050812')
    const nightBottom = new THREE.Color('#0a1222')
    const dayTop = new THREE.Color('#2a6cb8')
    const dayBottom = new THREE.Color('#cfe4f2')
    const duskTop = new THREE.Color('#5a4468')
    const duskBottom = new THREE.Color('#ff9a4f')

    const top = nightTop.clone().lerp(dayTop, day)
    const bottom = nightBottom.clone().lerp(dayBottom, day)
    const dusk = Math.max(0, 1 - Math.abs(el) / 0.3) * (el > -0.16 ? 1 : 0)
    top.lerp(duskTop, dusk * 0.55)
    bottom.lerp(duskBottom, dusk * 0.8)

    this.skyUniforms.topColor.value.copy(top)
    this.skyUniforms.bottomColor.value.copy(bottom)
    this.fogColor.copy(bottom)
    this.scene.fog.color.copy(bottom)

    this.facadeMat.emissiveIntensity = night * 1.25
    if (this.lampMat) this.lampMat.emissiveIntensity = night * 2.6
    this.starMat.opacity = clamp(-el * 2.4, 0, 0.95)
    this.sunSprite.position.copy(this.sunDir).multiplyScalar(1150)
    this.sunSprite.material.opacity = el > -0.12 ? 1 : 0
    this.moonSprite.position.copy(this.sunDir).multiplyScalar(-1150)
    this.moonSprite.material.opacity = el < 0.08 ? 0.9 : 0

    this.sunLight.color.setHSL(0.1, 0.35 + dusk * 0.4, 0.62 + day * 0.2)
    this.scene.background = null
  }
}

export { CAR_COLORS, mulberry32 }
