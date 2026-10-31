import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { glowTexture, shadowTexture, plateTexture } from "./textures.js";

const tireMaterial = new THREE.MeshStandardMaterial({ color: "#08090c", roughness: 0.94, metalness: 0.02 });
const rimMaterial = new THREE.MeshStandardMaterial({ color: "#9aa3b3", roughness: 0.28, metalness: 0.95 });
const wheelGeometryCache = new Map();

function wedgeGeometry(w, h, l, { frontDrop = 0.22, topFrontScale = 0.9, bottomFrontScale = 0.88 } = {}) {
  const geo = new THREE.BoxGeometry(w, h, l, 1, 1, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    const z = pos.getZ(i);
    const t = Math.min(1, Math.max(0, (z + l / 2) / l)); // 0 at front, 1 at rear
    if (y > 0) {
      y -= frontDrop * Math.pow(1 - t, 1.35);
      x *= topFrontScale + (1 - topFrontScale) * t;
    } else {
      x *= bottomFrontScale + (1 - bottomFrontScale) * t;
    }
    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

function cabinGeometry(w, h, l) {
  const geo = new THREE.BoxGeometry(w, h, l, 1, 1, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    if (y > 0) {
      x *= 0.8;
      z += l * 0.18;
    } else {
      x *= 1;
      z -= l * 0.03;
    }
    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

function wheelGeometry(r, width) {
  const key = `${r.toFixed(3)}:${width.toFixed(3)}`;
  if (wheelGeometryCache.has(key)) return wheelGeometryCache.get(key);

  const tireParts = [new THREE.CylinderGeometry(r, r, width, 22).rotateZ(Math.PI / 2)];
  const rimParts = [];
  for (const side of [-1, 1]) {
    tireParts.push(
      new THREE.TorusGeometry(r * 0.9, r * 0.09, 5, 18)
        .rotateY(Math.PI / 2)
        .translate(side * width * 0.5, 0, 0)
    );
    rimParts.push(
      new THREE.TorusGeometry(r * 0.58, r * 0.045, 5, 18)
        .rotateY(Math.PI / 2)
        .translate(side * (width * 0.5 + 0.012), 0, 0),
      new THREE.CylinderGeometry(r * 0.15, r * 0.15, width * 0.36, 10)
        .rotateZ(Math.PI / 2)
        .translate(side * (width * 0.5 + 0.01), 0, 0)
    );
    for (let i = 0; i < 5; i++) {
      rimParts.push(
        new THREE.BoxGeometry(0.028, r * 0.78, r * 0.09)
          .rotateX((i / 5) * Math.PI * 2)
          .translate(side * (width * 0.5 + 0.006), 0, 0)
      );
    }
  }
  tireParts.push(new THREE.CylinderGeometry(r * 0.44, r * 0.44, width * 0.3, 14).rotateZ(Math.PI / 2));

  const geo = {
    tire: mergeGeometries(tireParts),
    rim: mergeGeometries(rimParts),
  };
  for (const g of tireParts) g.dispose?.();
  for (const g of rimParts) g.dispose?.();
  wheelGeometryCache.set(key, geo);
  return geo;
}

function wheel(r = 0.35, width = 0.3) {
  const g = new THREE.Group();
  const geo = wheelGeometry(r, width);
  g.add(new THREE.Mesh(geo.tire, tireMaterial));
  g.add(new THREE.Mesh(geo.rim, rimMaterial));
  return g;
}

function loftGeometry(sections, six = false) {
  const verts = [];
  const idx = [];
  const P = six ? 6 : 4;
  for (const sec of sections) {
    if (six) {
      const midY = sec.bottom + (sec.top - sec.bottom) * 0.52;
      verts.push(
        -sec.w / 2, sec.bottom, sec.z,
        -sec.w * 0.492, midY, sec.z,
        -sec.w * 0.425, sec.top, sec.z,
        sec.w * 0.425, sec.top, sec.z,
        sec.w * 0.492, midY, sec.z,
        sec.w / 2, sec.bottom, sec.z
      );
    } else {
      verts.push(
        -sec.w / 2, sec.bottom, sec.z,
        -sec.w * 0.44, sec.top, sec.z,
        sec.w * 0.44, sec.top, sec.z,
        sec.w / 2, sec.bottom, sec.z
      );
    }
  }
  const n = sections.length;
  for (let i = 0; i < n - 1; i++) {
    for (let a = 0; a < P; a++) {
      const b = (a + 1) % P;
      const a0 = i * P + a;
      const a1 = i * P + b;
      const b0 = (i + 1) * P + a;
      const b1 = (i + 1) * P + b;
      idx.push(a0, b0, b1, a0, b1, a1);
    }
  }
  const last = (n - 1) * P;
  for (let a = 1; a < P - 1; a++) {
    idx.push(0, a, a + 1);
    idx.push(last, last + a + 1, last + a);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function arch() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: "#0a0b10", roughness: 0.45, metalness: 0.5 });
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.055, 6, 18, Math.PI), mat);
  arc.rotation.y = Math.PI / 2;
  arc.rotation.z = Math.PI;
  g.add(arc);
  return g;
}

function blobShadow(w, l, opacity = 0.85) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, l),
    new THREE.MeshBasicMaterial({
      map: shadowTexture(),
      transparent: true,
      opacity,
      depthWrite: false,
      color: "#000000",
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.015;
  mesh.renderOrder = 1;
  return mesh;
}

export function buildKitt() {
  const group = new THREE.Group();
  group.name = "KITT";

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: "#12151f",
    roughness: 0.3,
    metalness: 0.52,
    clearcoat: 1,
    clearcoatRoughness: 0.07,
    envMapIntensity: 1.4,
  });
  const trimMat = new THREE.MeshStandardMaterial({ color: "#0a0b10", roughness: 0.42, metalness: 0.62 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#132437",
    roughness: 0.06,
    metalness: 0.72,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.96,
    envMapIntensity: 1.25,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: "#c99a3c",
    emissive: new THREE.Color("#4a2f08"),
    emissiveIntensity: 0.4,
    metalness: 0.95,
    roughness: 0.3,
  });

  // Sculpted wedge body
  const body = new THREE.Mesh(
    loftGeometry([
      { z: -2.5, w: 1.6, bottom: 0.36, top: 0.6 },
      { z: -2.18, w: 1.88, bottom: 0.32, top: 0.71 },
      { z: -1.25, w: 2.0, bottom: 0.29, top: 0.81 },
      { z: -0.5, w: 2.04, bottom: 0.28, top: 0.845 },
      { z: 0.9, w: 2.04, bottom: 0.28, top: 0.86 },
      { z: 2.1, w: 2.0, bottom: 0.3, top: 0.88 },
      { z: 2.46, w: 1.9, bottom: 0.37, top: 0.85 },
    ], true),
    bodyMat
  );
  group.add(body);

  // Lower rocker panels
  for (const side of [-1, 1]) {
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.16, 2.9), trimMat);
    skirt.position.set(side * 1.0, 0.27, 0.1);
    group.add(skirt);
  }

  // Front and rear bumper lips
  const frontLip = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.15, 0.22), trimMat);
  frontLip.position.set(0, 0.32, -2.47);
  group.add(frontLip);
  const rearLip = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.17, 0.2), trimMat);
  rearLip.position.set(0, 0.34, 2.47);
  group.add(rearLip);

  // Hood center panel
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.025, 1.55), bodyMat);
  hood.position.set(0, 0.825, -1.35);
  hood.rotation.x = 0.045;
  group.add(hood);

  // Wheel arches
  for (const [x, z] of [[-1.015, -1.55], [1.015, -1.55], [-1.015, 1.55], [1.015, 1.55]]) {
    const a = arch();
    a.position.set(x, 0.35, z);
    group.add(a);
  }

  // Greenhouse
  const cabin = new THREE.Mesh(
    loftGeometry([
      { z: -0.68, w: 1.56, bottom: 0.84, top: 0.85 },
      { z: 0.04, w: 1.52, bottom: 0.84, top: 1.29 },
      { z: 0.98, w: 1.5, bottom: 0.84, top: 1.3 },
      { z: 1.5, w: 1.6, bottom: 0.84, top: 0.9 },
    ]),
    glassMat
  );
  group.add(cabin);

  // Sloped rear hatch glass (the Trans Am fastback)
  const hatchMat = new THREE.MeshPhysicalMaterial({
    color: "#1a2f44",
    roughness: 0.08,
    metalness: 0.7,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.6,
  });
  const hatch = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.025, 1.28), hatchMat);
  hatch.position.set(0, 1.085, 1.53);
  hatch.rotation.x = 0.33;
  group.add(hatch);
  // Rear-window louvers — K.I.T.T.'s signature slatted hatch
  const louverMat = new THREE.MeshStandardMaterial({ color: "#0b0c12", roughness: 0.4, metalness: 0.55 });
  for (let i = 0; i < 6; i++) {
    const t = i / 5;
    const louver = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.028, 0.075), louverMat);
    louver.position.set(0, 1.285 - t * 0.38 + 0.02, 1.0 + t * 1.0);
    louver.rotation.x = 0.33;
    group.add(louver);
  }
  for (const side of [-1, 1]) {
    const sail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.4, 1.02), bodyMat);
    sail.position.set(side * 0.74, 1.09, 1.52);
    sail.rotation.x = 0.33;
    group.add(sail);
    // Rear quarter glass
    const quarter = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.27, 0.82), hatchMat);
    quarter.position.set(side * 0.755, 1.06, 1.12);
    quarter.rotation.x = 0.27;
    group.add(quarter);
    const quarterTrim = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.018, 0.86), trimMat);
    quarterTrim.position.set(side * 0.768, 1.2, 1.1);
    quarterTrim.rotation.x = 0.27;
    group.add(quarterTrim);
  }

  // T-top spine and panels
  const roof = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.055, 1.06), bodyMat);
  roof.position.set(0, 1.322, 0.5);
  group.add(roof);
  for (const side of [-1, 1]) {
    const ttop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.98), glassMat);
    ttop.position.set(side * 0.45, 1.31, 0.48);
    group.add(ttop);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 1.02), trimMat);
    rail.position.set(side * 0.69, 1.31, 0.48);
    group.add(rail);
  }

  // A, B and C pillars
  for (const side of [-1, 1]) {
    const aPillar = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.68), trimMat);
    aPillar.position.set(side * 0.73, 1.06, -0.32);
    aPillar.rotation.x = -0.62;
    group.add(aPillar);
    const bPillar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.09), trimMat);
    bPillar.position.set(side * 0.73, 1.07, 0.98);
    group.add(bPillar);
  }

  // Rear deck and spoiler
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.022, 1.24), bodyMat);
  deck.position.set(0, 0.878, 1.72);
  group.add(deck);
  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.05, 0.26), trimMat);
  spoiler.position.set(0, 0.975, 2.34);
  spoiler.rotation.x = -0.08;
  group.add(spoiler);
  for (const side of [-1, 1]) {
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.18, 0.36), trimMat);
    plate.position.set(side * 0.96, 0.955, 2.36);
    group.add(plate);
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.19, 0.1), trimMat);
    strut.position.set(side * 0.64, 0.94, 2.37);
    group.add(strut);
    const tailPipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.16, 10, 1, true),
      new THREE.MeshStandardMaterial({ color: "#aab2c0", roughness: 0.3, metalness: 0.95 })
    );
    tailPipe.rotation.x = Math.PI / 2;
    tailPipe.position.set(side * 0.55, 0.3, 2.56);
    group.add(tailPipe);
  }

  // Gold pinstripes
  for (const side of [-1, 1]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.018, 4.1), goldMat);
    stripe.position.set(side * 1.017, 0.76, 0.02);
    group.add(stripe);
    const lowStripe = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.01, 3.5), goldMat);
    lowStripe.position.set(side * 1.011, 0.45, 0.06);
    group.add(lowStripe);
  }
  for (const side of [-1, 1]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.008, 1.5), goldMat);
    stripe.position.set(side * 0.56, 0.833, -1.35);
    stripe.rotation.x = 0.045;
    group.add(stripe);

    // Door mirror
    const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, 0.035), trimMat);
    mirrorArm.position.set(side * 1.01, 0.95, -0.48);
    group.add(mirrorArm);
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.09, 0.19), bodyMat);
    mirror.position.set(side * 1.08, 0.97, -0.44);
    group.add(mirror);

    // Door shut line
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.38, 0.012), new THREE.MeshBasicMaterial({ color: "#030305" }));
    seam.position.set(side * 1.02, 0.63, 0.18);
    group.add(seam);

    // Side markers
    const frontMarker = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.045, 0.09), new THREE.MeshBasicMaterial({ color: "#ff9e2c", toneMapped: false }));
    frontMarker.position.set(side * 1.02, 0.54, -2.0);
    group.add(frontMarker);
    const rearMarker = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.045, 0.09), new THREE.MeshBasicMaterial({ color: "#ff2334", toneMapped: false }));
    rearMarker.position.set(side * 1.02, 0.54, 2.08);
    group.add(rearMarker);
  }

  // Scanner housing + segments
  const scannerGroup = new THREE.Group();
  scannerGroup.position.set(0, 0.535, -2.53);
  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(1.24, 0.165, 0.1),
    new THREE.MeshStandardMaterial({ color: "#040506", roughness: 0.35, metalness: 0.55 })
  );
  scannerGroup.add(housing);
  const segments = [];
  const segW = 0.108;
  const segGap = 0.024;
  const total = 8 * segW + 7 * segGap;
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: "#ff1428", toneMapped: false });
    const seg = new THREE.Mesh(new THREE.BoxGeometry(segW, 0.08, 0.045), mat);
    seg.position.x = -total / 2 + segW / 2 + i * (segW + segGap);
    seg.position.z = -0.05;
    segments.push(seg);
    scannerGroup.add(seg);
  }
  const scannerGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.66),
    new THREE.MeshBasicMaterial({
      map: glowTexture(),
      color: "#ff2030",
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    })
  );
  scannerGlow.position.set(0, 0, -0.12);
  scannerGlow.rotation.y = Math.PI;
  scannerGroup.add(scannerGlow);
  const scannerLight = new THREE.PointLight("#ff1528", 5, 8, 2);
  scannerLight.position.set(0, 0.02, -0.4);
  scannerGroup.add(scannerLight);
  group.add(scannerGroup);

  // Four headlights + indicators
  const headlights = [];
  const headMat = new THREE.MeshBasicMaterial({ color: "#6b7d96", toneMapped: true });
  for (const x of [-0.7, -0.4, 0.4, 0.7]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.03), headMat);
    hl.position.set(x, 0.42, -2.535);
    group.add(hl);
    headlights.push(hl);
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.28),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#cfe4ff", transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    );
    halo.position.set(x, 0.42, -2.56);
    halo.rotation.y = Math.PI;
    group.add(halo);
  }
  for (const side of [-1, 1]) {
    const spot = new THREE.SpotLight("#cfe4ff", 5.2, 32, 0.26, 0.92, 1.8);
    spot.position.set(side * 0.62, 0.42, -2.48);
    spot.target.position.set(side * 1.05, -0.55, -24);
    group.add(spot, spot.target);
  }
  const indicatorMat = new THREE.MeshBasicMaterial({ color: "#ff9e2c", toneMapped: false });
  for (const side of [-1, 1]) {
    const ind = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.055, 0.02), indicatorMat);
    ind.position.set(side * 0.86, 0.42, -2.53);
    group.add(ind);
  }

  // Tail light panel
  const tailPanel = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.3, 0.035), trimMat);
  tailPanel.position.set(0, 0.68, 2.48);
  group.add(tailPanel);
  const brakeBars = [];
  const brakeGlows = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: "#8e0712", toneMapped: false });
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.045, 0.02), mat);
      bar.position.set(side * 0.48, 0.6 + i * 0.075, 2.505);
      group.add(bar);
      brakeBars.push(bar);
    }
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(0.82, 0.4),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#ff1a2e", transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    );
    halo.position.set(side * 0.48, 0.68, 2.52);
    group.add(halo);
    brakeGlows.push(halo);
  }

  // License plate
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.48, 0.24),
    new THREE.MeshStandardMaterial({ map: plateTexture("KITT"), roughness: 0.6, metalness: 0.1 })
  );
  plate.position.set(0, 0.4, 2.49);
  group.add(plate);

  // Wheels
  const wheels = [];
  const frontSteer = [];
  const wheelPositions = [
    [-0.93, 0.35, -1.55, true],
    [0.93, 0.35, -1.55, true],
    [-0.93, 0.35, 1.55, false],
    [0.93, 0.35, 1.55, false],
  ];
  for (const [x, y, z, front] of wheelPositions) {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, z);
    const w = wheel(0.35, 0.3);
    pivot.add(w);
    group.add(pivot);
    wheels.push({ pivot, mesh: w, front });
    if (front) frontSteer.push(pivot);
  }

  // Exhaust flames
  const exhaust = new THREE.Group();
  for (const side of [-1, 1]) {
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.07, 0.6, 8),
      new THREE.MeshBasicMaterial({
        color: "#ff8a2a",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    );
    flame.rotation.x = Math.PI / 2;
    flame.position.set(side * 0.55, 0.3, 2.7);
    exhaust.add(flame);
  }
  group.add(exhaust);

  // Underbody glow + shadow
  const underglow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 6.2),
    new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#c40012", transparent: true, opacity: 0.055, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  underglow.scale.set(0.82, 0.82, 1);
  underglow.rotation.x = -Math.PI / 2;
  underglow.position.y = 0.02;
  group.add(underglow);
  const shadow = blobShadow(2.8, 6.0, 0.9);
  group.add(shadow);

  return {
    group,
    bodyMat,
    glassMat,
    segments,
    scannerGlow,
    scannerLight,
    headlights,
    brakeBars,
    brakeGlows,
    wheels,
    frontSteer,
    exhaust,
    scannerGroup,
    speed: 0,
  };
}

