import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log(OrbitControls);

const scene = new THREE.Scene();
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});

const mesh1 = new THREE.Mesh(geometry, material);

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

// clock
const clock = new THREE.Clock();
let previousTime = 0;

const renderLoop = () => {
  // unconrtolled display - spins based on device FPS
  // group.rotation.x += THREE.MathUtils.degToRad(1);
  // group.rotation.y += THREE.MathUtils.degToRad(1);
  // group.rotation.z += THREE.MathUtils.degToRad(1);

  // console.log(clock.getElapsedTime());
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  // console.log(deltaTime);

  previousTime = elapsedTime;

  // control display rate - spins on a constant FPS irrespective of device FPS
  // rotation
  // group.rotation.y += THREE.MathUtils.degToRad(1) * deltaTime * 10;
  // group.rotation.x += THREE.MathUtils.degToRad(1) * deltaTime * 10;
  // group.rotation.z += THREE.MathUtils.degToRad(1) * deltaTime * 10;

  // position
  // group.position.x = Math.sin(elapsedTime);
  // group.position.y = Math.sin(elapsedTime);
  // group.position.z = Math.sin(elapsedTime);

  // scale
  group.scale.x = Math.sin(elapsedTime) * 0.5 + 1; // by multyplying with 0.5 it chnages the scale from 0 to 1 instead of 0 to 2 & by adding 1 it makes it 1 to 2 instead of -1 to 1
  // group.scale.y = Math.sin(elapsedTime);
  // group.scale.z = Math.sin(elapsedTime);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();

console.log(window.devicePixelRatio);
