import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

// ----- 주제: RectAreaLight(사각모양의 빛(조명판느낌))

export default function example() {
  // Renderer
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // 그림자 설정
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default
  // renderer.shadowMap.type = THREE.BasicShadowMap;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  // const ambientLight = new THREE.AmbientLight('white', 0.5);
  // scene.add(ambientLight);

  const light = new THREE.RectAreaLight('orange', 10, 2, 2);
  light.position.y = 2;
  light.position.z = 3;

  scene.add(light);

  const lightHelper = new RectAreaLightHelper(light);
  scene.add(lightHelper);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geomatery
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  // material
  const material1 = new THREE.MeshStandardMaterial({
    color: 'white',
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: 'white',
  });
  const material3 = new THREE.MeshStandardMaterial({
    color: 'white',
  });

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  plane.rotation.x = THREE.MathUtils.degToRad(-90);
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // 그림자설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  scene.add(plane, box, sphere);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, 'x', -5, 5, 0.1).name('light X');
  gui.add(light.position, 'y', -5, 5, 0.1).name('light Y');
  gui.add(light.position, 'z', 2, 10, 0.1).name('light Z');

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    // light.position.x = Math.cos(time) * 5;
    // light.position.z = Math.sin(time) * 5;

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
