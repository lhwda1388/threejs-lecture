import * as THREE from 'three';
import dat from 'dat.gui';

// ----- 주제: Group(Scend Graph)

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
  scene.fog = new THREE.Fog('black', 4, 8);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 3;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);

  const sunGroup = new THREE.Group();
  const sun = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 'orange',
    }),
  );

  const earthGroup = new THREE.Group();
  const earth = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 'skyblue',
    }),
  );

  earth.scale.set(0.3, 0.3, 0.3);
  earthGroup.position.x = 2;

  // const moonGroup = new THREE.Object3D();
  const moonGroup = new THREE.Group();
  const moon = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 'gray',
    }),
  );
  moon.scale.set(0.15, 0.15, 0.15);
  moonGroup.position.x = 0.5;

  moonGroup.add(moon);
  earthGroup.add(earth, moonGroup);
  sunGroup.add(sun, earthGroup);

  scene.add(sunGroup);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // GridHelper
  const gridHelper = new THREE.GridHelper(10);
  scene.add(gridHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(camera.position, 'x', -5, 5, 0.1).name('카메라 X');
  gui.add(camera.position, 'y', -5, 5, 0.1).name('카메라 Y');
  gui.add(camera.position, 'z', 2, 10, 0.1).name('카메라 Z');

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    camera.lookAt(sunGroup.position);
    sunGroup.rotation.y += delta * 0.5;
    earthGroup.rotation.y += delta * 0.8;
    moonGroup.rotation.y += delta;
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