export function updateKitt(kitt, dt, { speed = 0, steer = 0, braking = false, boost = false, time = 0, airborne = false }) {
  const speedNorm = Math.min(1, Math.abs(speed) / 90);
  for (const w of kitt.wheels) {
    w.mesh.rotation.x -= (speed * dt) / 0.35;
  }
  for (const p of kitt.frontSteer) {
    p.rotation.y = THREE.MathUtils.lerp(p.rotation.y, steer * 0.34, 1 - Math.pow(0.001, dt));
  }
  // Body attitude
  const roll = -steer * 0.045 * (0.4 + speedNorm);
  kitt.group.rotation.z = THREE.MathUtils.lerp(kitt.group.rotation.z, roll, 1 - Math.pow(0.002, dt));
  kitt.group.rotation.x = THREE.MathUtils.lerp(
    kitt.group.rotation.x,
    airborne ? -0.12 : boost ? 0.022 : braking ? -0.02 : 0.004,
    1 - Math.pow(0.005, dt)
  );

  // Scanner bounce: 0..1..0 triangular wave, smoothed
  const period = 1.15;
  const raw = (time % period) / period;
  const tri = raw < 0.5 ? raw * 2 : (1 - raw) * 2;
  const pos = tri * 7;
  let strongest = 0;
  for (let i = 0; i < kitt.segments.length; i++) {
    const d = Math.abs(i - pos);
    const v = Math.max(0, 1 - d / 1.7);
    const intensity = Math.pow(v, 1.6);
    strongest = Math.max(strongest, intensity);
    const mat = kitt.segments[i].material;
    mat.color.setRGB(1, 0.03 + 0.14 * intensity, 0.06 + 0.12 * intensity);
  }
  kitt.scannerGlow.material.opacity = 0.26 + strongest * 0.55;
  kitt.scannerGlow.material.color.setRGB(1, 0.1 + 0.1 * strongest, 0.15);
  kitt.scannerLight.intensity = 1.5 + strongest * 8;

  // Brake lights
  for (const bar of kitt.brakeBars) bar.material.color.set(braking ? "#ff2334" : "#8e0712");
  for (const glow of kitt.brakeGlows) glow.material.opacity = braking ? 0.7 : 0.32;

  // Exhaust
  const flame = boost && !airborne;
  for (const f of kitt.exhaust.children) {
    f.material.opacity = flame ? 0.75 + Math.sin(time * 55 + f.position.x * 9) * 0.22 : 0;
    f.scale.set(1, 0.7 + Math.random() * 0.8, 1);
  }
}

