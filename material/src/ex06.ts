import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import baseBrick from '/textures/bricks/Brick_Wall_019_basecolor.jpg';

// ----- 주제: 텍스처 이미지 로드

export default function example() {
  // 텍스터 이미지 로드
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    baseBrick,
    () => {
      console.log('로드 완료');
    },
    () => {
      console.log('로드 진행중');
    },
    () => {
      console.log('로드 에러');
    },
  );

  console.log(texture);

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
  scene.background = new THREE.Color('white');

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
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: texture,
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
