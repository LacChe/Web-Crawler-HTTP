import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  40 / -2,
  40 / 2,
  60 / 2,
  60 / -2,
  0.01,
  1000
);

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const directionalLight1 = new THREE.DirectionalLight(0x0000ff, 20);
directionalLight1.position.x = 0.5;
directionalLight1.position.y = 0;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xff0000, 20);
directionalLight2.position.z = 0.5;
directionalLight2.position.y = 0;
scene.add(directionalLight2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometryS = new THREE.SphereGeometry(5, 5, 5);
const materialS = new THREE.MeshLambertMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometryS, materialS);
scene.add(sphere);

sphere.position.y = 0;
sphere.position.x = -10;
sphere.position.z = -10;

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
