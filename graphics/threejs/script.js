import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  (window.innerWidth - 20) / (window.innerHeight - 20),
  0.1,
  1000
);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x = 5;
directionalLight.position.z = 10;
directionalLight.position.y = 10;
directionalLight.castShadow = true; // default false
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default
scene.add(directionalLight);

const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
helper.camera.scale.x = 2;
helper.camera.scale.y = 2;
helper.camera.scale.z = 2;
// scene.add(helper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

const verticesOfCube = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
];

const indicesOfFaces = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
];

/*
const geometry = new THREE.PolyhedronGeometry(
  verticesOfCube,
  indicesOfFaces,
  6,
  2
);
*/
const geometry = new THREE.SphereGeometry(10, 64, 64);

const texture = new THREE.TextureLoader().load("./res/2k_jupiter.jpg");
const material = new THREE.MeshLambertMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
scene.add(mesh);

// platform
const geometryPlatform = new THREE.RingGeometry(0, 15, 32);
const materialPlatform = new THREE.MeshLambertMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
const meshPlatform = new THREE.Mesh(geometryPlatform, materialPlatform);
meshPlatform.rotation.x = Math.PI / 2;
meshPlatform.rotation.y = Math.PI;
meshPlatform.position.y = -10;
meshPlatform.receiveShadow = true;
scene.add(meshPlatform);

camera.position.y = 5;
camera.position.x = 30;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("keydown", (e) => {
  // if (!e.repeat) return;
  if (e.keyCode === 39) {
    mesh.rotation.y += 0.05;
  }
  if (e.keyCode === 37) {
    mesh.rotation.y -= 0.05;
  }
});
