import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import px from './textures/cubemap/px.png';
import nx from './textures/cubemap/nx.png';
import py from './textures/cubemap/py.png';
import ny from './textures/cubemap/ny.png';
import pz from './textures/cubemap/pz.png';
import nz from './textures/cubemap/nz.png';

// ----- 주제: Skybox
// 메시를 둘러싸는 배경(scene에 적용)

export default function example() {
  // 텍스터 이미지 로드
  const cubeTextureLoader = new THREE.CubeTextureLoader();

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
  // scene.background = new THREE.Color('white');

  scene.background = cubeTextureLoader.load([
    // + - 순서
    px,
    nx,
    py,
    ny,
    pz,
    nz,
  ]);

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
  directionalLight.position.set(1, 1, 2);
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.autoRotate = true;

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,

    color: 'gold',
  });

  const mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    controls.update();
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
