import * as THREE from "three";
import { glowTexture } from "./textures.js";

const MAX = 900;

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.positions = new Float32Array(MAX * 3);
    this.velocities = new Float32Array(MAX * 3);
    this.colors = new Float32Array(MAX * 3);
    this.sizes = new Float32Array(MAX);
    this.alphas = new Float32Array(MAX);
    this.life = new Float32Array(MAX);
    this.maxLife = new Float32Array(MAX);
    this.gravity = new Float32Array(MAX);
    this.drag = new Float32Array(MAX);
    this.cursor = 0;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(this.colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(this.sizes, 1));
    geo.setAttribute("aAlpha", new THREE.BufferAttribute(this.alphas, 1));

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTexture: { value: glowTexture() } },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (260.0 / max(1.0, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, tex.a * vAlpha);
        }
      `,
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    scene.add(this.points);
    this.geo = geo;

    this.shockwaves = [];
    this.beams = [];
    this.flashes = [];

    this.ringGeo = new THREE.RingGeometry(0.6, 0.78, 40);
  }

  _spawn(x, y, z, vx, vy, vz, color, size, life, gravity = 0, drag = 0.98) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % MAX;
    this.positions[i * 3] = x;
    this.positions[i * 3 + 1] = y;
    this.positions[i * 3 + 2] = z;
    this.velocities[i * 3] = vx;
    this.velocities[i * 3 + 1] = vy;
    this.velocities[i * 3 + 2] = vz;
    this.colors[i * 3] = color.r;
    this.colors[i * 3 + 1] = color.g;
    this.colors[i * 3 + 2] = color.b;
    this.sizes[i] = size;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.alphas[i] = 1;
    this.gravity[i] = gravity;
    this.drag[i] = drag;
  }

  burst(position, { color = new THREE.Color("#ff7a2a"), count = 30, speed = 18, size = 0.55, life = 0.8, gravity = 12, spread = 1, up = 0 } = {}) {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const s = speed * (0.35 + Math.random() * 0.65);
      const vx = Math.sin(phi) * Math.cos(theta) * s * spread;
      const vy = Math.abs(Math.cos(phi)) * s * 0.7 + up;
      const vz = Math.sin(phi) * Math.sin(theta) * s * spread;
      const c = color.clone();
      const tint = 0.6 + Math.random() * 0.4;
      c.multiplyScalar(tint);
      if (Math.random() < 0.25) c.lerp(new THREE.Color("#fff0c4"), 0.7);
      this._spawn(position.x, position.y, position.z, vx, vy, vz, c, size * (0.5 + Math.random() * 0.9), life * (0.5 + Math.random() * 0.7), gravity, 0.965);
    }
  }

  trail(position, color, size = 0.35, speed = 3) {
    this._spawn(
      position.x + (Math.random() - 0.5) * 0.5,
      position.y + (Math.random() - 0.5) * 0.25,
      position.z + Math.random() * 0.5,
      (Math.random() - 0.5) * 1.4,
      (Math.random() - 0.5) * 0.8,
      speed + Math.random() * 4,
      color,
      size * (0.6 + Math.random() * 0.8),
      0.3 + Math.random() * 0.25,
      -1.5,
      0.95
    );
  }

  shockwave(position, color = "#ff5a3c", maxScale = 10, life = 0.55) {
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(this.ringGeo, mat);
    mesh.position.copy(position);
    mesh.rotation.x = -Math.PI / 2;
    mesh.scale.setScalar(0.6);
    this.scene.add(mesh);
    this.shockwaves.push({ mesh, t: 0, life, maxScale });
  }

  explosion(position) {
    this.burst(position, { color: new THREE.Color("#ff6a1e"), count: 55, speed: 22, size: 0.8, life: 1.1, gravity: 9 });
    this.burst(position, { color: new THREE.Color("#ffe6a0"), count: 22, speed: 30, size: 0.45, life: 0.55, gravity: 3 });
    this.burst(position, { color: new THREE.Color("#7b1a0c"), count: 18, speed: 8, size: 1.5, life: 1.4, gravity: -1 });
    this.shockwave(position, "#ff7a2a", 12, 0.6);
    const light = new THREE.PointLight("#ff7a2a", 60, 26, 2);
    light.position.copy(position).add(new THREE.Vector3(0, 1, 0));
    this.scene.add(light);
    this.flashes.push({ light, t: 0, life: 0.35 });
  }

  sparks(position, color = "#ffd8a0") {
    this.burst(position, { color: new THREE.Color(color), count: 16, speed: 10, size: 0.22, life: 0.45, gravity: 16, spread: 1.4 });
  }

  pickup(position) {
    this.burst(position, { color: new THREE.Color("#ffcf6b"), count: 26, speed: 8, size: 0.45, life: 0.7, gravity: 2, spread: 1.2 });
    this.shockwave(position, "#ffcf6b", 5, 0.4);
  }

  laser(from, to, color = "#9ff4ff") {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(0.035, 0.07, 1, 6, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(from).add(to).multiplyScalar(0.5);
    mesh.scale.set(1, len, 1);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    this.scene.add(mesh);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, len),
      new THREE.MeshBasicMaterial({ map: glowTexture(), color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide })
    );
    glow.position.copy(to).add(from).multiplyScalar(0.5);
    glow.quaternion.copy(mesh.quaternion);
    glow.rotateY(Math.PI / 2);
    this.scene.add(glow);
    this.beams.push({ mesh, glow, t: 0, life: 0.16 });
  }

  update(dt) {
    for (let i = 0; i < MAX; i++) {
      if (this.life[i] <= 0) {
        this.alphas[i] = 0;
        continue;
      }
      this.life[i] -= dt;
      const t = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alphas[i] = Math.pow(t, 0.65);
      const drag = this.drag[i];
      this.velocities[i * 3] *= drag;
      this.velocities[i * 3 + 1] = this.velocities[i * 3 + 1] * drag - this.gravity[i] * dt;
      this.velocities[i * 3 + 2] *= drag;
      this.positions[i * 3] += this.velocities[i * 3] * dt;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * dt;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * dt;
      if (this.positions[i * 3 + 1] < 0.05) {
        this.positions[i * 3 + 1] = 0.05;
        this.velocities[i * 3 + 1] *= -0.28;
      }
      this.sizes[i] *= 0.995;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
    this.geo.attributes.aSize.needsUpdate = true;
    this.geo.attributes.aAlpha.needsUpdate = true;

    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const s = this.shockwaves[i];
      s.t += dt;
      const k = s.t / s.life;
      s.mesh.scale.setScalar(0.6 + k * s.maxScale);
      s.mesh.material.opacity = (1 - k) * 0.85;
      if (k >= 1) {
        this.scene.remove(s.mesh);
        s.mesh.material.dispose();
        this.shockwaves.splice(i, 1);
      }
    }
    for (let i = this.beams.length - 1; i >= 0; i--) {
      const b = this.beams[i];
      b.t += dt;
      const k = b.t / b.life;
      b.mesh.material.opacity = Math.max(0, 1 - k);
      b.glow.material.opacity = Math.max(0, 0.6 - k * 0.6);
      b.mesh.scale.x = 1 - k * 0.5;
      b.mesh.scale.z = 1 - k * 0.5;
      if (k >= 1) {
        this.scene.remove(b.mesh, b.glow);
        b.mesh.material.dispose();
        b.glow.material.dispose();
        b.mesh.geometry.dispose();
        b.glow.geometry.dispose();
        this.beams.splice(i, 1);
      }
    }
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const f = this.flashes[i];
      f.t += dt;
      f.light.intensity = 60 * Math.max(0, 1 - f.t / f.life);
      if (f.t >= f.life) {
        this.scene.remove(f.light);
        f.light.dispose();
        this.flashes.splice(i, 1);
      }
    }
  }
}
