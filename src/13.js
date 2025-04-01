import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Pane } from "tweakpane";
// console.log(OrbitControls);

const canvas = document.querySelector("canvas.threejs");

const scene = new THREE.Scene();
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

// PBR - Physically Based Rendering
const material = new THREE.MeshPhysicalMaterial({
  color: "green",
});

const pane = new Pane();

pane.addInput(material, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Metalness",
});

pane.addInput(material, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Roughness",
});

pane.addInput(material, "clearcoat", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Clearcoat",
});

pane.addInput(material, "reflectivity", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Reflectivity",
});

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 2;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
// THREE.DoubleSide is a constant
// material.side = THREE.DoubleSide;
// or we can also use as console.log(THREE.DoubleSide) = 2
material.side = 2;
// default is material.side = THREE.FrontSide

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
camera.position.y = 3;
camera.position.x = 3;

// adds light inside objects in the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// adds light outside objects in the scene
const pointLight = new THREE.PointLight(0xffffff, 70);
pointLight.position.set(1, 1, 5);
scene.add(pointLight);

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//initilising controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

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
