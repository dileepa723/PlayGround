import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const RED = new THREE.Color(0xff2c21);
const CAR_MODEL = "models/kitt.glb";

const clamp = THREE.MathUtils.clamp;
const damp = THREE.MathUtils.damp;

function makeRadialTexture(stops, size = 256, inner = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeAsphaltTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const grain = 88 + Math.random() * 62;
    image.data[i] = grain;
    image.data[i + 1] = grain * 0.96;
    image.data[i + 2] = grain * 1.04;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 62);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeEnvironment(renderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  const sky = ctx.createLinearGradient(0, 0, 0, 512);
  sky.addColorStop(0, "#030207");
  sky.addColorStop(0.42, "#0a0710");
  sky.addColorStop(0.55, "#2b0a0b");
  sky.addColorStop(0.7, "#090508");
  sky.addColorStop(1, "#020103");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1024, 512);

  const glows = [
    [180, 286, 240, "rgba(255, 40, 24, 0.88)"],
    [820, 250, 200, "rgba(54, 94, 255, 0.5)"],
    [510, 70, 290, "rgba(255, 236, 218, 0.5)"],
    [960, 330, 150, "rgba(255, 90, 40, 0.4)"],
  ];
  for (const [x, y, radius, color] of glows) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // Long soft strips read as studio highlights on the car's paint.
  const strip = ctx.createLinearGradient(0, 0, 1024, 0);
  strip.addColorStop(0, "rgba(255,255,255,0)");
  strip.addColorStop(0.28, "rgba(220,232,255,0.34)");
  strip.addColorStop(0.52, "rgba(255,255,255,0.5)");
  strip.addColorStop(0.76, "rgba(255,190,160,0.26)");
  strip.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = strip;
  ctx.fillRect(0, 56, 1024, 16);
  ctx.globalAlpha = 0.55;
  ctx.fillRect(0, 322, 1024, 8);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromEquirectangular(texture).texture;
  texture.dispose();
  pmrem.dispose();
  return environment;
}

export class KittScene {
  constructor(canvas, { onProgress = () => {}, onReady = () => {}, onError = () => {} } = {}) {
    this.canvas = canvas;
    this.onProgress = onProgress;
    this.onReady = onReady;
    this.onError = onError;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.car = null;
    this.carModel = null;
    this.scanner = null;
    this.road = null;
    this.dashes = null;
    this.posts = null;
    this.postLights = null;
    this.headlightSpots = [];
    this.headlightSprites = [];
    this.headlightPool = null;
    this.scannerLight = null;
    this.scannerGlow = null;
    this.taillightGlow = null;
    this.moon = null;
    this.towerLight = null;

    this.speed = 92;
    this.displaySpeed = 92;
    this.boosting = false;
    this.boostFactor = 0;
    this.boostUntil = 0;
    this.headlights = true;
    this.time = 0;
    this.roadTravel = 0;
    this.dragging = false;
    this.pointerId = null;
    this.orbit = {
      yaw: -0.4,
      targetYaw: null,
      height: 1.52,
      targetHeight: null,
      baseYaw: -0.4,
      baseHeight: 1.52,
      lastX: 0,
      lastY: 0,
      moved: false,
    };
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.isMobile = window.matchMedia("(max-width: 820px)").matches;
    this.ready = false;
    this.clock = null;
    this.raf = 0;
  }

