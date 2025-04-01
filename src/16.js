// Reference: https://freepbr.com/

import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { label, step } from "three/tsl";
import { Pane } from "tweakpane";
// console.log(OrbitControls);

const canvas = document.querySelector("canvas.threejs");

const scene = new THREE.Scene();
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initilize the texture loader
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(
  "static/textures/space-cruiser-panels1-bl/space-cruiser-panels_albedo.png"
  // "static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);

texture.repeat.set(10, 10); //if used alone it will stretch the texture - stretches the last pixel along x & y axis, so we must use wrapS & wrapT
texture.wrapS = THREE.RepeatWrapping; // strectes the texture by repeating the complete image in X axis
texture.wrapT = THREE.RepeatWrapping; // strectes the texture by repeating the complete image in Y axis
// there are other options/constants(int) such as: THREE.RepeatWrapping, THREE.MirroredRepeatWrapping, THREE.ClampToEdgeWrapping(default)

const pane = new Pane();
pane.addInput(texture, "offset", {
  x: {
    min: -1,
    max: 1,
    step: 0.01,
  },
  y: {
    min: -1,
    max: 1,
    step: 0.01,
  },
  label: "Offset",
});

const material = new THREE.MeshBasicMaterial();
material.map = texture;

const plane = new THREE.Mesh(planeGeometry, material);
// plane.position.x = -2;
plane.rotateX(-(0.5 * Math.PI));
plane.scale.set(100, 100);
material.side = 2;

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(
  75 * aspectRatio,
  1 * aspectRatio,
  0.1,
  2000
);

camera.position.z = 5;
camera.position.y = 3;
// camera.position.x = 3;

// adds light inside objects in the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 70);
pointLight.position.set(1, 1, 5);

const group = new THREE.Group();
group.add(plane);

scene.add(pointLight);
scene.add(group);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
