import * as THREE from "three";

const texCache = new Map();

function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, g: c.getContext("2d") };
}

function finish(c, { repeat = false, srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
  }
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

export function glowTexture() {
  if (texCache.has("glow")) return texCache.get("glow");
  const { c, g } = canvas(128, 128);
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.18, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.42, "rgba(255,255,255,0.28)");
  grad.addColorStop(0.72, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = finish(c, { srgb: true });
  texCache.set("glow", t);
  return t;
}

export function shadowTexture() {
  if (texCache.has("shadow")) return texCache.get("shadow");
  const { c, g } = canvas(128, 128);
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,0.92)");
  grad.addColorStop(0.5, "rgba(0,0,0,0.55)");
  grad.addColorStop(0.82, "rgba(0,0,0,0.12)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = finish(c, { srgb: false });
  texCache.set("shadow", t);
  return t;
}

export function asphaltTexture() {
  if (texCache.has("asphalt")) return texCache.get("asphalt");
  const W = 512;
  const H = 1024;
  const { c, g } = canvas(W, H);

  g.fillStyle = "#15161d";
  g.fillRect(0, 0, W, H);

  // Large scale mottling
  for (let i = 0; i < 220; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 12 + Math.random() * 70;
    const a = 0.015 + Math.random() * 0.05;
    const light = Math.random() > 0.45;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, light ? `rgba(120,124,140,${a})` : `rgba(0,0,0,${a * 1.6})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Aggregate speckle
  for (let i = 0; i < 26000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const v = 30 + Math.random() * 95;
    g.fillStyle = `rgba(${v},${v},${v + Math.random() * 18},${0.1 + Math.random() * 0.35})`;
    const s = Math.random() < 0.88 ? 1 : 2;
    g.fillRect(x, y, s, s);
  }

  // Tire polished tracks through each lane
  const laneCenters = [-6.75, -2.25, 2.25, 6.75];
  for (const lx of laneCenters) {
    for (const off of [-0.72, 0.72]) {
      const x = ((lx + off + 9) / 18) * W;
      const grad = g.createLinearGradient(x - 16, 0, x + 16, 0);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.22)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(x - 17, 0, 34, H);
      g.fillStyle = "rgba(150,160,180,0.028)";
      g.fillRect(x - 12, 0, 24, H);
    }
  }

  // Lane markings. Texture covers 18m wide x 32m long.
  const xFor = (m) => ((m + 9) / 18) * W;
  const dashTop = 0;
  const period = H / 4; // 8 m
  const dashLen = period * 0.375; // 3 m
  for (const laneX of [-4.5, 0, 4.5]) {
    const x = xFor(laneX);
    g.fillStyle = "rgba(228,232,240,0.82)";
    for (let i = 0; i < 4; i++) {
      g.fillRect(x - 3, dashTop + i * period, 6, dashLen);
    }
    g.fillStyle = "rgba(228,232,240,0.06)";
    g.fillRect(x - 7, 0, 14, H);
  }
  // Edge lines
  for (const edge of [-8.55, 8.55]) {
    const x = xFor(edge);
    g.fillStyle = "rgba(230,234,242,0.72)";
    g.fillRect(x - 3, 0, 6, H);
    g.fillStyle = "rgba(255,255,255,0.1)";
    g.fillRect(x - 5, 0, 10, H);
  }
  // Slight yellow tint on left edge
  g.fillStyle = "rgba(255,196,92,0.5)";
  g.fillRect(xFor(-8.55) - 1, 0, 2, H);

  // Cracks
  g.strokeStyle = "rgba(6,6,8,0.5)";
  g.lineWidth = 2;
  for (let i = 0; i < 9; i++) {
    let x = Math.random() * W;
    let y = Math.random() * H;
    g.beginPath();
    g.moveTo(x, y);
    for (let s = 0; s < 6; s++) {
      x += (Math.random() - 0.5) * 42;
      y += 18 + Math.random() * 26;
      g.lineTo(x, y);
    }
    g.stroke();
  }

  // Reflective dots along the shoulder
  for (const edge of [-8.15, 8.15]) {
    for (let i = 0; i < 4; i++) {
      const x = xFor(edge);
      const y = i * period + period * 0.5;
      g.fillStyle = "rgba(255,210,120,0.95)";
      g.beginPath();
      g.arc(x, y, 2.4, 0, Math.PI * 2);
      g.fill();
    }
  }

  const t = finish(c, { repeat: true, aniso: 16 });
  texCache.set("asphalt", t);
  return t;
}

export function asphaltRoughness() {
  if (texCache.has("asphaltRough")) return texCache.get("asphaltRough");
  const W = 256;
  const H = 512;
  const { c, g } = canvas(W, H);
  g.fillStyle = "#b8b8b8";
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 7000; i++) {
    const v = 100 + Math.random() * 120;
    g.fillStyle = `rgba(${v},${v},${v},${Math.random() * 0.4})`;
    g.fillRect(Math.random() * W, Math.random() * H, 1, 1 + Math.random() * 2);
  }
  // darker (smoother) tire tracks
  for (const lx of [-6.75, -2.25, 2.25, 6.75]) {
    for (const off of [-0.72, 0.72]) {
      const x = ((lx + off + 9) / 18) * W;
      const grad = g.createLinearGradient(x - 10, 0, x + 10, 0);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, "rgba(40,40,40,0.65)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(x - 10, 0, 20, H);
    }
  }
  const t = finish(c, { repeat: true, srgb: false, aniso: 8 });
  texCache.set("asphaltRough", t);
  return t;
}

export function signTexture(title, subtitle, accent = "#ffb648") {
  const key = `sign:${title}:${subtitle}`;
  if (texCache.has(key)) return texCache.get(key);
  const W = 768;
  const H = 384;
  const { c, g } = canvas(W, H);
  g.fillStyle = "#0a0d14";
  g.fillRect(0, 0, W, H);
  g.strokeStyle = "rgba(255,255,255,0.2)";
  g.lineWidth = 6;
  g.strokeRect(18, 18, W - 36, H - 36);
  g.fillStyle = accent;
  g.fillRect(40, 52, W - 80, 5);
  g.font = "900 92px 'Orbitron', Arial Black, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#f4f7ff";
  g.shadowColor = accent;
  g.shadowBlur = 26;
  g.fillText(title, W / 2, H / 2 - 8);
  g.shadowBlur = 0;
  g.font = "600 32px 'Rajdhani', Arial, sans-serif";
  g.fillStyle = "rgba(220,228,244,0.8)";
  g.fillText(subtitle, W / 2, H / 2 + 74);
  g.fillStyle = "rgba(255,255,255,0.16)";
  g.fillRect(40, H - 58, W - 80, 2);
  const t = finish(c, { srgb: true, aniso: 8 });
  texCache.set(key, t);
  return t;
}

export function plateTexture(text = "KITT") {
  const { c, g } = canvas(256, 128);
  g.fillStyle = "#e8e9ee";
  g.fillRect(0, 0, 256, 128);
  g.fillStyle = "#0a0b10";
  g.fillRect(6, 6, 244, 116);
  g.fillStyle = "#f5f6fa";
  g.fillRect(10, 10, 236, 108);
  g.font = "900 66px 'Orbitron', Arial Black, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#11131a";
  g.fillText(text, 128, 68);
  g.font = "600 15px Arial, sans-serif";
  g.fillStyle = "#5d6270";
  g.fillText("CALIFORNIA · KNIGHT", 128, 18);
  return finish(c);
}

export function moonTexture() {
  const { c, g } = canvas(256, 256);
  const glow = g.createRadialGradient(128, 128, 34, 128, 128, 128);
  glow.addColorStop(0, "rgba(220,230,255,0.55)");
  glow.addColorStop(0.32, "rgba(180,196,255,0.16)");
  glow.addColorStop(1, "rgba(120,140,255,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, 256, 256);
  g.fillStyle = "#e9edff";
  g.beginPath();
  g.arc(128, 128, 34, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(160,170,205,0.35)";
  for (const [x, y, r] of [[116, 118, 6], [139, 136, 4], [124, 143, 3], [142, 114, 2.5], [108, 134, 2]]) {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  return finish(c);
}

export function beamTexture() {
  const { c, g } = canvas(64, 256);
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.15, "rgba(255,255,255,0.65)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.95)");
  grad.addColorStop(1, "rgba(255,255,255,1)");
  g.fillStyle = grad;
  g.beginPath();
  g.moveTo(28, 0);
  g.lineTo(36, 0);
  g.lineTo(64, 256);
  g.lineTo(0, 256);
  g.closePath();
  g.fill();
  return finish(c);
}

export function makeCanvasTexture(w, h, draw, opts) {
  const { c, g } = canvas(w, h);
  draw(g, w, h);
  return finish(c, opts);
}

export function cloudTexture() {
  const { c, g } = canvas(512, 256);
  g.clearRect(0, 0, 512, 256);
  for (let i = 0; i < 26; i++) {
    const x = 40 + Math.random() * 432;
    const y = 90 + Math.random() * 90;
    const rx = 60 + Math.random() * 130;
    const ry = 12 + Math.random() * 26;
    const grad = g.createRadialGradient(x, y, 0, x, y, rx);
    grad.addColorStop(0, `rgba(255,255,255,${0.05 + Math.random() * 0.1})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.save();
    g.translate(x, y);
    g.scale(1, ry / rx);
    g.translate(-x, -y);
    g.fillStyle = grad;
    g.fillRect(x - rx, y - rx, rx * 2, rx * 2);
    g.restore();
  }
  return finish(c);
}
