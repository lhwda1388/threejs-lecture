import * as THREE from 'three';

/**
 * Renderer, Camera, Mesh, OrthographicCamera를 다루는 예제
 */
export default () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

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

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  // OrthographicCamera : 직교카메라(거리에 따라 크기가 다르지 않음 - 주로 게임)
  // const camera = new THREE.OrthographicCamera(
  //   -aspect, // left
  //   aspect, // right
  //   1, // top
  //   -1, // bottom
  //   0.1,
  //   1000,
  // );

  // camera.position.x = 1;
  // camera.position.y = 2;
  // camera.position.z = 5;
  // camera.lookAt(0, 0, 0);
  // camera.zoom = 0.5;
  // camera.updateProjectionMatrix();

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // MeshBasicMaterial : 빛에 영향을 받지 않는 메시
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // Draw
  renderer.render(scene, camera);
};