/* ----------------------------------------------------------------------- */
/*  Traffic                                                                 */
/* ----------------------------------------------------------------------- */

const TRAFFIC_COLORS = ["#8c2230", "#2a3f66", "#c9c5bb", "#3c3f46", "#5e6a78", "#7d3a27", "#244c4a", "#a49b88"];

export function buildTrafficCar(kind = "sedan", color = null) {
  const group = new THREE.Group();
  const paint = color || TRAFFIC_COLORS[(Math.random() * TRAFFIC_COLORS.length) | 0];
  const paintMat = new THREE.MeshStandardMaterial({ color: paint, roughness: 0.35, metalness: 0.55 });
  const glassMat = new THREE.MeshStandardMaterial({ color: "#0a1320", roughness: 0.18, metalness: 0.7 });
  const darkMat = new THREE.MeshStandardMaterial({ color: "#0b0c10", roughness: 0.7, metalness: 0.2 });

  if (kind === "truck") {
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.1, 5.4), paintMat);
    box.position.y = 1.45;
    group.add(box);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.35, 1.7), paintMat);
    cab.position.set(0, 1.06, -3.1);
    group.add(cab);
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.62, 0.05), glassMat);
    windshield.position.set(0, 1.35, -3.96);
    group.add(windshield);
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 6.6), darkMat);
    chassis.position.y = 0.45;
    group.add(chassis);
    for (const z of [-2.7, 0.3, 1.7]) {
      for (const x of [-0.92, 0.92]) {
        const w = wheel(0.46, 0.3);
        w.position.set(x, 0.46, z);
        group.add(w);
      }
    }
  } else if (kind === "suv") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.72, 4.5), paintMat);
    body.position.y = 0.66;
    group.add(body);
    const cabin = new THREE.Mesh(cabinGeometry(1.84, 0.64, 2.7), glassMat);
    cabin.position.set(0, 1.24, 0.28);
    group.add(cabin);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.08, 2.2), paintMat);
    roof.position.set(0, 1.56, 0.36);
    group.add(roof);
    for (const [x, z] of [[-0.95, -1.45], [0.95, -1.45], [-0.95, 1.45], [0.95, 1.45]]) {
      const w = wheel(0.4, 0.29);
      w.position.set(x, 0.4, z);
      group.add(w);
    }
  } else {
    const body = new THREE.Mesh(wedgeGeometry(1.92, 0.56, 4.3, { frontDrop: 0.2 }), paintMat);
    body.position.y = 0.56;
    group.add(body);
    const cabin = new THREE.Mesh(cabinGeometry(1.66, 0.52, 1.95), glassMat);
    cabin.position.set(0, 1.02, 0.15);
    group.add(cabin);
    for (const [x, z] of [[-0.9, -1.4], [0.9, -1.4], [-0.9, 1.4], [0.9, 1.4]]) {
      const w = wheel(0.34, 0.26);
      w.position.set(x, 0.34, z);
      group.add(w);
    }
  }

  // Lights (rear-facing toward the player)
  const tailMat = new THREE.MeshBasicMaterial({ color: "#ff2937", toneMapped: false });
  const headMat = new THREE.MeshBasicMaterial({ color: "#cfe6ff", toneMapped: false });
  const rearZ = kind === "truck" ? 2.72 : kind === "suv" ? 2.27 : 2.16;
  for (const side of [-1, 1]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.03), tailMat);
    tail.position.set(side * (kind === "truck" ? 0.84 : 0.66), kind === "truck" ? 1.0 : 0.66, rearZ);
    group.add(tail);
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(0.54, 0.34),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#ff2030", transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
    );
    halo.position.set(side * (kind === "truck" ? 0.84 : 0.66), kind === "truck" ? 1.0 : 0.66, rearZ + 0.03);
    group.add(halo);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.02), headMat);
    head.position.set(side * 0.62, 0.62, kind === "truck" ? -3.97 : -2.15);
    group.add(head);
  }

  group.add(blobShadow(2.4, kind === "truck" ? 7.2 : 4.8, 0.8));
  return group;
}

