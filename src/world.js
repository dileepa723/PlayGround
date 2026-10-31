import * as THREE from '../vendor/three.module.js'

/* ------------------------------------------------------------------ */
/*  Small math helpers                                                 */
/* ------------------------------------------------------------------ */
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return s - Math.floor(s)
}
function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash2(xi, yi), b = hash2(xi + 1, yi)
  const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1)
  return lerp(lerp(a, b, u), lerp(c, d, u), v)
}
function fbm(x, y, oct = 4) {
  let v = 0, amp = 0.5, f = 1
  for (let i = 0; i < oct; i++) {
    v += noise2(x * f, y * f) * amp
    f *= 2.03
    amp *= 0.5
  }
  return v
}

/* ------------------------------------------------------------------ */
/*  Canvas texture helpers                                             */
/* ------------------------------------------------------------------ */
function canvasTexture(w, h, draw, { srgb = true, repeat = null } = {}) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  draw(ctx, w, h)
  const t = new THREE.CanvasTexture(c)
  if (srgb) t.colorSpace = THREE.SRGBColorSpace
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeat[0], repeat[1])
  }
  t.anisotropy = 4
  return t
}

function facadeTextures() {
  const rnd = mulberry32(991)
  const base = canvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = '#d4d2cc'; ctx.fillRect(0, 0, w, h)
    for (let y = 0; y < 10; y++) {
      ctx.fillStyle = y % 2 ? '#c8c6bf' : '#dcdad4'
      ctx.fillRect(0, y * 25.6, w, 25.6)
    }
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 5; x++) {
        const px = 6 + x * 24.5, py = 5 + y * 25.6
        const shade = 40 + Math.floor(rnd() * 34)
        ctx.fillStyle = `rgb(${shade},${shade + 10},${shade + 18})`
        ctx.fillRect(px, py, 15, 15)
        ctx.fillStyle = 'rgba(255,255,255,0.22)'
        ctx.fillRect(px, py, 15, 3)
      }
    }
  })
  const emissive = canvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
    const r2 = mulberry32(772)
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 5; x++) {
        if (r2() > 0.42) continue
        const px = 6 + x * 24.5, py = 5 + y * 25.6
        ctx.fillStyle = r2() > 0.5 ? '#ffe6ae' : '#cfe8ff'
        ctx.fillRect(px, py, 15, 15)
      }
    }
  })
  return { base, emissive }
}

function asphaltTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#3a3b3d'; ctx.fillRect(0, 0, w, h)
    const rnd = mulberry32(55)
    for (let i = 0; i < 5200; i++) {
      const g = 42 + Math.floor(rnd() * 40)
      ctx.fillStyle = `rgba(${g},${g},${g + 2},${0.25 + rnd() * 0.4})`
      const s = 0.6 + rnd() * 2.4
      ctx.fillRect(rnd() * w, rnd() * h, s, s)
    }
    ctx.strokeStyle = 'rgba(20,20,22,0.35)'
    ctx.lineWidth = 1.4
    for (let i = 0; i < 7; i++) {
      ctx.beginPath()
      let x = rnd() * w, y = rnd() * h
      ctx.moveTo(x, y)
      for (let k = 0; k < 5; k++) { x += (rnd() - 0.5) * 40; y += rnd() * 30; ctx.lineTo(x, y) }
      ctx.stroke()
    }
  }, { repeat: [1, 1] })
}

function waterNormalTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const img = ctx.createImageData(w, h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4
        const nx = fbm(x * 0.09, y * 0.09, 3)
        const ny = fbm(x * 0.09 + 31, y * 0.09 + 17, 3)
        img.data[i] = 128 + (nx - 0.5) * 120
        img.data[i + 1] = 128 + (ny - 0.5) * 120
        img.data[i + 2] = 255
        img.data[i + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }, { srgb: false, repeat: [70, 70] })
}

function cloudTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    const rnd = mulberry32(1234)
    for (let i = 0; i < 26; i++) {
      const x = w * 0.5 + (rnd() - 0.5) * w * 0.78
      const y = h * 0.55 + (rnd() - 0.5) * h * 0.42
      const r = 14 + rnd() * 34
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(255,255,255,0.5)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    }
  })
}

function chevronTexture() {
  const t = canvasTexture(128, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = '#5ff2ff'
    ctx.lineWidth = 13
    ctx.lineCap = 'round'
    for (let i = 0; i < 3; i++) {
      const y = 52 + i * 72
      ctx.beginPath()
      ctx.moveTo(24, y + 26)
      ctx.lineTo(64, y)
      ctx.lineTo(104, y + 26)
      ctx.stroke()
    }
  })
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  return t
}

function minimapBaseTexture(world, size) {
  const N = world.gridN
  const grid = world.heightGrid
  const c = document.createElement('canvas')
  c.width = size; c.height = size
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const gx = Math.min(N, Math.round(px / size * N))
      const gy = Math.min(N, Math.round(py / size * N))
      const h = grid[gy * (N + 1) + gx]
      let r, g, b
      if (h < 0.4) { r = 26; g = 66; b = 82 }
      else if (h < 3.2) { r = 178; g = 160; b = 112 }
      else if (h < 92) {
        const t = clamp(h / 100, 0, 1)
        r = 78 + t * 24; g = 108 + t * 10; b = 62 + t * 8
      } else {
        r = 150; g = 150; b = 145
      }
      const i = (py * size + px) * 4
      img.data[i] = r; img.data[i + 1] = g; img.data[i + 2] = b; img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  // roads
  ctx.lineCap = 'round'
  for (const road of world.roads) {
    ctx.beginPath()
    road.points.forEach((p, i) => {
      const x = (p.x + 1000) / 2000 * size
      const y = (p.z + 1000) / 2000 * size
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    })
    if (road.closed) ctx.closePath()
    ctx.strokeStyle = 'rgba(32,36,40,0.9)'
    ctx.lineWidth = Math.max(1.2, road.width / 2000 * size)
    ctx.stroke()
  }
  // city blocks
  ctx.fillStyle = 'rgba(150,150,140,0.55)'
  for (const pad of world.cityPads) {
    const x = (pad.x + 1000) / 2000 * size
    const y = (pad.z + 1000) / 2000 * size
    const s = 68 / 2000 * size
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
  }
  return c
}

