import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
console.log(OrbitControls);

const scene = new THREE.Scene();
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "green" });

const mesh = new THREE.Mesh(geometry, material);
// console.log(mesh);

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1 * aspectRatio,
  -1 * aspectRatio,
  0.1,
  200
);

camera.position.z = 5;

scene.add(mesh);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//initilising controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
