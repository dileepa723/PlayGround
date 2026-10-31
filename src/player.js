import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { addBlobShadow } from './utils.js'

const skinTones = [0x8f5c3e, 0x6b422c, 0xc58f6b, 0x4d2f22, 0xe0b08c, 0x9c6a4a]
const jeans = [0x2c3b57, 0x30364a, 0x3e4a60, 0x26303f, 0x4a4f5c]
const hoodies = [0x2f6b4f, 0x374255, 0x6c2f42, 0xb48a45, 0x2e566c, 0x7b5a3d, 0x45414f]

function limb(mat, w, h, d, radius = 0.06) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, h / 2.1)), mat)
}

export function createCharacter({
  player = false,
  hoodie = 0x2f6b4f,
  pants = 0x2c3b57,
  skin = 0x8f5c3e,
  cap = true,
  capColor = 0x151a20,
} = {}) {
  const root = new THREE.Group()
  root.name = player ? 'player' : 'pedestrian'

  const skinMat = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.72, metalness: 0 })
  const hoodieMat = new THREE.MeshStandardMaterial({ color: hoodie, roughness: 0.82, metalness: 0.02 })
  const pantsMat = new THREE.MeshStandardMaterial({ color: pants, roughness: 0.9, metalness: 0.01 })
  const shoeMat = new THREE.MeshStandardMaterial({ color: player ? 0xe9e4d8 : 0x24252c, roughness: 0.6, metalness: 0.08 })
  const capMat = new THREE.MeshStandardMaterial({ color: capColor, roughness: 0.76 })
  const chainMat = new THREE.MeshStandardMaterial({ color: 0xffc857, metalness: 0.9, roughness: 0.25 })

  const hips = new THREE.Group()
  hips.position.y = 0.92
  root.add(hips)

  const torso = limb(hoodieMat, 0.5, 0.62, 0.29, 0.14)
  torso.position.y = 0.36
  hips.add(torso)

  if (player) {
    const hood = limb(hoodieMat, 0.34, 0.2, 0.2, 0.08)
    hood.position.set(0, 0.52, -0.18)
    hips.add(hood)
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.014, 5, 12, Math.PI * 0.9), chainMat)
    chain.position.set(0, 0.52, 0.16)
    chain.rotation.x = Math.PI / 2
    chain.rotation.z = Math.PI
    hips.add(chain)
  }

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.1, 8), skinMat)
  neck.position.y = 0.69
  hips.add(neck)

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), skinMat)
  head.scale.set(0.95, 1.05, 0.92)
  head.position.y = 0.84
  hips.add(head)

  if (cap) {
    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.158, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), capMat)
    crown.position.y = 0.885
    crown.scale.y = 0.8
    hips.add(crown)
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.025, 0.17), capMat)
    brim.position.set(0, 0.875, 0.15)
    brim.rotation.x = 0.08
    hips.add(brim)
  } else {
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.153, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), capMat)
    hair.position.y = 0.86
    hips.add(hair)
  }

  const shoulders = new THREE.Group()
  shoulders.position.y = 0.55
  hips.add(shoulders)

  const arms = []
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group()
    pivot.position.set(side * 0.32, 0.0, 0)
    const arm = limb(hoodieMat, 0.15, 0.5, 0.16, 0.07)
    arm.position.y = -0.24
    pivot.add(arm)
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), skinMat)
    hand.position.y = -0.5
    pivot.add(hand)
    if (player) {
      const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.17), new THREE.MeshStandardMaterial({ color: 0xe8e4da, roughness: 0.8 }))
      sleeve.position.y = -0.3
      pivot.add(sleeve)
    }
    shoulders.add(pivot)
    arms.push(pivot)
  }

  const legs = []
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group()
    pivot.position.set(side * 0.13, -0.02, 0)
    const leg = limb(pantsMat, 0.2, 0.62, 0.22, 0.08)
    leg.position.y = -0.34
    pivot.add(leg)
    const shoe = limb(shoeMat, 0.22, 0.12, 0.36, 0.05)
    shoe.position.set(0, -0.66, 0.05)
    pivot.add(shoe)
    hips.add(pivot)
    legs.push(pivot)
  }

  addBlobShadow(root, player ? 1.15 : 0.95, 0.7, 0.03)

  const character = {
    root,
    hips,
    torso,
    head,
    arms,
    legs,
    player,
    phase: Math.random() * 10,
    riding: false,
    dead: false,
    materials: { hoodieMat, pantsMat, skinMat },
  }
  root.userData.character = character
  return character
}

export function animateCharacter(char, speed, dt, { riding = false, t = 0 } = {}) {
  if (char.dead) {
    char.hips.rotation.z = THREE.MathUtils.lerp(char.hips.rotation.z, Math.PI / 2, 0.15)
    char.root.position.y = 0.3
    return
  }
  if (riding) {
    char.arms[0].rotation.x = -1.15
    char.arms[1].rotation.x = -1.15
    char.arms[0].rotation.z = 0.15
    char.arms[1].rotation.z = -0.15
    char.legs[0].rotation.x = -1.05
    char.legs[0].rotation.z = 0.25
    char.legs[1].rotation.x = -1.05
    char.legs[1].rotation.z = -0.25
    char.torso.rotation.x = 0.22
    return
  }
  const moving = speed > 0.25
  char.phase += dt * (moving ? speed * 2.1 : 1.1)
  const amp = moving ? Math.min(0.85, 0.28 + speed * 0.1) : 0.035
  const swing = Math.sin(char.phase * 2) * amp
  char.legs[0].rotation.x = swing
  char.legs[1].rotation.x = -swing
  char.arms[0].rotation.x = -swing * 0.85
  char.arms[1].rotation.x = swing * 0.85
  char.arms[0].rotation.z = 0.04
  char.arms[1].rotation.z = -0.04
  char.legs.forEach((l) => { l.rotation.z = 0 })
  char.torso.rotation.x = moving ? 0.09 + Math.min(0.1, speed * 0.02) : Math.sin(t * 1.2) * 0.014
  char.torso.rotation.z = moving ? Math.sin(char.phase * 2) * 0.035 : 0
  char.hips.position.y = 0.92 + (moving ? Math.abs(Math.sin(char.phase * 2)) * 0.035 : Math.sin(t * 1.4) * 0.008)
}

export function createPedestrian(seed = 0, palette = {}) {
  const skin = palette.skin ?? skinTones[seed % skinTones.length]
  const hoodie = palette.hoodie ?? hoodies[(seed * 3 + 1) % hoodies.length]
  const pants = palette.pants ?? jeans[(seed * 5 + 2) % jeans.length]
  return createCharacter({ skin, hoodie, pants, cap: seed % 3 !== 0, capColor: seed % 2 ? 0x1b1e24 : 0x5b3a2b })
}
