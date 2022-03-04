import * as THREE from 'three';

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import KeyController from './KeyController';

// ----- 주제: 마인크래프트 스타일 컨트롤러

export default function example() {
  // Renderer
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls

  const controls = new PointerLockControls(camera, renderer.domElement);
  controls.domElement.addEventListener('click', () => {
    controls.lock();
  });

  controls.addEventListener('lock', () => {
    console.log('lock');
  });

  controls.addEventListener('unlock', () => {
    console.log('unlock');
  });

  const keyController = new KeyController();

  const walk = () => {
    if (!controls.isLocked) return;
    if (keyController.keys['KeyW'] || keyController.keys['ArrowUp']) {
      controls.moveForward(0.05);
    } else if (keyController.keys['KeyS'] || keyController.keys['ArrowDown']) {
      controls.moveForward(-0.05);
    } else if (keyController.keys['KeyA'] || keyController.keys['ArrowLeft']) {
      controls.moveRight(-0.05);
    } else if (keyController.keys['KeyD'] || keyController.keys['ArrowRight']) {
      controls.moveRight(0.05);
    }
  };

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 30; i++) {
    // 최소 범위 rgb 50 부터 나오게(검정바탕에선 안보임)
    const material = new THREE.MeshStandardMaterial({
      color: `rgb(
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)})
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5; // 좌표의 범위를 -범위도 주기위해
    mesh.position.y = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    walk();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
