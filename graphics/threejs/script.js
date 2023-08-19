import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let model;
const loader = new GLTFLoader();

loader.load(
  "./res/barbie_dodge.glb",
  function (gltf) {
    model = gltf;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const directionalLight1 = new THREE.DirectionalLight(0x0000ff, 0.5);
scene.add(directionalLight1);
const directionalLight2 = new THREE.DirectionalLight(0xff0000, 0.5);
scene.add(directionalLight2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

camera.position.y = 2;
camera.position.z = 8;
camera.lookAt(0, 1, 0);

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.scene.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

animate();
