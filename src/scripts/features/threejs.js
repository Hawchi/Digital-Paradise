import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('three-canvas');
if (!canvas) {
  console.error('No #three-canvas found in the DOM.');
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0.4, 7);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.enablePan = false;
controls.enableZoom = false;

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(3, 5, 2);
scene.add(dir);

const colors = [0x00f5ff, 0xff4fd8, 0x7c3cff, 0x00ffb2, 0xffd000];

function neonMaterial(hex) {
  return new THREE.MeshStandardMaterial({
    color: hex,
    emissive: hex,
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.35,
    transparent: true,
    opacity: 0.95,
  });
}

const shapes = [];
const group = new THREE.Group();
scene.add(group);

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const triGeo = new THREE.TetrahedronGeometry(0.8, 0);
const pillGeo = new THREE.CapsuleGeometry(0.35, 0.9, 8, 16);

function addShape(type) {
    const hex = colors[(Math.random() * colors.length) | 0];
    const mat = neonMaterial(hex);
  
    let geo = boxGeo;
    if (type === 'tri') geo = triGeo;
    if (type === 'pill') geo = pillGeo;
  
    const mesh = new THREE.Mesh(geo, mat);

    const s = THREE.MathUtils.randFloat(0.7, 2.2);
  mesh.scale.setScalar(s);

  mesh.position.set(
    THREE.MathUtils.randFloat(-7, 7),
    THREE.MathUtils.randFloat(-3.5, 3.5),
    THREE.MathUtils.randFloat(-10, -2)
  );

  mesh.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );

  mesh.userData.vel = new THREE.Vector3(
    THREE.MathUtils.randFloat(-0.35, 0.35),
    THREE.MathUtils.randFloat(-0.22, 0.22),
    0
  );

  mesh.userData.spin = new THREE.Vector3(
    THREE.MathUtils.randFloat(-0.8, 0.8),
    THREE.MathUtils.randFloat(-0.8, 0.8),
    THREE.MathUtils.randFloat(-0.4, 0.4)
  );

  group.add(mesh);
  shapes.push(mesh);
}

for (let i = 0; i < 14; i++) addShape('box');
for (let i = 0; i < 6; i++) addShape('pill');
for (let i = 0; i < 6; i++) addShape('tri');

function wrap(mesh) {
  const xLimit = 9;
  const yLimit = 5;

  if (mesh.position.x > xLimit) mesh.position.x = -xLimit;
  if (mesh.position.x < -xLimit) mesh.position.x = xLimit;
  if (mesh.position.y > yLimit) mesh.position.y = -yLimit;
  if (mesh.position.y < -yLimit) mesh.position.y = yLimit;
}

const clock = new THREE.Clock();



// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x00f5ff,
  roughness: 0.3,
  metalness: 0.6,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light (you need light for MeshStandardMaterial)
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
