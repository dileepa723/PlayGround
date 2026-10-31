import * as THREE from "three";
import { asphaltTexture, asphaltRoughness, signTexture, glowTexture, moonTexture, makeCanvasTexture, cloudTexture } from "./textures.js";

export const ROAD_HALF = 9.2;
export const LANES = [-6.7, -2.23, 2.23, 6.7];

function skyDome() {
  const geo = new THREE.SphereGeometry(1300, 32, 20);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      topColor: { value: new THREE.Color("#02030b") },
      midColor: { value: new THREE.Color("#0d0a1e") },
      horizonColor: { value: new THREE.Color("#3a1237") },
      glowColor: { value: new THREE.Color("#a1223e") },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 horizonColor;
      uniform vec3 glowColor;
      varying vec3 vDir;
      void main() {
        float h = clamp(vDir.y, -0.08, 1.0);
        vec3 col = mix(horizonColor, midColor, smoothstep(0.0, 0.24, h));
        col = mix(col, topColor, smoothstep(0.18, 0.72, h));
        float glow = exp(-abs(h - 0.012) * 17.0);
        float band = exp(-pow((h - 0.05) * 7.0, 2.0));
        col += glowColor * glow * 0.42;
        col += vec3(0.85, 0.28, 0.18) * band * 0.09;
        // faint high haze
        col += vec3(0.05, 0.07, 0.15) * smoothstep(0.55, 1.0, h) * 0.16;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return mesh;
}

function stars() {
  const count = 1600;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 0.96 + 0.03);
    const r = 980;
    const y = Math.cos(phi) * r;
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.abs(y);
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    sizes[i] = 0.8 + Math.random() * 2.6;
    const warm = Math.random() < 0.14;
    colors[i * 3] = warm ? 1.0 : 0.75 + Math.random() * 0.2;
    colors[i * 3 + 1] = warm ? 0.82 : 0.8 + Math.random() * 0.18;
    colors[i * 3 + 2] = warm ? 0.62 : 1.0;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float aSize;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform float uTime;
      void main() {
        vColor = aColor;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.72 + 0.28 * sin(uTime * 1.7 + position.x * 0.07 + position.z * 0.03);
        gl_PointSize = aSize * twinkle * 1.5;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(vColor, a);
      }
    `,
  });
  const p = new THREE.Points(geo, mat);
  p.frustumCulled = false;
  p.renderOrder = -9;
  return { points: p, mat };
}

function moon() {
  const mat = new THREE.SpriteMaterial({
    map: moonTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.position.set(190, 245, -830);
  sprite.scale.set(130, 130, 1);
  return sprite;
}

function mountainRange(z, width, height, color, seed = 1) {
  const points = [];
  const segments = 26;
  let rnd = seed;
  const rand = () => {
    rnd = (rnd * 9301 + 49297) % 233280;
    return rnd / 233280;
  };
  for (let i = 0; i <= segments; i++) {
    const x = -width / 2 + (i / segments) * width;
    const peak = height * (0.25 + rand() * 0.75) * (0.5 + 0.5 * Math.sin((i / segments) * Math.PI));
    points.push([x, peak]);
  }
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, -6);
  for (const [x, y] of points) shape.lineTo(x, y);
  shape.lineTo(width / 2, -6);
  shape.closePath();
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape, 1),
    new THREE.MeshBasicMaterial({ color, fog: true, side: THREE.DoubleSide })
  );
  mesh.position.set(0, 0, z);
  return mesh;
}

function city() {
  const group = new THREE.Group();
  const tex = makeCanvasTexture(
    128,
    256,
    (g, w, h) => {
      g.fillStyle = "#07060d";
      g.fillRect(0, 0, w, h);
      for (let y = 8; y < h - 4; y += 12) {
        for (let x = 6; x < w - 4; x += 10) {
          if (Math.random() < 0.34) {
            const warm = Math.random() < 0.72;
            g.fillStyle = warm
              ? `rgba(255,${170 + Math.random() * 60},${80 + Math.random() * 60},${0.5 + Math.random() * 0.5})`
              : `rgba(${120 + Math.random() * 60},${200 + Math.random() * 50},255,${0.5 + Math.random() * 0.5})`;
            g.fillRect(x, y, 4, 5);
          }
        }
      }
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(30,16,48,0.15)");
      grad.addColorStop(1, "rgba(70,20,60,0.4)");
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
    },
    { srgb: true }
  );
  const mat = new THREE.MeshBasicMaterial({ map: tex, fog: true, color: "#b9a7d8" });
  const count = 38;
  const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat, count);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  for (let i = 0; i < count; i++) {
    const x = -330 + (i / count) * 660 + (Math.random() - 0.5) * 18;
    const w = 12 + Math.random() * 26;
    const h = 24 + Math.random() * 130;
    const d = 12 + Math.random() * 20;
    m.compose(new THREE.Vector3(x, h / 2 - 4, -640 - Math.random() * 80), q, new THREE.Vector3(w, h, d));
    inst.setMatrixAt(i, m);
  }
  inst.instanceMatrix.needsUpdate = true;
  group.add(inst);
  return group;
}

class Scroller {
  constructor(span) {
    this.span = span;
    this.items = [];
  }
  add(obj) {
    this.items.push(obj);
    return obj;
  }
  update(speed, dt) {
    const dz = speed * dt;
    for (const it of this.items) {
      it.position.z += dz;
      if (it.position.z > 70) it.position.z -= this.span;
    }
  }
}

function streetlight(side) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: "#2a2d35", roughness: 0.55, metalness: 0.65 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 8.6, 8), poleMat);
  pole.position.y = 4.2;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.1, 0.12), poleMat);
  arm.position.set(side * -1.3, 8.4, 0);
  g.add(arm);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.4), poleMat);
  head.position.set(side * -2.62, 8.33, 0);
  g.add(head);
  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.05, 0.3),
    new THREE.MeshBasicMaterial({ color: "#ffd9a3", toneMapped: false })
  );
  lamp.position.set(side * -2.62, 8.22, 0);
  g.add(lamp);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture(), color: "#ffb968", transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  halo.position.set(side * -2.62, 8.2, 0);
  halo.scale.set(5.5, 5.5, 1);
  g.add(halo);
  // pool of light on the asphalt
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(17, 15),
    new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#ffb25c", transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(side * -2.6, 0.02, 0);
  g.add(pool);
  g.position.x = side * 12.6;
  return g;
}

function gantry(signTex) {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: "#23262f", roughness: 0.55, metalness: 0.7 });
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.36, 9, 0.36), metal);
    post.position.set(side * 12.4, 4.5, 0);
    g.add(post);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(25.2, 0.6, 0.5), metal);
  beam.position.y = 8.4;
  g.add(beam);
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(8.2, 4.1),
    new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false })
  );
  sign.position.set(0, 6.1, 0.3);
  g.add(sign);
  const back = new THREE.Mesh(new THREE.BoxGeometry(8.4, 4.3, 0.2), metal);
  back.position.set(0, 6.1, 0.14);
  g.add(back);
  const lamp = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.08, 0.16),
    new THREE.MeshBasicMaterial({ color: "#ffe0aa", toneMapped: false })
  );
  lamp.position.set(0, 8.2, 0);
  g.add(lamp);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture(), color: "#ffb968", transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  halo.position.set(0, 8.15, 0);
  halo.scale.set(7, 3, 1);
  g.add(halo);
  return g;
}

function overpass() {
  const g = new THREE.Group();
  const concrete = new THREE.MeshStandardMaterial({ color: "#2a2730", roughness: 0.9, metalness: 0.05 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(42, 1.3, 8.5), concrete);
  deck.position.y = 10.2;
  g.add(deck);
  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 9.6, 2.4), concrete);
    pillar.position.set(side * 14.5, 4.8, 0);
    g.add(pillar);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(42, 0.9, 0.35), concrete);
    rail.position.set(0, 11.15, side * 4.1);
    g.add(rail);
  }
  for (const x of [-10, -4, 4, 10]) {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.3), new THREE.MeshBasicMaterial({ color: "#9ff2ff", toneMapped: false }));
    lamp.position.set(x, 9.5, 2.4);
    g.add(lamp);
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture(), color: "#7fe8ff", transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    halo.position.set(x, 9.45, 2.4);
    halo.scale.set(3.4, 1.4, 1);
    g.add(halo);
  }
  return g;
}

function cactus() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: "#18221c", roughness: 0.9, metalness: 0.02 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 3.4, 7), mat);
  trunk.position.y = 1.7;
  g.add(trunk);
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 1.5, 6), mat);
  arm1.position.set(0.42, 2.2, 0);
  arm1.rotation.z = -0.9;
  g.add(arm1);
  const arm1b = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.1, 6), mat);
  arm1b.position.set(0.76, 2.75, 0);
  g.add(arm1b);
  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 1.2, 6), mat);
  arm2.position.set(-0.38, 1.7, 0);
  arm2.rotation.z = 0.95;
  g.add(arm2);
  return g;
}

export class World {
  constructor(scene) {
    this.scene = scene;
    this.time = 0;
    this.span = 640;
    this.scroller = new Scroller(this.span);
    this.roadTex = asphaltTexture().clone();
    this.roadRough = asphaltRoughness().clone();
    this.roadTex.wrapS = THREE.RepeatWrapping;
    this.roadTex.wrapT = THREE.RepeatWrapping;
    this.roadTex.repeat.set(1, 46);
    this.roadRough.repeat.set(1, 46);
    this.roadTex.needsUpdate = true;
    this.roadRough.needsUpdate = true;

    this._buildSky();
    this._buildGround();
    this._buildRoad();
    this._buildRail();
    this._buildLights();
    this._buildSigns();
    this._buildScenery();
    this._buildDistant();
    this._buildTitleBackdrop();
  }

  _buildSky() {
    this.sky = skyDome();
    this.scene.add(this.sky);
    const s = stars();
    this.stars = s.points;
    this.starMat = s.mat;
    this.scene.add(this.stars);
    this.moon = moon();
    this.scene.add(this.moon);
  }

  _buildGround() {
    const tex = makeCanvasTexture(
      256,
      256,
      (g, w, h) => {
        g.fillStyle = "#0d0a12";
        g.fillRect(0, 0, w, h);
        for (let i = 0; i < 2600; i++) {
          const v = Math.random();
          g.fillStyle = v < 0.7 ? `rgba(40,32,52,${0.25 + Math.random() * 0.4})` : `rgba(90,74,60,${0.12 + Math.random() * 0.2})`;
          const s = Math.random() < 0.9 ? 1 : 2;
          g.fillRect(Math.random() * w, Math.random() * h, s, s);
        }
      },
      { repeat: true, srgb: true }
    );
    tex.repeat.set(90, 90);
    const mat = new THREE.MeshStandardMaterial({ map: tex, color: "#6b5c78", roughness: 1, metalness: 0 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), mat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.04;
    ground.position.z = -700;
    this.scene.add(ground);

    // shoulders
    const shoulderMat = new THREE.MeshStandardMaterial({ color: "#18151d", roughness: 0.95 });
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Mesh(new THREE.PlaneGeometry(6, 1600), shoulderMat);
      shoulder.rotation.x = -Math.PI / 2;
      shoulder.position.set(side * 12.2, 0.005, -700);
      this.scene.add(shoulder);
    }
  }

  _buildRoad() {
    const mat = new THREE.MeshStandardMaterial({
      map: this.roadTex,
      roughnessMap: this.roadRough,
      roughness: 0.62,
      metalness: 0.34,
      color: "#cfd4df",
    });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(18.4, 1600, 1, 1), mat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -700;
    road.receiveShadow = false;
    this.scene.add(road);
    this.road = road;
    this.roadMat = mat;
  }

  _buildRail() {
    const railMat = new THREE.MeshStandardMaterial({ color: "#3a3f4b", roughness: 0.4, metalness: 0.9 });
    const postMat = new THREE.MeshStandardMaterial({ color: "#262a33", roughness: 0.6, metalness: 0.7 });
    const count = 160;
    this.rails = new THREE.InstancedMesh(new THREE.BoxGeometry(8.05, 0.3, 0.09), railMat, count);
    this.posts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.09, 0.85, 0.09), postMat, count);
    const reflMat = new THREE.MeshBasicMaterial({ color: "#ffb648", toneMapped: false });
    this.reflectors = new THREE.InstancedMesh(new THREE.BoxGeometry(0.13, 0.11, 0.05), reflMat, count);
    this.railData = [];
    const spacing = 8;
    let idx = 0;
    for (const side of [-1, 1]) {
      for (let i = 0; i < count / 2; i++) {
        this.railData.push({ x: side * 10.35, z: 60 - i * spacing, side, phase: i });
        idx++;
      }
    }
    this.scene.add(this.rails, this.posts, this.reflectors);
    this._updateRails(0, true);
  }

  _updateRails() {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3(1, 1, 1);
    this.railData.forEach((d, i) => {
      m.compose(new THREE.Vector3(d.x, 0.72, d.z), q, s);
      this.rails.setMatrixAt(i, m);
      m.compose(new THREE.Vector3(d.x, 0.42, d.z), q, s);
      this.posts.setMatrixAt(i, m);
      e.set(0, 0, 0);
      q.setFromEuler(e);
      m.compose(new THREE.Vector3(d.x, 0.92, d.z + 2), q, s);
      this.reflectors.setMatrixAt(i, m);
    });
    this.rails.instanceMatrix.needsUpdate = true;
    this.posts.instanceMatrix.needsUpdate = true;
    this.reflectors.instanceMatrix.needsUpdate = true;
    q.identity();
  }

  _buildLights() {
    this.lights = [];
    const spacing = 56;
    for (let i = 0; i < 12; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const light = streetlight(side);
      light.position.z = 40 - i * spacing;
      this.scene.add(light);
      this.lights.push(light);
    }
  }

  _buildSigns() {
    this.gantries = [];
    const defs = [
      ["LAS VEGAS", "61 · KNIGHT FOUNDATION TEST RANGE", "#ffb648"],
      ["SECTOR 7", "AUTHORIZED PURSUIT VEHICLES ONLY", "#ff2438"],
      ["MOJAVE 42", "K.I.T.T. PROVING GROUNDS · NEXT EXIT", "#7fe8ff"],
      ["NO SERVICES", "NEXT FUEL 118 MILES", "#ffb648"],
    ];
    for (let i = 0; i < 4; i++) {
      const tex = signTexture(defs[i][0], defs[i][1], defs[i][2]);
      const g = gantry(tex);
      g.name = `gantry-${i}`;
      g.position.z = -40 - i * 170;
      this.scene.add(g);
      this.gantries.push(g);
    }
    this.overpasses = [];
    for (let i = 0; i < 2; i++) {
      const op = overpass();
      op.name = `overpass-${i}`;
      op.position.z = -160 - i * 300;
      this.scene.add(op);
      this.overpasses.push(op);
    }
  }

  _buildScenery() {
    this.cacti = [];
    for (let i = 0; i < 10; i++) {
      const c = cactus();
      const side = i % 2 === 0 ? 1 : -1;
      c.position.set(side * (16 + Math.random() * 10), 0, 40 - i * 62);
      c.rotation.y = Math.random() * Math.PI;
      c.scale.setScalar(0.8 + Math.random() * 0.7);
      this.scene.add(c);
      this.cacti.push(c);
    }
    const rockMat = new THREE.MeshStandardMaterial({ color: "#241d2b", roughness: 0.95, flatShading: true });
    this.rocks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.1, 0), rockMat, 90);
    this.rockData = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    for (let i = 0; i < 90; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const z = 60 - (i / 90) * this.span;
      const x = side * (15 + Math.random() * 50);
      const scale = 0.5 + Math.random() * 2.4;
      q.setFromEuler(new THREE.Euler(Math.random(), Math.random() * Math.PI, Math.random()));
      m.compose(new THREE.Vector3(x, scale * 0.3 - 0.1, z), q, new THREE.Vector3(scale, scale * (0.6 + Math.random() * 0.7), scale));
      this.rocks.setMatrixAt(i, m);
      this.rockData.push({ x, z, scale, rx: Math.random(), ry: Math.random() * Math.PI, rz: Math.random() });
    }
    this.rocks.instanceMatrix.needsUpdate = true;
    this.scene.add(this.rocks);
  }

  _buildDistant() {
    const mount1 = mountainRange(-560, 1500, 120, "#1a1128", 7);
    mount1.position.y = 0;
    this.scene.add(mount1);
    const mount2 = mountainRange(-680, 1800, 190, "#130c1e", 21);
    this.scene.add(mount2);
    this.scene.add(city());

    const glowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1200, 120),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#7d2450", transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    glowPlane.position.set(0, 30, -720);
    this.scene.add(glowPlane);
  }

  _buildTitleBackdrop() {
    // This scenery sits behind the car for the attract/title camera, which looks
    // back up the highway. It is never visible in the chase view.
    const group = new THREE.Group();
    const far = new THREE.Vector3(0, 0, 0);

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1100, 460),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#8f2248", transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    glow.position.set(80, 150, 980);
    group.add(glow);

    const sun = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: moonTexture(), color: "#ffb4bc", transparent: true, opacity: 0.85, depthWrite: false, fog: false })
    );
    sun.position.set(330, 205, 940);
    sun.scale.set(230, 230, 1);
    group.add(sun);

    const clouds = [];
    for (let i = 0; i < 5; i++) {
      const cloud = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: cloudTexture(),
          color: i % 2 ? "#6a2148" : "#3a1a48",
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
          fog: false,
        })
      );
      cloud.position.set(-360 + i * 220, 210 + Math.sin(i * 1.7) * 45, 900 - i * 18);
      cloud.scale.set(430, 120, 1);
      group.add(cloud);
      clouds.push(cloud);
    }

    const m1 = mountainRange(930, 1600, 140, "#1d0e26", 11);
    m1.rotation.y = Math.PI;
    m1.material.fog = false;
    group.add(m1);
    const m2 = mountainRange(1010, 2000, 200, "#130a1c", 29);
    m2.rotation.y = Math.PI;
    m2.material.fog = false;
    group.add(m2);

    // roadside neon arch on the title side
    const neon = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({ color: "#1a1c24", roughness: 0.5, metalness: 0.7 });
    for (const x of [-13, 13]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 9, 0.5), postMat);
      post.position.set(x, 4.5, 0);
      neon.add(post);
    }
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(10.5, 0.16, 0.2),
      new THREE.MeshBasicMaterial({ color: "#ff2438", toneMapped: false })
    );
    bar.position.set(0, 8.1, 0);
    neon.add(bar);
    const barHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture(), color: "#ff2438", transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    barHalo.position.set(0, 8.1, 0);
    barHalo.scale.set(14, 4, 1);
    neon.add(barHalo);
    neon.position.set(30, 0, 760);
    group.add(neon);

    this.titleBackdrop = group;
    this.scene.add(group);
    this.titleClouds = clouds;
  }

  update(dt, speed) {
    this.time += dt;
    this.starMat.uniforms.uTime.value = this.time;
    if (this.titleClouds) {
      for (let i = 0; i < this.titleClouds.length; i++) {
        this.titleClouds[i].position.x += dt * (1.2 + i * 0.4);
        if (this.titleClouds[i].position.x > 560) this.titleClouds[i].position.x = -520;
      }
    }
    this.roadTex.offset.y += (speed * dt) / 32;
    this.roadRough.offset.y += (speed * dt) / 32;

    this.scroller.update(speed, dt);
    for (const l of this.lights) {
      l.position.z += speed * dt;
      if (l.position.z > 70) l.position.z -= 12 * 56;
    }
    for (const g of this.gantries) {
      g.position.z += speed * dt;
      if (g.position.z > 90) g.position.z -= 4 * 170;
    }
    for (const o of this.overpasses) {
      o.position.z += speed * dt;
      if (o.position.z > 90) o.position.z -= 2 * 300;
    }
    for (const c of this.cacti) {
      c.position.z += speed * dt;
      if (c.position.z > 70) c.position.z -= 10 * 62;
    }
    for (const d of this.railData) {
      d.z += speed * dt;
      if (d.z > 70) d.z -= (this.railData.length / 2) * 8;
    }
    this._updateRails();

    // rocks scroll via instancing
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    for (let i = 0; i < this.rockData.length; i++) {
      const d = this.rockData[i];
      d.z += speed * dt;
      if (d.z > 70) d.z -= this.span;
      e.set(d.rx, d.ry, d.rz);
      q.setFromEuler(e);
      m.compose(
        new THREE.Vector3(d.x, d.scale * 0.3 - 0.1, d.z),
        q,
        new THREE.Vector3(d.scale, d.scale * (0.6 + ((i * 37) % 10) * 0.07), d.scale)
      );
      this.rocks.setMatrixAt(i, m);
    }
    this.rocks.instanceMatrix.needsUpdate = true;
  }
}
