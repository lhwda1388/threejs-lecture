import 'index.scss';
import * as THREE from 'three';
import CreateScene from './CreateScene';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Modeler from './models/ilbuni.glb';
import { AnimationMixer, Mesh } from 'three';

// ----- 주제: 여러개의 캔버스 사용하기

// Renderer
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

const scene1 = new CreateScene({
  renderer,
  placeholder: '.canvas-placeholder.a',
  cameraPosition: {
    x: -1,
    y: 1,
    z: 2,
  },
});

scene1.set(() => {
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(-1, 2, 3);
  scene1.camera.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'green',
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene1.meshes.push(mesh);
  scene1.meshes.forEach((mesh) => scene1.scene.add(mesh));
});

const scene2 = new CreateScene({
  renderer,
  placeholder: '.canvas-placeholder.b',
  cameraPosition: {
    x: -1,
    y: 1,
    z: 2,
  },
});

scene2.set(() => {
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(-1, 2, 3);
  scene2.camera.add(light);

  const geometry = new THREE.BoxGeometry(0.4, 1, 0.7);
  const material = new THREE.MeshStandardMaterial({
    color: 'blue',
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene2.meshes.push(mesh);
  scene2.meshes.forEach((mesh) => scene2.scene.add(mesh));
});

const scene3 = new CreateScene({
  renderer,
  placeholder: '.canvas-placeholder.c',
  cameraPosition: {
    x: -1,
    y: 1,
    z: 2,
  },
});

scene3.set(() => {
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(-1, 2, 3);
  scene3.camera.add(light);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(Modeler, (glb) => {
    const mesh = glb.scene.children[0] as Mesh;
    scene3.meshes.push(mesh);
    scene3.meshes.forEach((mesh) => scene3.scene.add(mesh));

    const mixer = new AnimationMixer(mesh);
    mixer.clipAction(glb.animations[0]).play();

    scene3.mixer = mixer;
  });
});

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();
  scene1.render();
  scene1.meshes.forEach((mesh) => (mesh.rotation.y += delta));
  scene2.render();
  scene2.meshes.forEach((mesh) => (mesh.rotation.y += delta));
  scene3.render(delta);
  scene3.meshes.forEach((mesh) => (mesh.rotation.y += delta));
  renderer.setAnimationLoop(draw);
}

function setSize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 이벤트
window.addEventListener('resize', setSize);

draw();
