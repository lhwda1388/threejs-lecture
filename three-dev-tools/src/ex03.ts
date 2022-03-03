import * as THREE from 'three';
import dat from 'dat.gui';

// ----- 주제: GUI 컨트롤
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

  camera.position.x = 1;
  camera.position.z = 5;

  scene.add(camera);
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionLight = new THREE.DirectionalLight(0xffffff, 1);
  directionLight.position.x = 1;
  directionLight.position.z = 2;
  scene.add(directionLight);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'seagreen',
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 2;
  scene.add(mesh);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(mesh.position, 'y', -5, 5, 1).name('position y');
  gui.add(mesh.position, 'x', -5, 5, 1).name('position x');
  gui.add(mesh.position, 'z').min(-10).max(3).step(0.01).name('position z');
  gui.add(camera.position, 'x', -10, 10, 0.01).name('카메라 x');
  gui.add(camera.position, 'y', -10, 10, 0.01).name('카메라 y');
  gui.add(camera.position, 'z', -10, 10, 0.01).name('카메라 z');

  camera.lookAt(mesh.position);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;
    camera.lookAt(mesh.position);
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
