import * as THREE from 'three';

/**
 * 빛, 조명
 */
export default () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // window.devicePixelRatio : 해당기기의 픽셀 비율
  // 레티나 디스플레이등의 고해상 처리를 위해 필요
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  const aspect = window.innerWidth / window.innerHeight;

  // Camera
  // 기본 카메라 위치는 (0,0,0)
  // PerspectiveCamera : 원근카메라(사람눈)
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    aspect, // 종횡비(aspect)
    0.1,
    1000,
  );

  camera.position.x = 2;
  camera.position.y = 2;
  camera.position.z = 5;

  // Light
  // DirectionalLight : 태양빛과 흡사
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 2;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // Draw
  renderer.render(scene, camera);

  const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // 카메라 투영에 관련된 값이 변화가 있는 경우 실행
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Event
  window.addEventListener('resize', resizeHandler);
};
