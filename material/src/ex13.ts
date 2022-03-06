import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BaseColorBrick from '/textures/bricks/Brick_Wall_019_basecolor.jpg';
import AmbientOcclusionBrick from './textures/bricks/Brick_Wall_019_ambientOcclusion.jpg';
import HeightBrick from './textures/bricks/Brick_Wall_019_height.png';
import NormalBrick from './textures/bricks/Brick_Wall_019_normal.jpg';
import RoughnessBrick from './textures/bricks/Brick_Wall_019_roughness.jpg';

// ----- 주제: MeshStandardMaterial 효과 주기

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
  const baseColorTex = textureLoader.load(BaseColorBrick);
  const ambientOcclusionBrickTex = textureLoader.load(AmbientOcclusionBrick);
  const heightBrickTex = textureLoader.load(HeightBrick);
  const normalBrickTex = textureLoader.load(NormalBrick);
  const roughnessBrickTex = textureLoader.load(RoughnessBrick);

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
  const geometry = new THREE.BoxGeometry(3, 3, 3);

  const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: baseColorTex,
    roughness: 0.3,
    metalness: 0.3,
    normalMap: normalBrickTex, // 입체감을 주는 텍스쳐
    roughnessMap: roughnessBrickTex, // 거칠기 표현해주는 텍스쳐
    aoMap: ambientOcclusionBrickTex, // 그림자를 좀더 진하게 표현
    aoMapIntensity: 1,
    color: 'red',
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
