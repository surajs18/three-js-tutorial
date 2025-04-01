import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log(OrbitControls);

const scene = new THREE.Scene();
// console.log(scene);

// custom geometry
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", bufferAttribute);

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

camera.position.z = 3;

scene.add(mesh1);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

//initilising controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;
renderer.setSize(window.innerWidth, window.innerHeight);

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
