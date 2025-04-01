import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
console.log(OrbitControls);

const scene = new THREE.Scene();
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "green" });

const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.x = 2;
const mesh3 = new THREE.Mesh(geometry, material);
mesh3.position.x = -2;

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

// const axisHelper = new THREE.AxesHelper(5);
// scene.add(axisHelper);

camera.position.z = 3;

const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
group.add(mesh3);

scene.add(group);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas,
  // option 1: to reduce stair case effect
  antialias: true,
});

//initilising controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
renderer.setSize(window.innerWidth, window.innerHeight);
// option 2: to reduce stair case effect
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();

console.log(window.devicePixelRatio);
