import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GLB from './models/hue.glb';

// ----- 주제: 애니메이션

export default function example() {
  // Renderer
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('gray');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 1.5;
  camera.position.z = 2;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  // Helper
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // gltf loader
  let mixer: THREE.AnimationMixer | null = null;
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(GLB, (gltf) => {
    const mesh = gltf.scene.children[0];
    mesh.receiveShadow = true;
    scene.add(mesh);

    mixer = new THREE.AnimationMixer(mesh);
    const actions = [];
    actions[0] = mixer.clipAction(gltf.animations[0]);
    actions[1] = mixer.clipAction(gltf.animations[1]);

    actions[0].repetitions = 2; // 반복횟수
    // actions[0].clampWhenFinished = true; // 애니메이션을 시작함 액션으로 멈추게함
    actions[0].play();

    console.log(mixer);
  });

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    controls.update();
    mixer?.update(delta);
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
