// Reference: https://freepbr.com/

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
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// initilize the texture loader
const textureLoader = new THREE.TextureLoader();

// initilize the texture
const textureTest = textureLoader.load(
  "static/textures/badlands-boulders-bl/badlands-boulders_albedo.png"
);

const textureTest2 = textureLoader.load(
  "static/textures/space-cruiser-panels1-bl/space-cruiser-panels_albedo.png"
);

const textureTest3 = textureLoader.load(
  "static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"
);
// console.log(textureTest);

const material = new THREE.MeshBasicMaterial();
material.map = textureTest;

const material2 = new THREE.MeshBasicMaterial();
material2.map = textureTest2;

const material3 = new THREE.MeshBasicMaterial();
material3.map = textureTest3;

const material4 = new THREE.MeshBasicMaterial({
  color: "red",
});
material4.map = textureTest;

const pane = new Pane();

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material2);
mesh2.position.x = 2;
const mesh3 = new THREE.Mesh(sphereGeometry, material3);
mesh3.position.y = 2;
const mesh4 = new THREE.Mesh();
mesh4.geometry = cylinderGeometry;
mesh4.material = material4;
mesh4.position.y = -2;

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

const group = new THREE.Group();
group.add(mesh, mesh2, mesh3, mesh4);
scene.add(group);

scene.add(pointLight);
// scene.add(mesh, mesh2, mesh3, mesh4);
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
  // mesh.rotateZ(0.01);

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.01;
    }
  });

  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.z += 0.01;
    }
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
