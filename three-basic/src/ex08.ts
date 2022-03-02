import * as THREE from 'three';
import gsap from 'gsap';

/**
 * animation 라이브러리 사용
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
  scene.fog = new THREE.Fog('black', 3, 7);

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

  camera.position.y = 1;
  camera.position.z = 5;

  // Light
  // DirectionalLight : 태양빛과 흡사
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const meshes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] =
    [];

  for (let i = 0; i < 10; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });
    material.color = new THREE.Color(
      `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255,
      )},${Math.floor(Math.random() * 255)})`,
    );

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = Math.random() * 10 - 5;
    // mesh.position.y = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // scene.add(mesh);

  const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    // 카메라 투영에 관련된 값이 변화가 있는 경우 실행
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Draw
  meshes.forEach((mesh) => {
    // gsap.to(mesh.position, {
    //   duration: 1,
    //   y: 1,
    // });
    gsap.to(mesh.rotation, {
      duration: 10,
      y: Math.PI * 2,
      repeat: -1,
    });
  });

  const draw = () => {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  };

  // Event
  window.addEventListener('resize', resizeHandler);
  draw();
};
