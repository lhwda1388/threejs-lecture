import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: OrbitControls

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
  controls.enableDamping = true; // 컨트롤에 무게감 적용
  // controls.enableZoom = false; // 줌 가능여부
  controls.maxDistance = 10; // 멀어질수있는 최대 거리
  controls.minDistance = 5;
  controls.minPolarAngle = THREE.MathUtils.degToRad(0);
  controls.maxPolarAngle = THREE.MathUtils.degToRad(180);
  // controls.target.set(2, 2, 2); // 회전의 중심점을 잡아줌
  controls.autoRotate = true; // 자동 회점
  controls.autoRotateSpeed = 3;

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 30; i++) {
    // 최소 범위 rgb 50 부터 나오게(검정바탕에선 안보임)
    const material = new THREE.MeshStandardMaterial({
      color: `rgb(
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)})
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5; // 좌표의 범위를 -범위도 주기위해
    mesh.position.y = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
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
