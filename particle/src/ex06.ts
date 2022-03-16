import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ImagePanel from './ImagePanel';
import Image01 from './images/01.jpg';
import Image02 from './images/02.jpg';
import Image03 from './images/03.jpg';
import Image04 from './images/04.jpg';
import Image05 from './images/05.jpg';

// ----- 주제: 형태변환 이미지 패널

const Images: { [key: string]: string } = {
  Image01,
  Image02,
  Image03,
  Image04,
  Image05,
};

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
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Mesh
  const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);

  // Points
  const textureLoader = new THREE.TextureLoader();

  const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
  const positionArray = sphereGeometry.getAttribute('position').array;

  // 여러개의 plane mesh
  for (let i = 0; i < positionArray.length; i += 3) {
    const imageSrc = Images[`Image0${Math.ceil(Math.random() * 5)}`];
    const imagePanel = new ImagePanel({
      scene,
      textureLoader,
      geometry: planeGeometry,
      imageSrc,
      x: positionArray[i],
      y: positionArray[i + 1],
      z: positionArray[i + 2],
    });
  }

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
