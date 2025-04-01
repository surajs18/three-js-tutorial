import * as THREE from "three";
// console.log(THREE);
import { OrbitControls } from "three/examples/jsm/Addons.js";
// console.log(OrbitControls);

const scene = new THREE.Scene();
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "limeGreen",
});

const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
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

camera.position.z = 2;

// makes the scene foggy if camera is moved to 10, try setting line 38 to 7 or 9 to see the difference
const fog = new THREE.Fog(0xffffff, 1, 10);
scene.fog = fog;
material.fog = true;

// changes background color of the scene
scene.background = new THREE.Color("white");

scene.add(mesh);
scene.add(mesh2);
scene.add(plane);

const canvas = document.querySelector("canvas.threejs");
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
