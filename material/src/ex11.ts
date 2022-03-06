import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gradient from './textures/gradient.png';

// ----- 주제: MeshNormalMaterial
// normal(법선) 관련된 머테리얼
// 법선이란 평면곡선 위의 한 점을 지나고 그 점을 지나는 접선에 수직한 직선을 법선이라 한다..

export default function example() {
  // 텍스터 이미지 로드
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    console.log('로드 시작');
  };

  loadingManager.onProgress = (img) => {
    console.log(img + ' 로드');
  };

  loadingManager.onLoad = () => {
    console.log('로드완료');
  };

  loadingManager.onError = () => {
    console.log('에러');
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const gradientTexture = textureLoader.load(gradient);

  gradientTexture.magFilter = THREE.NearestFilter; // 만화스러우 느낌을 위해 텍스쳐의 픽셀을 살림

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
  // const geometry = new THREE.SphereGeometry(1, 64, 64);

  const material = new THREE.MeshNormalMaterial({});

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