/* ------------------------------------------------------------------ */
/*  World                                                              */
/* ------------------------------------------------------------------ */
export function buildWorld(scene, { quality = 'high' } = {}) {
  const LOW = quality === 'low'
  const MED = quality === 'medium'
  const rng = mulberry32(20261031)

  /* ---------------- terrain height field ---------------- */
  function rawHeight(x, z) {
    const r = Math.hypot(x, z)
    const island = smoothstep(985, 770, r)
    const city = smoothstep(335, 245, r)
    const base = 7.4 + fbm(x * 0.0042, z * 0.0042, 4) * 21
    const hills = smoothstep(295, 545, r) * (16 + fbm(x * 0.006 + 51, z * 0.006 - 23, 4) * 62)
    const ridge = 1 - Math.abs(fbm(x * 0.0034 - 82, z * 0.0034 + 44, 4) * 2 - 1)
    const mountains = smoothstep(610, 845, r) * (30 + ridge * 130)
    let h = base + hills + mountains
    h = lerp(h, 8, city * 0.94)
    h = h * island - (1 - island) * 16
    return h
  }

  /* ---------------- road network ---------------- */
  const roads = []
  function addRoad(points, width, closed = false, kind = 'street') {
    const road = { points, width, closed, kind }
    roads.push(road)
    return road
  }
  const cityLines = [-240, -160, -80, 0, 80, 160, 240]
  for (const x of cityLines) {
    const pts = []
    for (let z = -300; z <= 300; z += 20) pts.push({ x, z })
    addRoad(pts, 13, false, 'street')
  }
  for (const z of cityLines) {
    const pts = []
    for (let x = -300; x <= 300; x += 20) pts.push({ x, z })
    addRoad(pts, 13, false, 'street')
  }
  // ring highway
  {
    const pts = []
    const steps = LOW ? 140 : 200
    for (let i = 0; i < steps; i++) {
      const a = i / steps * Math.PI * 2
      pts.push({ x: Math.cos(a) * 500, z: Math.sin(a) * 420 })
    }
    addRoad(pts, 18, true, 'highway')
  }
  // connectors between city and ring
  for (const dir of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
    const pts = []
    for (let t = 0; t <= 1.001; t += 0.1) {
      const x = dir[0] * (300 + t * (500 - 300))
      const z = dir[1] * (300 + t * (420 - 300))
      pts.push({ x, z })
    }
    addRoad(pts, 13, false, 'street')
  }

  // road heights: sample raw, then smooth
  for (const road of roads) {
    for (const p of road.points) p.h = rawHeight(p.x, p.z)
    const passes = 3
    for (let pass = 0; pass < passes; pass++) {
      const src = road.points.map(p => p.h)
      const n = src.length
      for (let i = 0; i < n; i++) {
        if (!road.closed && (i === 0 || i === n - 1)) continue
        let sum = 0, count = 0
        for (let k = -2; k <= 2; k++) {
          let j = i + k
          if (road.closed) j = (j + n) % n
          else j = clamp(j, 0, n - 1)
          sum += src[j]; count++
        }
        road.points[i].h = sum / count
      }
    }
  }

  // segment grid for fast nearest-road queries
  const CELL = 64
  const segGrid = new Map()
  const segments = []
  const key = (cx, cz) => cx + ',' + cz
  function addToGrid(idx, seg) {
    const reach = seg.width / 2 + 18
    const minx = Math.floor((Math.min(seg.ax, seg.bx) - reach) / CELL)
    const maxx = Math.floor((Math.max(seg.ax, seg.bx) + reach) / CELL)
    const minz = Math.floor((Math.min(seg.az, seg.bz) - reach) / CELL)
    const maxz = Math.floor((Math.max(seg.az, seg.bz) + reach) / CELL)
    for (let cx = minx; cx <= maxx; cx++) {
      for (let cz = minz; cz <= maxz; cz++) {
        const k = key(cx, cz)
        let list = segGrid.get(k)
        if (!list) { list = []; segGrid.set(k, list) }
        list.push(idx)
      }
    }
  }
  for (const road of roads) {
    const pts = road.points
    const n = pts.length
    const last = road.closed ? n : n - 1
    for (let i = 0; i < last; i++) {
      const a = pts[i], b = pts[(i + 1) % n]
      const idx = segments.length
      const seg = { ax: a.x, az: a.z, bx: b.x, bz: b.z, ah: a.h, bh: b.h, width: road.width }
      segments.push(seg)
      addToGrid(idx, seg)
    }
  }

  const _q = { d: 0, h: 0, t: 0 }
  function nearestRoad(x, z, maxReach = 26) {
    const cx = Math.floor(x / CELL), cz = Math.floor(z / CELL)
    let best = Infinity, targetH = 0, weight = 0, sumH = 0
    for (let ox = -1; ox <= 1; ox++) {
      for (let oz = -1; oz <= 1; oz++) {
        const list = segGrid.get(key(cx + ox, cz + oz))
        if (!list) continue
        for (const idx of list) {
          const s = segments[idx]
          const dx = s.bx - s.ax, dz = s.bz - s.az
          const len2 = dx * dx + dz * dz || 1
          let t = ((x - s.ax) * dx + (z - s.az) * dz) / len2
          t = clamp(t, 0, 1)
          const px = s.ax + dx * t, pz = s.az + dz * t
          const d = Math.hypot(x - px, z - pz)
          const reach = s.width / 2 + 18
          if (d < reach) {
            const w = 1 - smoothstep(s.width / 2, reach, d)
            sumH += (s.ah + (s.bh - s.ah) * t) * w
            weight += w
            if (d < best) { best = d; targetH = s.ah + (s.bh - s.ah) * t }
          }
        }
      }
    }
    if (weight > 0.001) {
      _q.d = best
      _q.h = sumH / weight
      _q.t = clamp(weight, 0, 1)
      return _q
    }
    _q.d = Infinity; _q.h = 0; _q.t = 0
    return _q
  }

  function heightAt(x, z) {
    const raw = rawHeight(x, z)
    const near = nearestRoad(x, z)
    if (near.t > 0.001) return lerp(raw, near.h, near.t)
    return raw
  }
  function isOnRoad(x, z, margin = 0) {
    const near = nearestRoad(x, z)
    return near.d < near.t * 0 + 999 && near.t > 0.001 && near.d < 30 + margin
  }

  /* ---------------- scene basics ---------------- */
  const sunDir = new THREE.Vector3(-0.42, 0.34, -0.84).normalize()
  const horizon = new THREE.Color('#f4d7b4')
  scene.fog = new THREE.Fog(0xd8d2c2, 340, 1750)
  scene.background = new THREE.Color('#cfe0ea')

  const hemi = new THREE.HemisphereLight(0xdff1ff, 0x6b6247, 1.35)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(0xffe2b8, 3.0)
  sun.position.copy(sunDir).multiplyScalar(260)
  sun.castShadow = true
  const shadowSize = LOW ? 1024 : MED ? 1536 : 2048
  sun.shadow.mapSize.set(shadowSize, shadowSize)
  sun.shadow.camera.left = -80
  sun.shadow.camera.right = 80
  sun.shadow.camera.top = 80
  sun.shadow.camera.bottom = -80
  sun.shadow.camera.near = 20
  sun.shadow.camera.far = 620
  sun.shadow.bias = -0.0006
  sun.shadow.normalBias = 0.6
  scene.add(sun)
  scene.add(sun.target)

  /* ---------------- sky ---------------- */
  const skyGeo = new THREE.SphereGeometry(4200, 32, 20)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uSun: { value: sunDir },
      uTop: { value: new THREE.Color('#3f7fb8') },
      uHorizon: { value: horizon },
      uSunColor: { value: new THREE.Color('#ffd9a0') },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vDir;
      uniform vec3 uSun, uTop, uHorizon, uSunColor;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, -0.1, 1.0);
        vec3 col = mix(uHorizon, uTop, pow(max(h, 0.0), 0.62));
        float sunAmt = max(dot(d, uSun), 0.0);
        col += uSunColor * pow(sunAmt, 420.0) * 2.4;
        col += uSunColor * pow(sunAmt, 12.0) * 0.22;
        col += uSunColor * pow(sunAmt, 2.5) * 0.07;
        // soft high clouds
        vec2 cp = d.xz / (max(d.y, 0.04) + 0.22);
        float n = noise(cp * 1.4 + 3.0) * 0.55 + noise(cp * 3.1 - 7.0) * 0.3 + noise(cp * 6.3) * 0.15;
        float cloud = smoothstep(0.58, 0.86, n) * smoothstep(0.0, 0.18, d.y) * 0.5;
        col = mix(col, vec3(1.0, 0.95, 0.9), cloud);
        col = mix(col, uHorizon * 0.94, smoothstep(0.02, -0.14, d.y));
        gl_FragColor = vec4(col, 1.0);
      }`,
  })
  const sky = new THREE.Mesh(skyGeo, skyMat)
  sky.frustumCulled = false
  scene.add(sky)

  // environment map for nicer metals
  const envCanvas = document.createElement('canvas')
  envCanvas.width = 512; envCanvas.height = 256
  const ectx = envCanvas.getContext('2d')
  const grad = ectx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#4d86b8'); grad.addColorStop(0.42, '#b8d6e6')
  grad.addColorStop(0.52, '#f7dcb8'); grad.addColorStop(0.56, '#8b8062')
  grad.addColorStop(1, '#3c4232')
  ectx.fillStyle = grad; ectx.fillRect(0, 0, 512, 256)
  const sg = ectx.createRadialGradient(150, 96, 2, 150, 96, 62)
  sg.addColorStop(0, 'rgba(255,240,200,1)'); sg.addColorStop(1, 'rgba(255,220,170,0)')
  ectx.fillStyle = sg; ectx.fillRect(0, 0, 512, 256)
  const envTex = new THREE.CanvasTexture(envCanvas)
  envTex.mapping = THREE.EquirectangularReflectionMapping
  envTex.colorSpace = THREE.SRGBColorSpace
  const pmrem = new THREE.PMREMGenerator(rendererRef)
  scene.environment = pmrem.fromEquirectangular(envTex).texture
  scene.environmentIntensity = 0.55
  envTex.dispose(); pmrem.dispose()

  /* ---------------- terrain ---------------- */
  const N = LOW ? 150 : MED ? 200 : 250
  const SIZE = 2000
  const posArr = new Float32Array((N + 1) * (N + 1) * 3)
  const uvArr = new Float32Array((N + 1) * (N + 1) * 2)
  const heightGrid = new Float32Array((N + 1) * (N + 1))
  for (let iz = 0; iz <= N; iz++) {
    for (let ix = 0; ix <= N; ix++) {
      const x = -SIZE / 2 + ix / N * SIZE
      const z = -SIZE / 2 + iz / N * SIZE
      const y = heightAt(x, z)
      const i = (iz * (N + 1) + ix)
      posArr[i * 3] = x
      posArr[i * 3 + 1] = y
      posArr[i * 3 + 2] = z
      uvArr[i * 2] = ix / N * 90
      uvArr[i * 2 + 1] = iz / N * 90
      heightGrid[i] = y
    }
  }
  const indices = []
  for (let iz = 0; iz < N; iz++) {
    for (let ix = 0; ix < N; ix++) {
      const a = iz * (N + 1) + ix
      const b = a + 1
      const c = a + (N + 1)
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }
  const terrainGeo = new THREE.BufferGeometry()
  terrainGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
  terrainGeo.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2))
  terrainGeo.setIndex(indices)
  terrainGeo.computeVertexNormals()

  const colors = new Float32Array((N + 1) * (N + 1) * 3)
  const nrm = terrainGeo.attributes.normal.array
  const cGrass = new THREE.Color('#5f8b45')
  const cGrass2 = new THREE.Color('#7ba14f')
  const cDry = new THREE.Color('#9aa35e')
  const cRock = new THREE.Color('#8a8274')
  const cSnow = new THREE.Color('#e9edf0')
  const cSand = new THREE.Color('#d6c28e')
  const cSeabed = new THREE.Color('#6f7d5e')
  const tmpCol = new THREE.Color()
  for (let i = 0; i <= N * (N + 1) + N; i++) {
    const y = posArr[i * 3 + 1]
    const ny = nrm[i * 3 + 1]
    const x = posArr[i * 3], z = posArr[i * 3 + 2]
    const slope = 1 - ny
    if (y < 0.5) tmpCol.copy(cSeabed).lerp(cSand, clamp((y + 8) / 8, 0, 1))
    else if (y < 3.6) tmpCol.copy(cSand)
    else {
      const v = fbm(x * 0.03, z * 0.03, 2)
      tmpCol.copy(cGrass).lerp(cGrass2, v)
      if (y > 26) tmpCol.lerp(cDry, smoothstep(26, 58, y) * 0.5)
      if (slope > 0.3) tmpCol.lerp(cRock, smoothstep(0.3, 0.62, slope))
      if (y > 88) tmpCol.lerp(cSnow, smoothstep(88, 130, y) * (1 - smoothstep(0.4, 0.7, slope)))
    }
    colors[i * 3] = tmpCol.r; colors[i * 3 + 1] = tmpCol.g; colors[i * 3 + 2] = tmpCol.b
  }
  terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const terrainMat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.96, metalness: 0.0,
  })
  const terrain = new THREE.Mesh(terrainGeo, terrainMat)
  terrain.receiveShadow = true
  terrain.castShadow = false
  scene.add(terrain)

  /* ---------------- water ---------------- */
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1d6480, roughness: 0.18, metalness: 0.35,
    transparent: true, opacity: 0.93,
    normalMap: waterNormalTexture(),
    normalScale: new THREE.Vector2(0.32, 0.32),
  })
  const water = new THREE.Mesh(new THREE.PlaneGeometry(5200, 5200, 1, 1), waterMat)
  water.rotation.x = -Math.PI / 2
  water.position.y = 0.15
  water.receiveShadow = false
  scene.add(water)

  /* ---------------- clouds ---------------- */
  const cloudTex = cloudTexture()
  const clouds = new THREE.Group()
  for (let i = 0; i < (LOW ? 5 : 11); i++) {
    const mat = new THREE.SpriteMaterial({
      map: cloudTex, transparent: true, opacity: 0.32 + rng() * 0.22,
      depthWrite: false, fog: false, color: 0xffffff,
    })
    const s = new THREE.Sprite(mat)
    const a = rng() * Math.PI * 2
    const r = 700 + rng() * 1500
    s.position.set(Math.cos(a) * r, 190 + rng() * 180, Math.sin(a) * r)
    const sc = 300 + rng() * 420
    s.scale.set(sc, sc * 0.36, 1)
    clouds.add(s)
  }
  scene.add(clouds)

  /* ---------------- roads mesh ---------------- */
  const asphalt = asphaltTexture()
  const roadPositions = [], roadNormals = [], roadUvs = [], roadIndices = []
  const edgePositions = [], edgeNormals = [], edgeIndices = []
  let roadVert = 0
  function addRibbon(road, width, yOff, positions, normals, uvs, indices, vertBase, colorEdge = false) {
    const pts = road.points
    const n = pts.length
    const count = road.closed ? n + 1 : n
    let dist = 0
    const verts = []
    for (let i = 0; i < count; i++) {
      const p = pts[i % n]
      const prev = pts[(i - 1 + n) % n]
      const next = pts[(i + 1) % n]
      let tx = next.x - prev.x, tz = next.z - prev.z
      const tl = Math.hypot(tx, tz) || 1
      tx /= tl; tz /= tl
      const nx = tz, nz = -tx
      if (i > 0) dist += Math.hypot(p.x - pts[(i - 1) % n].x, p.z - pts[(i - 1) % n].z)
      const y = p.h + yOff
      verts.push(
        p.x + nx * width / 2, y, p.z + nz * width / 2,
        p.x - nx * width / 2, y, p.z - nz * width / 2,
      )
      if (uvs) {
        const v = dist / 11
        uvs.push(0, v, 1, v)
      }
      normals.push(0, 1, 0, 0, 1, 0)
    }
    for (let i = 0; i < count - 1; i++) {
      const a = vertBase + i * 2
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3)
    }
    for (const v of verts) positions.push(v)
    return count * 2
  }
  for (const road of roads) {
    const used = addRibbon(road, road.width, 0.1, roadPositions, roadNormals, roadUvs, roadIndices, roadVert)
    roadVert += used
  }
  const roadGeo = new THREE.BufferGeometry()
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadPositions, 3))
  roadGeo.setAttribute('normal', new THREE.Float32BufferAttribute(roadNormals, 3))
  roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2))
  roadGeo.setIndex(roadIndices)
  const roadMat = new THREE.MeshStandardMaterial({
    map: asphalt, color: 0x9b9b9b, roughness: 0.82, metalness: 0.02,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
  })
  const roadMesh = new THREE.Mesh(roadGeo, roadMat)
  roadMesh.receiveShadow = true
  scene.add(roadMesh)

  // road markings as instanced quads
  const markGeo = new THREE.PlaneGeometry(1, 1)
  markGeo.rotateX(-Math.PI / 2)
  const markMat = new THREE.MeshBasicMaterial({
    color: 0xf2eee0, transparent: true, opacity: 0.85,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  })
  const markTransforms = []
  for (const road of roads) {
    const pts = road.points
    const n = pts.length
    const last = road.closed ? n : n - 1
    let acc = 0
    for (let i = 0; i < last; i++) {
      const a = pts[i], b = pts[(i + 1) % n]
      const dx = b.x - a.x, dz = b.z - a.z
      const len = Math.hypot(dx, dz)
      const yaw = Math.atan2(dx, dz)
      const nx = dz / len, nz = -dx / len
      const steps = Math.max(1, Math.floor(len / 6))
      for (let s = 0; s < steps; s++) {
        const t = (s + 0.5) / steps
        const x = a.x + dx * t, z = a.z + dz * t
        const y = (a.h + (b.h - a.h) * t) + 0.17
        // center dash
        if ((acc + s) % 2 === 0) markTransforms.push([x, y, z, yaw, 0.34, 3.4, 1])
        // edge lines
        markTransforms.push([x + nx * (road.width / 2 - 0.55), y, z + nz * (road.width / 2 - 0.55), yaw, 0.18, len / steps + 0.4, 1])
        markTransforms.push([x - nx * (road.width / 2 - 0.55), y, z - nz * (road.width / 2 - 0.55), yaw, 0.18, len / steps + 0.4, 1])
      }
      acc += steps
    }
  }
  const marks = new THREE.InstancedMesh(markGeo, markMat, markTransforms.length)
  const m4 = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const eu = new THREE.Euler()
  const v3 = new THREE.Vector3()
  const sc3 = new THREE.Vector3()
  markTransforms.forEach((t, i) => {
    eu.set(0, t[3], 0)
    q.setFromEuler(eu)
    v3.set(t[0], t[1], t[2])
    sc3.set(t[4], 1, t[5])
    m4.compose(v3, q, sc3)
    marks.setMatrixAt(i, m4)
  })
  marks.instanceMatrix.needsUpdate = true
  marks.frustumCulled = false
  scene.add(marks)

  /* ---------------- city pads + buildings ---------------- */
  const blockCenters = []
  const bounds = [-300, -240, -160, -80, 0, 80, 160, 240, 300]
  for (let i = 0; i < bounds.length - 1; i++) {
    for (let j = 0; j < bounds.length - 1; j++) {
      const x = (bounds[i] + bounds[i + 1]) / 2
      const z = (bounds[j] + bounds[j + 1]) / 2
      blockCenters.push({ x, z, i, j })
    }
  }
  const parkSet = new Set(['3,3', '4,4', '3,4', '4,3', '1,5', '6,2'])
  const cityPads = blockCenters.map(b => ({ ...b, park: parkSet.has(b.i + ',' + b.j) }))

  const padGeo = new THREE.BoxGeometry(1, 1, 1)
  padGeo.translate(0, 0.5, 0)
  const padMat = new THREE.MeshStandardMaterial({ color: 0xa9a69b, roughness: 0.95 })
  const parkMat = new THREE.MeshStandardMaterial({ color: 0x6c8f4c, roughness: 1 })
  const cityPad = new THREE.InstancedMesh(padGeo, padMat, cityPads.filter(p => !p.park).length)
  const parkPad = new THREE.InstancedMesh(padGeo, parkMat, cityPads.filter(p => p.park).length)
  let cpi = 0, ppi = 0
  const padY = 8.0
  for (const pad of cityPads) {
    eu.set(0, 0, 0); q.setFromEuler(eu)
    v3.set(pad.x, padY, pad.z)
    sc3.set(66, 0.5, 66)
    m4.compose(v3, q, sc3)
    if (pad.park) parkPad.setMatrixAt(ppi++, m4)
    else cityPad.setMatrixAt(cpi++, m4)
  }
  cityPad.instanceMatrix.needsUpdate = true
  parkPad.instanceMatrix.needsUpdate = true
  cityPad.receiveShadow = true; parkPad.receiveShadow = true
  scene.add(cityPad, parkPad)

  const { base: facadeMap, emissive: facadeEmissive } = facadeTextures()
  const buildingGeo = new THREE.BoxGeometry(1, 1, 1)
  buildingGeo.translate(0, 0.5, 0)
  const buildingMat = new THREE.MeshStandardMaterial({
    map: facadeMap, emissiveMap: facadeEmissive, emissive: 0xffffff,
    emissiveIntensity: 0.5, roughness: 0.82, metalness: 0.04,
  })
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x555b5e, roughness: 0.9 })
  const palette = ['#d8d2c3', '#c9bda9', '#b9c3c4', '#d9c3a9', '#aebac1', '#cbb8a2', '#b7ada0', '#c4cbc4']
  const buildings = []
  const parks = []
  for (const pad of cityPads) {
    if (pad.park) { parks.push(pad); continue }
    const sub = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
    const nSub = 1 + Math.floor(rng() * 3)
    const shuffled = sub.sort(() => rng() - 0.5).slice(0, nSub)
    for (const [sx, sz] of shuffled) {
      if (rng() < 0.12) continue
      const w = 16 + rng() * 12
      const d = 16 + rng() * 12
      const offX = sx * 15 + (rng() - 0.5) * 4
      const offZ = sz * 15 + (rng() - 0.5) * 4
      const x = pad.x + offX
      const z = pad.z + offZ
      if (Math.abs(offX) + w / 2 > 32 || Math.abs(offZ) + d / 2 > 32) continue
      const r = Math.hypot(x, z)
      const maxH = 24 + 70 * (1 - clamp(r / 400, 0, 1))
      const h = 9 + Math.pow(rng(), 2.1) * maxH
      buildings.push({ x, z, w, d, h, y: padY + 0.5, rot: 0 })
    }
  }
  const bMesh = new THREE.InstancedMesh(buildingGeo, buildingMat, buildings.length)
  const roofMesh = new THREE.InstancedMesh(buildingGeo, roofMat, buildings.length)
  const bcol = new THREE.Color()
  buildings.forEach((b, i) => {
    eu.set(0, b.rot, 0); q.setFromEuler(eu)
    v3.set(b.x, b.y, b.z)
    sc3.set(b.w, b.h, b.d)
    m4.compose(v3, q, sc3)
    bMesh.setMatrixAt(i, m4)
    bcol.set(palette[Math.floor(rng() * palette.length)])
    bcol.offsetHSL(0, 0, (rng() - 0.5) * 0.06)
    bMesh.setColorAt(i, bcol)
    v3.set(b.x, b.y + b.h, b.z)
    sc3.set(b.w + 0.7, 0.7, b.d + 0.7)
    m4.compose(v3, q, sc3)
    roofMesh.setMatrixAt(i, m4)
  })
  bMesh.instanceMatrix.needsUpdate = true
  if (bMesh.instanceColor) bMesh.instanceColor.needsUpdate = true
  roofMesh.instanceMatrix.needsUpdate = true
  bMesh.castShadow = true; bMesh.receiveShadow = true
  roofMesh.castShadow = true
  bMesh.frustumCulled = false; roofMesh.frustumCulled = false
  scene.add(bMesh, roofMesh)

  // landmark obelisk in one central park
  {
    const g = new THREE.Group()
    const baseM = new THREE.MeshStandardMaterial({ color: 0xd7d2c6, roughness: 0.7 })
    const ringM = new THREE.MeshStandardMaterial({ color: 0x2f3a3f, roughness: 0.4, metalness: 0.6 })
    const base = new THREE.Mesh(new THREE.CylinderGeometry(5, 6.4, 1.2, 20), baseM)
    base.position.y = 0.6
    const column = new THREE.Mesh(new THREE.BoxGeometry(2.4, 26, 2.4), baseM)
    column.position.y = 13.6
    const cap = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.8, 3.2), ringM)
    cap.position.y = 27
    const glow = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.5, 2.5), new THREE.MeshStandardMaterial({
      color: 0x36e6ff, emissive: 0x36e6ff, emissiveIntensity: 3,
    }))
    glow.position.y = 24.6
    g.add(base, column, cap, glow)
    g.position.set(40, padY + 0.5, 40)
    g.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true } })
    scene.add(g)
  }

  /* ---------------- street props ---------------- */
  // trees
  const treePositions = []
  for (const park of parks) {
    const count = 7 + Math.floor(rng() * 5)
    for (let i = 0; i < count; i++) {
      const x = park.x + (rng() - 0.5) * 54
      const z = park.z + (rng() - 0.5) * 54
      if (Math.abs(x - 40) < 6 && Math.abs(z - 40) < 6) continue
      treePositions.push({ x, z, y: padY + 0.5, s: 0.8 + rng() * 0.5 })
    }
  }
  let attempts = 0
  while (treePositions.length < (LOW ? 260 : 720) && attempts < 6000) {
    attempts++
    const x = (rng() - 0.5) * 1880
    const z = (rng() - 0.5) * 1880
    const r = Math.hypot(x, z)
    if (r > 920 || r < 300) continue
    const h = heightAt(x, z)
    if (h < 3.2 || h > 105) continue
    const hx = heightAt(x + 2, z) - h
    const hz = heightAt(x, z + 2) - h
    if (Math.hypot(hx, hz) > 1.4) continue
    if (nearestRoad(x, z).d < 17) continue
    treePositions.push({ x, z, y: h, s: 0.7 + rng() * 1.1 })
  }
  const trunkGeo = new THREE.CylinderGeometry(0.2, 0.34, 2.6, 5)
  trunkGeo.translate(0, 1.3, 0)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4c33, roughness: 1 })
  const trunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, treePositions.length)
  const coneGeo = new THREE.ConeGeometry(1.85, 4.4, 7)
  coneGeo.translate(0, 3.4, 0)
  const coneGeo2 = new THREE.ConeGeometry(1.3, 3.1, 7)
  coneGeo2.translate(0, 5.7, 0)
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4e7a3b, roughness: 0.95 })
  const leafMesh = new THREE.InstancedMesh(coneGeo, leafMat, treePositions.length)
  const leafMesh2 = new THREE.InstancedMesh(coneGeo2, leafMat, treePositions.length)
  const lcol = new THREE.Color()
  treePositions.forEach((t, i) => {
    eu.set(0, rng() * Math.PI * 2, 0); q.setFromEuler(eu)
    v3.set(t.x, t.y, t.z); sc3.set(t.s, t.s, t.s)
    m4.compose(v3, q, sc3)
    trunkMesh.setMatrixAt(i, m4)
    leafMesh.setMatrixAt(i, m4)
    leafMesh2.setMatrixAt(i, m4)
    lcol.setHSL(0.25 + rng() * 0.06, 0.32 + rng() * 0.2, 0.24 + rng() * 0.1)
    leafMesh.setColorAt(i, lcol)
    leafMesh2.setColorAt(i, lcol)
  })
  trunkMesh.instanceMatrix.needsUpdate = true
  leafMesh.instanceMatrix.needsUpdate = true
  leafMesh2.instanceMatrix.needsUpdate = true
  if (leafMesh.instanceColor) leafMesh.instanceColor.needsUpdate = true
  if (leafMesh2.instanceColor) leafMesh2.instanceColor.needsUpdate = true
  trunkMesh.castShadow = true; leafMesh.castShadow = true; leafMesh2.castShadow = true
  trunkMesh.frustumCulled = false; leafMesh.frustumCulled = false; leafMesh2.frustumCulled = false
  scene.add(trunkMesh, leafMesh, leafMesh2)

  // rocks
  const rockGeo = new THREE.IcosahedronGeometry(1, 0)
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x8c887d, roughness: 0.95, flatShading: true })
  const rockCount = LOW ? 60 : 190
  const rocks = new THREE.InstancedMesh(rockGeo, rockMat, rockCount)
  let ri = 0
  while (ri < rockCount && attempts < 14000) {
    attempts++
    const x = (rng() - 0.5) * 1800
    const z = (rng() - 0.5) * 1800
    const r = Math.hypot(x, z)
    if (r > 900 || r < 320) continue
    const h = heightAt(x, z)
    if (h < 2) continue
    if (nearestRoad(x, z).d < 15) continue
    const s = 0.5 + rng() * 2.6
    eu.set(rng() * 0.4, rng() * Math.PI, rng() * 0.4); q.setFromEuler(eu)
    v3.set(x, h + s * 0.25, z); sc3.set(s * (0.8 + rng() * 0.6), s * (0.5 + rng() * 0.6), s * (0.8 + rng() * 0.6))
    m4.compose(v3, q, sc3)
    rocks.setMatrixAt(ri++, m4)
  }
  rocks.count = ri
  rocks.instanceMatrix.needsUpdate = true
  rocks.castShadow = true
  rocks.frustumCulled = false
  scene.add(rocks)

  // streetlights
  const lampSpots = []
  function addLamps(road, step, bothSides) {
    const pts = road.points
    const n = pts.length
    const last = road.closed ? n : n - 1
    let acc = 0, side = 1
    for (let i = 0; i < last; i++) {
      const a = pts[i], b = pts[(i + 1) % n]
      const len = Math.hypot(b.x - a.x, b.z - a.z)
      if (acc + len > step) {
        const t = (step - acc) / len
        const x = a.x + (b.x - a.x) * t
        const z = a.z + (b.z - a.z) * t
        const yaw = Math.atan2(b.x - a.x, b.z - a.z)
        const nx = Math.cos(yaw), nz = -Math.sin(yaw)
        const off = road.width / 2 + 2.4
        lampSpots.push({ x: x + nx * off * side, z: z + nz * off * side, y: heightAt(x, z), yaw, side })
        if (bothSides) lampSpots.push({ x: x - nx * off * side, z: z - nz * off * side, y: heightAt(x, z), yaw, side: -side })
        acc = 0
        side = -side
      } else acc += len
    }
  }
  for (const road of roads) {
    if (road.kind === 'highway') addLamps(road, 58, false)
    else if (Math.abs(road.points[0].x) === 240 || Math.abs(road.points[0].z) === 240 || (road.points[0].x === 0 && road.points[0].z === 0)) {
      // city perimeter + central cross
    }
  }
  for (const road of roads) {
    if (road.kind !== 'street' || road.points.length < 3) continue
    const p0 = road.points[0]
    const isPerimeter = Math.abs(Math.abs(p0.x) - 240) < 0.1 || Math.abs(Math.abs(p0.z) - 240) < 0.1
    if (isPerimeter) addLamps(road, 62, false)
  }
  const poleGeo = new THREE.CylinderGeometry(0.11, 0.17, 6.2, 6)
  poleGeo.translate(0, 3.1, 0)
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3a3f42, roughness: 0.6, metalness: 0.5 })
  const poleMesh = new THREE.InstancedMesh(poleGeo, poleMat, lampSpots.length)
  const lampGeo = new THREE.BoxGeometry(0.55, 0.22, 1.5)
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xfff1c9, emissive: 0xffdf9a, emissiveIntensity: 1.1, roughness: 0.4,
  })
  const lampMesh = new THREE.InstancedMesh(lampGeo, lampMat, lampSpots.length)
  lampSpots.forEach((s, i) => {
    eu.set(0, s.yaw, 0); q.setFromEuler(eu)
    v3.set(s.x, s.y, s.z); sc3.set(1, 1, 1)
    m4.compose(v3, q, sc3)
    poleMesh.setMatrixAt(i, m4)
    const nx = Math.cos(s.yaw), nz = -Math.sin(s.yaw)
    v3.set(s.x - nx * s.side * 0.9, s.y + 6.1, s.z - nz * s.side * 0.9)
    m4.compose(v3, q, sc3)
    lampMesh.setMatrixAt(i, m4)
  })
  poleMesh.instanceMatrix.needsUpdate = true
  lampMesh.instanceMatrix.needsUpdate = true
  poleMesh.castShadow = true
  poleMesh.frustumCulled = false; lampMesh.frustumCulled = false
  scene.add(poleMesh, lampMesh)

  /* ---------------- checkpoints ---------------- */
  const checkpointDefs = [
    { x: 0, z: 120 }, { x: 0, z: 0 }, { x: 0, z: -240 }, { x: 0, z: -420 },
    { x: 354, z: -297 }, { x: 500, z: 0 }, { x: 354, z: 297 }, { x: 0, z: 420 },
    { x: -354, z: 297 }, { x: -500, z: 0 }, { x: -354, z: -297 }, { x: 0, z: 280, finish: true },
  ]
  const checkpoints = []
  const gateGroup = new THREE.Group()
  scene.add(gateGroup)
  const ringGeo = new THREE.TorusGeometry(5.6, 0.32, 8, 44)
  const beamGeo = new THREE.CylinderGeometry(0.28, 0.28, 16, 6, 1, true)
  checkpointDefs.forEach((cp, i) => {
    const prev = checkpointDefs[(i - 1 + checkpointDefs.length) % checkpointDefs.length]
    const next = checkpointDefs[(i + 1) % checkpointDefs.length]
    let dx = next.x - prev.x, dz = next.z - prev.z
    if (i === checkpointDefs.length - 1) { dx = 0; dz = 1 }
    if (i === 0) { dx = 0; dz = -1 }
    const yaw = Math.atan2(dx, dz)
    const y = heightAt(cp.x, cp.z) + 4.2
    const g = new THREE.Group()
    const mat = new THREE.MeshStandardMaterial({
      color: cp.finish ? 0xffb648 : 0x49e7ff,
      emissive: cp.finish ? 0xffa020 : 0x28d8ff,
      emissiveIntensity: 1.6, roughness: 0.35, metalness: 0.3,
      transparent: true, opacity: 0.95,
    })
    const ring = new THREE.Mesh(ringGeo, mat)
    ring.rotation.y = yaw
    g.add(ring)
    const glowMat = new THREE.MeshBasicMaterial({
      color: cp.finish ? 0xffb648 : 0x49e7ff, transparent: true, opacity: 0.14,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    })
    const disc = new THREE.Mesh(new THREE.CircleGeometry(5.3, 36), glowMat)
    disc.rotation.y = yaw
    g.add(disc)
    const beamMat = new THREE.MeshBasicMaterial({
      color: cp.finish ? 0xffb648 : 0x49e7ff, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
    const beam = new THREE.Mesh(beamGeo, beamMat)
    beam.position.y = 8
    g.add(beam)
    g.position.set(cp.x, y, cp.z)
    gateGroup.add(g)
    checkpoints.push({ x: cp.x, z: cp.z, y, yaw, finish: !!cp.finish, group: g, ring, mat, glowMat, beamMat })
  })

  /* ---------------- boost pads ---------------- */
  const padTex = chevronTexture()
  const boostPads = []
  const padDefs = [
    { x: 0, z: 60, yaw: Math.PI }, { x: 0, z: -60, yaw: 0 },
    { x: 240, z: 120, yaw: Math.PI / 2 }, { x: -240, z: -120, yaw: -Math.PI / 2 },
    { x: 354, z: -297, yaw: Math.PI * 0.75 }, { x: -354, z: 297, yaw: -Math.PI * 0.25 },
    { x: 0, z: 420, yaw: Math.PI }, { x: -354, z: -297, yaw: Math.PI * 0.25 },
  ]
  const padGeo2 = new THREE.PlaneGeometry(7, 13)
  padGeo2.rotateX(-Math.PI / 2)
  for (const d of padDefs) {
    const mat = new THREE.MeshBasicMaterial({
      map: padTex.clone(), transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    })
    mat.map.needsUpdate = true
    const m = new THREE.Mesh(padGeo2, mat)
    const y = heightAt(d.x, d.z) + 0.25
    m.position.set(d.x, y, d.z)
    m.rotation.y = d.yaw
    scene.add(m)
    boostPads.push({ x: d.x, z: d.z, y, yaw: d.yaw, mesh: m, mat, cooldown: 0 })
  }

  /* ---------------- orbs ---------------- */
  const orbGeo = new THREE.OctahedronGeometry(0.62, 0)
  const orbMat = new THREE.MeshStandardMaterial({
    color: 0xffd75e, emissive: 0xffb020, emissiveIntensity: 2.2,
    roughness: 0.25, metalness: 0.4,
  })
  const orbCount = 30
  const orbs = []
  const orbMesh = new THREE.InstancedMesh(orbGeo, orbMat, orbCount)
  orbMesh.frustumCulled = false
  scene.add(orbMesh)
  let oi = 0
  attempts = 0
  while (oi < orbCount && attempts < 4000) {
    attempts++
    const road = roads[Math.floor(rng() * roads.length)]
    const pts = road.points
    const idx = Math.floor(rng() * (pts.length - 1))
    const a = pts[idx], b = pts[idx + 1]
    const t = rng()
    const x = a.x + (b.x - a.x) * t
    const z = a.z + (b.z - a.z) * t
    if (Math.hypot(x, z) < 60) continue
    if (orbs.some(o => Math.hypot(o.x - x, o.z - z) < 45)) continue
    orbs.push({ x, z, y: heightAt(x, z) + 1.6, collected: false, phase: rng() * Math.PI * 2 })
    oi++
  }

  /* ---------------- traffic routes ---------------- */
  const trafficRoutes = []
  {
    // ring, two directions
    const ringRoad = roads.find(r => r.kind === 'highway')
    for (const dir of [1, -1]) {
      const pts = ringRoad.points.map(p => ({ x: p.x, z: p.z, h: p.h }))
      if (dir < 0) pts.reverse()
      trafficRoutes.push({ points: pts, closed: true, lane: dir * 4.2 })
    }
    // city perimeter loop
    const cityLoop = [
      { x: 240, z: 240 }, { x: 240, z: -240 }, { x: -240, z: -240 }, { x: -240, z: 240 },
    ].map(p => ({ ...p, h: heightAt(p.x, p.z) }))
    trafficRoutes.push({ points: cityLoop, closed: true, lane: 3.4 })
  }

  /* ---------------- minimap ---------------- */
  const minimap = minimapBaseTexture({ heightGrid, gridN: N, roads, cityPads }, 256)

  /* ---------------- animation ---------------- */
  const clock = { t: 0 }
  function update(dt, camera) {
    clock.t += dt
    waterMat.normalMap.offset.x = clock.t * 0.004
    waterMat.normalMap.offset.y = clock.t * 0.0025
    clouds.position.x = Math.sin(clock.t * 0.006) * 60
    // gates pulse
    for (const cp of checkpoints) {
      if (!cp.active) continue
      const s = 1 + Math.sin(clock.t * 3.4) * 0.045
      cp.ring.scale.set(s, s, s)
      cp.mat.emissiveIntensity = 2.2 + Math.sin(clock.t * 4.0) * 0.7
      cp.glowMat.opacity = 0.14 + Math.sin(clock.t * 3.0) * 0.05
    }
    for (const p of boostPads) {
      p.mat.map.offset.y = (clock.t * 0.55) % 1
      if (p.cooldown > 0) p.cooldown -= dt
    }
    // orbs
    orbs.forEach((o, i) => {
      if (o.collected) {
        m4.makeScale(0, 0, 0)
      } else {
        const bob = Math.sin(clock.t * 2 + o.phase) * 0.35
        eu.set(0, clock.t * 1.4 + o.phase, 0.3)
        q.setFromEuler(eu)
        v3.set(o.x, o.y + bob, o.z)
        sc3.set(1, 1, 1)
        m4.compose(v3, q, sc3)
      }
      orbMesh.setMatrixAt(i, m4)
    })
    orbMesh.instanceMatrix.needsUpdate = true
    // shadow follows player-ish
    if (camera) {
      sun.target.position.set(camera.x, 0, camera.z)
      sun.position.set(camera.x + sunDir.x * 260, sunDir.y * 260 + 60, camera.z + sunDir.z * 260)
      sun.target.updateMatrixWorld()
    }
  }

  function setActiveCheckpoint(index) {
    checkpoints.forEach((cp, i) => {
      cp.active = i === index
      const on = i === index
      cp.mat.emissiveIntensity = on ? 2.4 : 0.28
      cp.mat.opacity = on ? 1 : 0.45
      cp.glowMat.opacity = on ? 0.16 : 0.03
      cp.beamMat.opacity = on ? 0.24 : 0.04
      cp.ring.scale.set(1, 1, 1)
    })
  }

  return {
    heightAt, rawHeight, nearestRoad, isOnRoad,
    roads, segments, buildings, checkpoints, boostPads, orbs, trafficRoutes,
    cityPads, parks, heightGrid, gridN: N,
    scene, sun, hemi, sky, water, clouds,
    sunDir, gateGroup,
    minimap, update, setActiveCheckpoint,
    mapWorld: (x, z, size) => [(x + 1000) / 2000 * size, (z + 1000) / 2000 * size],
    size: SIZE,
  }
}

let rendererRef = null
export function setWorldRenderer(renderer) { rendererRef = renderer }