  async init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.6 : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050307, 0.0125);
    this.scene.environment = makeEnvironment(this.renderer);
    this.scene.environmentIntensity = 0.85;
    RectAreaLightUniformsLib.init();

    this.camera = new THREE.PerspectiveCamera(37, window.innerWidth / window.innerHeight, 0.1, 240);
    this.applyCameraLayout();

    this.buildSky();
    this.buildGround();
    this.buildLights();
    this.buildRoadProps();
    this.buildPostProcessing();
    this.setupInput();
    this.setupResize();

    await this.loadCar();

    this.clock = new THREE.Clock();
    this.animate();
    this.onReady();
  }

  applyCameraLayout() {
    this.isMobile = window.matchMedia("(max-width: 820px)").matches;
    const aspect = window.innerWidth / window.innerHeight;
    const portrait = aspect < 0.9;

    if (this.isMobile && portrait) {
      this.camera.fov = 43;
      this.baseDistance = 8.4;
      this.cameraPivot = new THREE.Vector3(0, 0.6, 0);
      this.cameraTarget = new THREE.Vector3(-0.08, 0.6, 0);
      this.orbit.baseYaw = -0.2;
      this.orbit.baseHeight = 1.5;
      this.orbit.targetYaw = this.orbit.targetYaw || -0.2;
      this.orbit.targetHeight = this.orbit.targetHeight || 1.5;
    } else if (portrait) {
      this.camera.fov = 40;
      this.baseDistance = 9.6;
      this.cameraPivot = new THREE.Vector3(0, 0.6, 0);
      this.cameraTarget = new THREE.Vector3(-0.2, 0.6, 0);
      this.orbit.baseYaw = -0.3;
      this.orbit.baseHeight = 1.55;
    } else {
      this.camera.fov = 37;
      this.baseDistance = 8.2;
      this.cameraPivot = new THREE.Vector3(0, 0.6, 0);
      this.cameraTarget = new THREE.Vector3(1.8, 0.6, 0);
      this.orbit.baseYaw = -0.4;
      this.orbit.baseHeight = 1.62;
    }

    if (this.orbit.targetYaw === null) {
      this.orbit.targetYaw = this.orbit.baseYaw;
      this.orbit.yaw = this.orbit.baseYaw;
    }
    if (this.orbit.targetHeight === null) {
      this.orbit.targetHeight = this.orbit.baseHeight;
      this.orbit.height = this.orbit.baseHeight;
    }

    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  buildSky() {
    const skyGeometry = new THREE.SphereGeometry(110, 40, 24);
    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        uHorizon: { value: new THREE.Color(0x0b0305) },
        uZenith: { value: new THREE.Color(0x010105) },
        uGlow: { value: new THREE.Color(0xff1b0c) },
      },
      vertexShader: `
        varying vec3 vWorld;
        void main() {
          vWorld = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorld;
        uniform vec3 uHorizon;
        uniform vec3 uZenith;
        uniform vec3 uGlow;
        void main() {
          float h = normalize(vWorld).y;
          vec3 color = mix(uHorizon, uZenith, smoothstep(-0.01, 0.24, h));
          float band = exp(-pow((h - 0.002) / 0.055, 2.0));
          color += uGlow * band * 0.24;
          float high = smoothstep(0.18, 0.9, h);
          color += vec3(0.003, 0.008, 0.02) * high;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
    this.scene.add(new THREE.Mesh(skyGeometry, skyMaterial));

    const starCount = this.isMobile ? 520 : 1100;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 78 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const y = Math.pow(Math.random(), 0.72) * 0.92 + 0.06;
      const planar = Math.sqrt(1 - y * y);
      positions[i * 3] = Math.cos(theta) * planar * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * planar * radius;
      const tone = 0.55 + Math.random() * 0.45;
      const warm = Math.random() > 0.9;
      colors[i * 3] = tone;
      colors[i * 3 + 1] = warm ? tone * 0.64 : tone * 0.82;
      colors[i * 3 + 2] = warm ? tone * 0.55 : tone;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.22,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
    });
    this.scene.add(new THREE.Points(starGeometry, starMaterial));

    // Moon and its atmosphere.
    const moonTexture = makeRadialTexture(
      [
        [0, "rgba(255,250,240,1)"],
        [0.18, "rgba(255,226,205,0.95)"],
        [0.32, "rgba(255,173,140,0.34)"],
        [0.72, "rgba(255,84,51,0.08)"],
        [1, "rgba(0,0,0,0)"],
      ],
      256,
    );
    const moonMaterial = new THREE.SpriteMaterial({
      map: moonTexture,
      color: 0xffe7d7,
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
    });
    this.moon = new THREE.Sprite(moonMaterial);
    this.moon.position.set(24, 13, 110);
    this.moon.scale.set(9.5, 9.5, 1);
    this.scene.add(this.moon);

    const hazeMaterial = new THREE.SpriteMaterial({
      map: moonTexture,
      color: 0xff4b2d,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
    });
    const moonHaze = new THREE.Sprite(hazeMaterial);
    moonHaze.position.copy(this.moon.position);
    moonHaze.position.z -= 1;
    moonHaze.scale.set(19, 19, 1);
    this.scene.add(moonHaze);

    // Layered desert ridges.
    this.addRidge(90, 0x09050d, 1.1, 2.2, 0);
    this.addRidge(68, 0x10070c, 0.65, 1.1, 11);

    // Warm city haze on the horizon.
    const cityTexture = makeRadialTexture(
      [
        [0, "rgba(255, 94, 52, 0.32)"],
        [0.4, "rgba(255, 44, 21, 0.12)"],
        [1, "rgba(0,0,0,0)"],
      ],
      256,
    );
    const cityMaterial = new THREE.SpriteMaterial({
      map: cityTexture,
      color: 0xff3a1e,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
    });
    const city = new THREE.Sprite(cityMaterial);
    city.position.set(30, 1.5, 108);
    city.scale.set(88, 21, 1);
    this.scene.add(city);

  }

  addRidge(z, color, amplitude, seed, yOffset) {
    const shape = new THREE.Shape();
    const width = 150;
    const base = -14;
    shape.moveTo(-width, base);
    let x = -width;
    while (x <= width) {
      const wave =
        Math.sin(x * 0.075 + seed) * 2.2 +
        Math.sin(x * 0.17 + seed * 1.7) * 1.1 +
        Math.abs(Math.sin(x * 0.038 + seed * 0.6)) * 4.6 +
        Math.sin(x * 0.31 + seed * 2.3) * 0.45;
      const y = Math.max(base + 1, wave * amplitude + yOffset);
      shape.lineTo(x, y);
      x += 2;
    }
    shape.lineTo(width, base);
    shape.closePath();
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({ color, fog: false });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = z;
    this.scene.add(mesh);
  }

  buildGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 520),
      new THREE.MeshStandardMaterial({
        color: 0x030204,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0.1,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.09, 70);
    ground.receiveShadow = true;
    this.scene.add(ground);

    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(14.4, 390),
      new THREE.MeshStandardMaterial({
        color: 0x4a4352,
        map: makeAsphaltTexture(),
        roughness: 0.72,
        metalness: 0.12,
        envMapIntensity: 0.3,
      }),
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, -0.04, 92);
    road.receiveShadow = true;
    this.scene.add(road);
    this.road = road;

    // Shoulder lines.
    const shoulderMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc4b2,
      transparent: true,
      opacity: 0.34,
      toneMapped: false,
      fog: true,
    });
    for (const x of [-6.65, 6.65]) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 390), shoulderMaterial);
      line.rotation.x = -Math.PI / 2;
      line.position.set(x, -0.032, 92);
      this.scene.add(line);
    }

    // Animated centre dashes.
    const dashCount = 38;
    const dashGeometry = new THREE.PlaneGeometry(0.17, 3.4);
    const dashMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe9dc,
      toneMapped: false,
      transparent: true,
      opacity: 0.95,
    });
    const dashes = new THREE.InstancedMesh(dashGeometry, dashMaterial, dashCount);
    dashes.frustumCulled = false;
    const matrix = new THREE.Matrix4();
    const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
    this.dashData = [];
    for (let i = 0; i < dashCount; i += 1) {
      const z = 290 - i * 8;
      this.dashData.push(z);
      matrix.compose(new THREE.Vector3(-2.55, -0.026, z), rotation, new THREE.Vector3(1, 1, 1));
      dashes.setMatrixAt(i, matrix);
    }
    dashes.instanceMatrix.needsUpdate = true;
    this.scene.add(dashes);
    this.dashes = dashes;

    // Reflective marker posts along both shoulders.
    const postCount = 26;
    const postGeometry = new THREE.BoxGeometry(0.055, 0.78, 0.055);
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0x17131b,
      roughness: 0.55,
      metalness: 0.5,
      emissive: 0x160403,
      emissiveIntensity: 0.4,
    });
    const posts = new THREE.InstancedMesh(postGeometry, postMaterial, postCount * 2);
    const lightGeometry = new THREE.SphereGeometry(0.035, 6, 6);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b24,
      toneMapped: true,
    });
    const postLights = new THREE.InstancedMesh(lightGeometry, lightMaterial, postCount * 2);
    this.postData = [];
    const postMatrix = new THREE.Matrix4();
    const scale = new THREE.Vector3(1, 1, 1);
    let index = 0;
    for (let side = 0; side < 2; side += 1) {
      const x = side === 0 ? -7.15 : 7.15;
      for (let i = 0; i < postCount; i += 1) {
        const z = 280 - i * 10.5;
        this.postData.push({ x, z });
        postMatrix.compose(new THREE.Vector3(x, 0.39, z), new THREE.Quaternion(), scale);
        posts.setMatrixAt(index, postMatrix);
        postMatrix.compose(new THREE.Vector3(x, 0.81, z), new THREE.Quaternion(), scale);
        postLights.setMatrixAt(index, postMatrix);
        index += 1;
      }
    }
    posts.instanceMatrix.needsUpdate = true;
    postLights.instanceMatrix.needsUpdate = true;
    posts.frustumCulled = false;
    postLights.frustumCulled = false;
    this.scene.add(posts, postLights);
    this.posts = posts;
    this.postLights = postLights;
    this.postMatrix = postMatrix;
    this.postScale = scale;
    this.postRotation = new THREE.Quaternion();

    // Soft under-car red bounce / contact light.
    this.carGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 3.3),
      new THREE.MeshBasicMaterial({
        map: makeRadialTexture(
          [
            [0, "rgba(255, 44, 20, 0.62)"],
            [0.45, "rgba(255, 30, 12, 0.22)"],
            [1, "rgba(0,0,0,0)"],
          ],
          256,
        ),
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    );
    this.carGlow.rotation.x = -Math.PI / 2;
    this.carGlow.position.set(0, 0.012, 0);
    this.scene.add(this.carGlow);
  }

  buildLights() {
    const hemi = new THREE.HemisphereLight(0x241d38, 0x040204, 0.6);
    this.scene.add(hemi);

    const keyPanel = new THREE.RectAreaLight(0xffefe4, 4.6, 6.5, 3.2);
    keyPanel.position.set(-5.5, 3.8, -4.6);
    keyPanel.lookAt(0, 0.7, 0);
    this.scene.add(keyPanel);

    const coolPanel = new THREE.RectAreaLight(0x6f8cff, 2.2, 5, 2.4);
    coolPanel.position.set(5.2, 2.8, -2.2);
    coolPanel.lookAt(0, 0.7, 0);
    this.scene.add(coolPanel);

    const redPanel = new THREE.RectAreaLight(0xff2a1a, 1.2, 5.5, 2.0);
    redPanel.position.set(2.4, 1.6, 5.6);
    redPanel.lookAt(0, 0.6, 0);
    this.scene.add(redPanel);

    const moonLight = new THREE.DirectionalLight(0xdfe9ff, 0.7);
    moonLight.position.set(-6.5, 7.5, -9);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(1024, 1024);
    moonLight.shadow.camera.left = -8;
    moonLight.shadow.camera.right = 8;
    moonLight.shadow.camera.top = 8;
    moonLight.shadow.camera.bottom = -8;
    moonLight.shadow.camera.near = 1;
    moonLight.shadow.camera.far = 30;
    moonLight.shadow.bias = -0.0007;
    moonLight.shadow.normalBias = 0.02;
    this.scene.add(moonLight);

    const redRim = new THREE.DirectionalLight(0xff2a1b, 0.16);
    redRim.position.set(6.5, 1.4, 8);
    this.scene.add(redRim);

    const coolRim = new THREE.DirectionalLight(0x3f6bff, 0.4);
    coolRim.position.set(-7, 2.4, 6);
    this.scene.add(coolRim);

    const topLight = new THREE.DirectionalLight(0xfff2e4, 0.42);
    topLight.position.set(0, 9, -1);
    this.scene.add(topLight);

    // Low warm bounce that lifts the nose without blowing out the paint.
    const noseFill = new THREE.PointLight(0xffb08a, 0.85, 7, 2);
    noseFill.position.set(0.4, 1.15, 3.8);
    this.scene.add(noseFill);

    const fill = new THREE.PointLight(0xff6c4a, 2.2, 8, 2);
    fill.position.set(-2.3, 1.8, -2.6);
    this.scene.add(fill);

    this.scannerLight = new THREE.PointLight(0xff2416, 0, 6.5, 2);
    this.scannerLight.position.set(0, 0.55, -2.9);
    this.scene.add(this.scannerLight);

    // Headlights: spots plus soft visible pools.
    for (const x of [-0.62, 0.62]) {
      const spot = new THREE.SpotLight(0xffe2c1, 18, 36, 0.26, 0.8, 1.3);
      spot.position.set(x, 0.72, -2.52);
      spot.target.position.set(x * 2.6, 0.05, -22);
      spot.castShadow = false;
      this.scene.add(spot, spot.target);
      this.headlightSpots.push(spot);

      const spriteMaterial = new THREE.SpriteMaterial({
        map: makeRadialTexture(
          [
            [0, "rgba(255, 248, 228, 1)"],
            [0.2, "rgba(255, 214, 164, 0.8)"],
            [0.6, "rgba(255, 120, 64, 0.18)"],
            [1, "rgba(0,0,0,0)"],
          ],
          128,
        ),
        color: 0xfff0d8,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, 0.7, -2.52);
      sprite.scale.set(0.32, 0.32, 1);
      this.scene.add(sprite);
      this.headlightSprites.push(sprite);
    }

    this.headlightPool = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 16),
      new THREE.MeshBasicMaterial({
        map: makeRadialTexture(
          [
            [0, "rgba(255, 231, 195, 0.24)"],
            [0.5, "rgba(255, 154, 94, 0.08)"],
            [1, "rgba(0,0,0,0)"],
          ],
          256,
        ),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    );
    this.headlightPool.rotation.x = -Math.PI / 2;
    this.headlightPool.position.set(0, -0.02, -9.5);
    this.headlightPool.visible = false;
    this.scene.add(this.headlightPool);
  }

  buildRoadProps() {
    // A few distant warm light strips on the shoulder give the highway depth.
    const stripMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4d2c,
      transparent: true,
      opacity: 0.4,
      toneMapped: false,
    });
    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 96), stripMaterial);
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(side * 7.8, 0.005, 58);
      this.scene.add(strip);
    }
  }

  buildPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.boosting ? 0.72 : 0.36,
      0.55,
      0.86,
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  async loadCar() {
    const loader = new GLTFLoader();
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        CAR_MODEL,
        resolve,
        (event) => {
          if (event.total) this.onProgress((event.loaded / event.total) * 100);
        },
        reject,
      );
    });

    const root = gltf.scene;
    root.updateMatrixWorld(true);

    let box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const scale = 4.92 / size.x;
    root.scale.setScalar(scale);
    root.updateMatrixWorld(true);

    box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    root.position.x -= center.x;
    root.position.z -= center.z;
    root.position.y -= box.min.y;
    root.updateMatrixWorld(true);

    const materials = new Set();
    root.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const list = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of list) {
        if (!material) continue;
        materials.add(material);
        material.envMapIntensity = material.name === "DefaultMaterial" ? 2.6 : 1.9;
        if (material.name === "DefaultMaterial") {
          material.emissiveIntensity = 0.75;
        }
        if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
        if (material.emissiveMap) material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
        material.needsUpdate = true;
      }
    });

    const holder = new THREE.Group();
    holder.rotation.y = Math.PI / 2;
    holder.add(root);

    this.car = new THREE.Group();
    this.car.add(holder);
    this.scene.add(this.car);
    this.carModel = root;

    box = new THREE.Box3().setFromObject(this.car);
    this.carBounds = box;

    this.buildScanner(box);
    this.buildTaillight();
    this.onProgress(100);
  }

  buildScanner(box) {
    const size = box.getSize(new THREE.Vector3());
    const frontZ = box.min.z;
    const scannerY = size.y * 0.4;
    const group = new THREE.Group();
    group.position.set(0, scannerY, frontZ - 0.012);

    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(1.14, 0.17, 0.06),
      new THREE.MeshStandardMaterial({
        color: 0x030203,
        roughness: 0.3,
        metalness: 0.75,
        envMapIntensity: 1.2,
      }),
    );
    group.add(housing);

    const count = 16;
    const spacing = 0.066;
    const start = -((count - 1) * spacing) / 2;
    this.scannerSegments = [];
    for (let i = 0; i < count; i += 1) {
      const material = new THREE.MeshStandardMaterial({
        color: 0x120000,
        emissive: 0xff180d,
        emissiveIntensity: 0.1,
        roughness: 0.4,
        metalness: 0.1,
        toneMapped: true,
      });
      const segment = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.095, 0.018), material);
      segment.position.set(start + i * spacing, 0, 0.041);
      group.add(segment);
      this.scannerSegments.push(material);
    }

    const glowTexture = makeRadialTexture(
      [
        [0, "rgba(255, 56, 34, 0.9)"],
        [0.38, "rgba(255, 28, 14, 0.34)"],
        [1, "rgba(0,0,0,0)"],
      ],
      128,
    );
    this.scannerGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xff2a16,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    );
    this.scannerGlow.scale.set(1.5, 0.44, 1);
    this.scannerGlow.position.set(0, 0, 0.02);
    group.add(this.scannerGlow);

    this.car.add(group);
    this.scanner = group;
  }

  buildTaillight() {
    const texture = makeRadialTexture(
      [
        [0, "rgba(255, 24, 10, 0.8)"],
        [0.45, "rgba(255, 12, 4, 0.24)"],
        [1, "rgba(0,0,0,0)"],
      ],
      128,
    );
    this.taillightGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: 0xff1c0e,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    );
    this.taillightGlow.position.set(0, 0.5, 2.55);
    this.taillightGlow.scale.set(2.4, 0.55, 1);
    this.car.add(this.taillightGlow);
  }

  setupInput() {
    const canvas = this.canvas;
    canvas.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      this.dragging = true;
      this.pointerId = event.pointerId;
      this.orbit.lastX = event.clientX;
      this.orbit.lastY = event.clientY;
      this.orbit.baseYaw = this.orbit.targetYaw;
      this.orbit.baseHeight = this.orbit.targetHeight;
      this.orbit.moved = false;
      canvas.setPointerCapture(event.pointerId);
    });

    canvas.addEventListener("pointermove", (event) => {
      if (!this.dragging || event.pointerId !== this.pointerId) return;
      const dx = event.clientX - this.orbit.lastX;
      const dy = event.clientY - this.orbit.lastY;
      if (Math.abs(dx) + Math.abs(dy) > 2) this.orbit.moved = true;
      const sensitivity = 0.0028;
      this.orbit.targetYaw = clamp(this.orbit.baseYaw - dx * sensitivity, -0.88, 0.28);
      this.orbit.targetHeight = clamp(this.orbit.baseHeight + dy * 0.0038, 0.85, 2.8);
    });

    const end = (event) => {
      if (event.pointerId !== this.pointerId) return;
      this.dragging = false;
      this.pointerId = null;
      this.orbit.baseYaw = this.orbit.targetYaw;
      this.orbit.baseHeight = this.orbit.targetHeight;
    };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);

    canvas.addEventListener("wheel", (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      this.orbit.targetHeight = clamp(this.orbit.targetHeight + event.deltaY * 0.0012, 0.85, 2.8);
    }, { passive: false });
  }

  setupResize() {
    this.resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.fov = this.isMobile && width / height < 0.9 ? 43 : 37;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.6 : 2));
      this.renderer.setSize(width, height, false);
      this.composer?.setSize(width, height);
      this.applyCameraLayout();
    };
    window.addEventListener("resize", this.resize);
  }

  setHeadlights(enabled) {
    this.headlights = enabled;
    for (const spotlight of this.headlightSpots) spotlight.visible = enabled;
    for (const sprite of this.headlightSprites) sprite.visible = enabled;
  }

  startBoost(duration = 4.2) {
    this.boosting = true;
    this.boostUntil = performance.now() + duration * 1000;
    return this.boosting;
  }

  isBoosting() {
    return this.boosting;
  }

  getSpeed() {
    return this.displaySpeed;
  }

  animate() {
    this.raf = requestAnimationFrame(() => this.animate());
    const delta = Math.min(this.clock.getDelta(), 0.05);
    this.time += delta;

    if (this.boosting && performance.now() > this.boostUntil) {
      this.boosting = false;
      this.onBoostEnd?.();
    }

    const boostTarget = this.boosting ? 1 : 0;
    this.boostFactor = damp(this.boostFactor, boostTarget, 3.6, delta);
    const targetSpeed = 92 + this.boostFactor * 228;
    this.displaySpeed = damp(this.displaySpeed, targetSpeed, this.boosting ? 5 : 2.4, delta);
    this.speed = this.displaySpeed;

    this.updateCamera(delta);
    this.updateRoad(delta);
    this.updateCar(delta);
    this.updateScanner(delta);
    this.updateHeadlights();
    this.updateAtmosphere(delta);

    if (this.bloom) this.bloom.strength = damp(this.bloom.strength, this.boosting ? 0.72 : 0.36, 4, delta);
    this.composer.render();
  }

  updateCamera(delta) {
    const idleYaw = this.reducedMotion || this.dragging ? 0 : Math.sin(this.time * 0.11) * 0.035;
    const idleHeight = this.reducedMotion || this.dragging ? 0 : Math.sin(this.time * 0.17) * 0.018;
    const desiredYaw = this.orbit.targetYaw + (this.dragging ? 0 : idleYaw);
    const desiredHeight = this.orbit.targetHeight + idleHeight;

    this.orbit.yaw = damp(this.orbit.yaw, desiredYaw, 5.5, delta);
    this.orbit.height = damp(this.orbit.height, desiredHeight, 5.5, delta);

    const distance = this.baseDistance - this.boostFactor * 0.72;
    const pivot = this.cameraPivot;
    const target = this.cameraTarget.clone();
    target.y += 0.02 * Math.sin(this.time * 1.3);

    const shake = (this.reducedMotion ? 0 : this.boostFactor) * 0.045;
    const shakeX = (Math.random() - 0.5) * shake;
    const shakeY = (Math.random() - 0.5) * shake * 0.7;

    this.camera.position.set(
      pivot.x + Math.sin(this.orbit.yaw) * distance + shakeX,
      this.orbit.height + shakeY,
      pivot.z - Math.cos(this.orbit.yaw) * distance,
    );
    this.camera.lookAt(target);
    this.camera.rotation.z += (Math.random() - 0.5) * shake * 0.06;
  }

  updateRoad(delta) {
    if (!this.road) return;
    const metersPerSecond = (this.displaySpeed / 3.6) * 0.72;
    const travel = metersPerSecond * delta;
    this.roadTravel += travel;

    const matrix = this.postMatrix;
    const rotation = this.postRotation;
    const scale = this.postScale;

    for (let i = 0; i < this.dashData.length; i += 1) {
      let z = this.dashData[i] - travel;
      if (z < -10) z += 304;
      this.dashData[i] = z;
      matrix.compose(new THREE.Vector3(-2.55, -0.026, z), rotation, new THREE.Vector3(1, 1, 1));
      this.dashes.setMatrixAt(i, matrix);
    }
    this.dashes.instanceMatrix.needsUpdate = true;

    let index = 0;
    for (let side = 0; side < 2; side += 1) {
      const x = side === 0 ? -7.15 : 7.15;
      for (let i = 0; i < this.postData.length / 2; i += 1) {
        const entry = this.postData[index];
        entry.z -= travel;
        if (entry.z < -8) entry.z += 282;
        matrix.compose(new THREE.Vector3(x, 0.39, entry.z), rotation, scale);
        this.posts.setMatrixAt(index, matrix);
        matrix.compose(new THREE.Vector3(x, 0.81, entry.z), rotation, scale);
        this.postLights.setMatrixAt(index, matrix);
        index += 1;
      }
    }
    this.posts.instanceMatrix.needsUpdate = true;
    this.postLights.instanceMatrix.needsUpdate = true;
  }

  updateCar(delta) {
    if (!this.car) return;
    const bob = Math.sin(this.time * 1.6) * 0.007 + Math.sin(this.time * 3.7) * 0.0025;
    this.car.position.y = bob;
    this.car.position.z = damp(this.car.position.z, this.boostFactor * 0.18, 4, delta);
    this.car.rotation.x = damp(this.car.rotation.x, this.boostFactor * 0.028, 4, delta);
    this.car.rotation.z = Math.sin(this.time * 1.13) * 0.0025;

    this.carGlow.position.x = this.car.position.x;
    this.carGlow.position.z = this.car.position.z;
    this.carGlow.material.opacity = 0.28 + this.boostFactor * 0.24 + Math.sin(this.time * 2.1) * 0.02;
    this.carGlow.scale.setScalar(1 + this.boostFactor * 0.08);

    if (this.taillightGlow) {
      this.taillightGlow.material.opacity = 0.48 + this.boostFactor * 0.22;
    }
  }

  updateScanner(delta) {
    if (!this.scannerSegments) return;
    const speed = this.boosting ? 5.6 : 2.3;
    const cycle = (this.time * speed) % 2;
    const sweep = cycle < 1 ? cycle * 2 - 1 : 3 - cycle * 2;
    const count = this.scannerSegments.length;

    for (let i = 0; i < count; i += 1) {
      const normalized = (i / (count - 1)) * 2 - 1;
      const distance = normalized - sweep;
      const energy = Math.exp(-(distance * distance) / 0.022);
      const intensity = 0.12 + energy * (this.boosting ? 5.6 : 3.9);
      this.scannerSegments[i].emissiveIntensity = intensity;
    }

    if (this.scannerGlow) {
      this.scannerGlow.material.opacity = 0.2 + (Math.sin(this.time * speed * Math.PI) * 0.5 + 0.5) * 0.34;
    }
    if (this.scannerLight) {
      this.scannerLight.intensity = 0.6 + (Math.sin(this.time * speed * Math.PI) * 0.5 + 0.5) * (this.boosting ? 8 : 4.2);
    }
  }

  updateHeadlights() {
    if (!this.headlights) return;
    const flicker = 0.96 + Math.sin(this.time * 11.7) * 0.012 + Math.sin(this.time * 23.1) * 0.008;
    for (const spot of this.headlightSpots) spot.intensity = 85 * flicker;
    for (const sprite of this.headlightSprites) {
      const pulse = 0.2 + Math.sin(this.time * 8.3) * 0.02;
      sprite.material.opacity = pulse;
    }
  }

  updateAtmosphere(delta) {
    if (this.towerLight) {
      const pulse = Math.sin(this.time * 2.2) > 0.2 ? 1 : 0.15;
      this.towerLight.material.opacity = pulse;
      this.towerLight.visible = Math.random() > 0.04 || pulse > 0.5;
    }
    if (this.towerGlow) this.towerGlow.material.opacity = 0.35 + Math.sin(this.time * 2.2) * 0.3;
    if (this.moon) this.moon.material.opacity = 0.92 + Math.sin(this.time * 0.4) * 0.03;
  }
}
