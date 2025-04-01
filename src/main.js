// Reference: https://freepbr.com/

import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { label, min, step } from "three/tsl";
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
const spaceCruiserAlbedo = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png"
);
const spaceCruiserAo = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png"
);
const spaceCruiserHeight = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png"
);
const spaceCruiserMetallic = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png"
);
const spaceCruiserRoughness = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png"
);
const spaceCruiserNormal = textureLoader.load(
  "static/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png"
);

const material = new THREE.MeshStandardMaterial();
material.map = spaceCruiserAlbedo;
material.roughnessMap = spaceCruiserRoughness;
material.metalnessMap = spaceCruiserMetallic;
material.aoMap = spaceCruiserAo;
material.normalMap = spaceCruiserNormal;
material.displacementMap = spaceCruiserHeight; // increased cost of rendering as this will need more number of triangles. use whispy grass texture to get more insite on this

material.displacementScale = 0;

const pane = new Pane();
const f1 = pane.addFolder({ title: "Material Properties" });
f1.addInput(material, "metalness", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Metalness",
});

f1.addInput(material, "roughness", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Roughness",
});

f1.addInput(material, "aoMapIntensity", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "AO Intensity",
});

f1.addInput(material, "normalScale", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Normal",
});

f1.addInput(material, "displacementScale", {
  min: 0,
  max: 1,
  step: 0.01,
  label: "Height",
});

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(torusKnotGeometry, material);
mesh2.position.x = 2;
const mesh3 = new THREE.Mesh(sphereGeometry, material);
mesh3.position.y = 2;
const mesh4 = new THREE.Mesh();
mesh4.geometry = cylinderGeometry;
mesh4.material = material;
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

const f2 = pane.addFolder({ title: "Camera Properties" });
f2.addInput(camera, "position", {
  x: {
    min: 1,
    max: 30,
    step: 1,
  },
  y: {
    min: 1,
    max: 30,
    step: 1,
  },
  z: {
    min: 1,
    max: 30,
    step: 1,
  },
  label: "Camera",
});

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

  // scene.children.forEach((child) => {
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.x += 0.01;
  //   }
  // });

  // group.children.forEach((child) => {
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.z += 0.01;
  //   }
  // });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();