export function buildEnemyCar() {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: "#0d0e13", roughness: 0.3, metalness: 0.7, clearcoat: 0.8, clearcoatRoughness: 0.15 });
  const trim = new THREE.MeshStandardMaterial({ color: "#191b22", roughness: 0.5, metalness: 0.5 });
  const body = new THREE.Mesh(wedgeGeometry(2.08, 0.66, 4.8, { frontDrop: 0.26 }), bodyMat);
  body.position.y = 0.62;
  group.add(body);
  const cabin = new THREE.Mesh(cabinGeometry(1.78, 0.58, 2.1), new THREE.MeshStandardMaterial({ color: "#070b12", roughness: 0.15, metalness: 0.8 }));
  cabin.position.set(0, 1.12, 0.22);
  group.add(cabin);
  const bullBar = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.22, 0.24), trim);
  bullBar.position.set(0, 0.42, -2.42);
  group.add(bullBar);
  for (const [x, z] of [[-0.98, -1.55], [0.98, -1.55], [-0.98, 1.55], [0.98, 1.55]]) {
    const w = wheel(0.4, 0.3);
    w.position.set(x, 0.4, z);
    group.add(w);
  }

  // Roof light bar
  const barBase = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.09, 0.3), trim);
  barBase.position.set(0, 1.46, 0.1);
  group.add(barBase);
  const redMat = new THREE.MeshBasicMaterial({ color: "#ff1027", toneMapped: false });
  const blueMat = new THREE.MeshBasicMaterial({ color: "#1d6bff", toneMapped: false });
  const redLight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.18), redMat);
  redLight.position.set(-0.28, 1.53, 0.1);
  const blueLight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.18), blueMat);
  blueLight.position.set(0.28, 1.53, 0.1);
  group.add(redLight, blueLight);
  const lightGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 0.9),
    new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#ff1d3a", transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  lightGlow.position.set(0, 1.52, 0.12);
  group.add(lightGlow);

  // Taillights
  for (const side of [-1, 1]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.02), new THREE.MeshBasicMaterial({ color: "#b30614", toneMapped: false }));
    tail.position.set(side * 0.62, 0.72, 2.42);
    group.add(tail);
  }
  group.add(blobShadow(2.6, 5.6, 0.85));
  return { group, redLight, blueLight, lightGlow, redMat, blueMat };
}

