import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 특정 방향의 광선(Ray)에 맞은 Mesh 판별

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

  // Mesh
  const lineMaterial = new THREE.LineBasicMaterial({ color: 'yellow' });
  const points: THREE.Vector3[] = [];
  points.push(new THREE.Vector3(0, 0, 100));
  points.push(new THREE.Vector3(0, 0, -100));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const guide = new THREE.Line(lineGeometry, lineMaterial);

  scene.add(guide);

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.name = 'box';

  const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
  const toursMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  toursMesh.name = 'tours';

  scene.add(boxMesh, toursMesh);

  const meshes = [boxMesh, toursMesh];

  const raycaster = new THREE.Raycaster();

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    boxMesh.position.y = Math.sin(time) * 2;
    toursMesh.position.y = Math.cos(time) * 2;
    boxMesh.material.color.set('plum');
    toursMesh.material.color.set('lime');

    // 광선을 쏘는 출발점
    // 위에 만들어놓은 노란선과 똑같이 맞춰줌
    const origin = new THREE.Vector3(0, 0, 100);
    // 방향(단위벡터)
    const direction = new THREE.Vector3(0, 0, -100);
    direction.normalize(); // 정규화
    raycaster.set(origin, direction);

    const intersects = raycaster.intersectObjects(meshes);
    intersects.forEach((item) => {
      (item.object as any)?.material?.color.set('red');
    });

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
