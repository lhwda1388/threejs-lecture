import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

// ----- 주제: PointLight(전구)

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
  // AmbientLight : 전체적으로 은은한 조명(위치속성 없음)
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const light = new THREE.PointLight('white', 1, 100, 2);
  light.position.y = 3;

  scene.add(light);

  const lightHelper = new THREE.PointLightHelper(light);
  scene.add(lightHelper);

  // 그림자 설정
  // 그림자를 만들수 있는 빛
  light.castShadow = true;
  // 그림자가 그려지는 판의 크기 클수록 설명해짐 default: 512
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.radius = 15; // 사용하기 위해선 renderer.shadowMap.type = THREE.PCFSoftShadowMap
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 10;
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
    color: 'royalblue',
  });
  const material3 = new THREE.MeshStandardMaterial({
    color: 'gold',
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

    light.position.x = Math.cos(time) * 5;
    light.position.z = Math.sin(time) * 5;

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