export function buildDataCore() {
  const group = new THREE.Group();
  const coreMat = new THREE.MeshStandardMaterial({
    color: "#ffce6b",
    emissive: "#ff9d1f",
    emissiveIntensity: 2.6,
    metalness: 0.7,
    roughness: 0.2,
    toneMapped: false,
  });
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), coreMat);
  group.add(core);
  const ringMat = new THREE.MeshBasicMaterial({ color: "#ffd88a", transparent: true, opacity: 0.8, toneMapped: false });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.025, 8, 40), ringMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.018, 8, 40), ringMat.clone());
  ring2.rotation.x = Math.PI / 2.4;
  group.add(ring1, ring2);
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 3.2),
    new THREE.MeshBasicMaterial({ map: glowTexture(), color: "#ffb23e", transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  group.add(glow);
  const light = new THREE.PointLight("#ffb03a", 12, 12, 2);
  group.add(light);
  return { group, core, ring1, ring2, glow, light };
}

export function buildRamp() {
  const group = new THREE.Group();
  const w = 3.4;
  const l = 7.5;
  const h = 1.45;
  const geo = new THREE.BufferGeometry();
  const verts = new Float32Array([
    // top slope (front low at z=+l/2, rear high at z=-l/2)
    -w / 2, 0, l / 2, w / 2, 0, l / 2, w / 2, h, -l / 2,
    -w / 2, 0, l / 2, w / 2, h, -l / 2, -w / 2, h, -l / 2,
    // back face
    -w / 2, 0, -l / 2, -w / 2, h, -l / 2, w / 2, h, -l / 2,
    -w / 2, 0, -l / 2, w / 2, h, -l / 2, w / 2, 0, -l / 2,
    // sides
    -w / 2, 0, l / 2, -w / 2, h, -l / 2, -w / 2, 0, -l / 2,
    w / 2, 0, l / 2, w / 2, 0, -l / 2, w / 2, h, -l / 2,
  ]);
  geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color: "#1b1d26", roughness: 0.6, metalness: 0.4, side: THREE.DoubleSide });
  const ramp = new THREE.Mesh(geo, mat);
  group.add(ramp);
  // Chevrons on the slope
  const chevMat = new THREE.MeshBasicMaterial({ color: "#ffb648", toneMapped: false });
  for (let i = 0; i < 4; i++) {
    const t = (i + 0.5) / 4;
    const z = l / 2 - t * l;
    const y = t * h + 0.03;
    const chev = new THREE.Mesh(new THREE.BoxGeometry(w * 0.66, 0.035, 0.18), chevMat);
    chev.position.set(0, y, z);
    chev.rotation.x = -Math.atan2(h, l);
    group.add(chev);
  }
  for (const side of [-1, 1]) {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, l), new THREE.MeshBasicMaterial({ color: "#7fe8ff", toneMapped: false }));
    edge.position.set(side * w * 0.5, 0.72, 0);
    edge.rotation.x = -Math.atan2(h, l);
    group.add(edge);
  }
  return group;
}
