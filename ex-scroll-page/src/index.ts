import './index.scss';
import * as THREE from 'three';
import HouseModel from './models/house.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import House from './House';
import gsap from 'gsap';

// ----- 주제: 스크롤에 따라 움직이는 3D 페이지

// Renderer
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(-5, 2, 25);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight('white', 0.7);
spotLight.position.set(0, 150, 100);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

// Mesh
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: '#a1887f',
  }),
);

floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;

scene.add(floorMesh);

const gltfLoader = new GLTFLoader();

const houses: House[] = [];
const housePoses = [
  {
    x: -5,
    z: 20,
  },
  {
    x: 7,
    z: 10,
  },
  {
    x: -10,
    z: 0,
  },
  {
    x: 10,
    z: -10,
  },
  {
    x: -5,
    z: -20,
  },
];
housePoses.forEach(({ x, z }) => {
  houses.push(
    new House({
      scene,
      modelSrc: HouseModel,
      gltfLoader,
      x: x,
      z: z,
      height: 2,
    }),
  );
});

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

let currentSection = 0;
function setSection() {
  const newSection = Math.round(window.scrollY / window.innerHeight);
  if (currentSection !== newSection) {
    currentSection = newSection;
    const house = houses[currentSection];

    gsap.to(camera.position, {
      duration: 1,
      x: house.mesh.position.x,
      z: house.mesh.position.z + 5,
    });
  }
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
window.addEventListener('resize', setSize);
window.addEventListener('scroll', setSection);

draw();
