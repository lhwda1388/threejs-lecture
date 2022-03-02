import * as THREE from 'three';

/**
 * 애니메이션 처리 기본
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

  const resizeHandler = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    // 카메라 투영에 관련된 값이 변화가 있는 경우 실행
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Draw
  const clock = new THREE.Clock();
  const draw = () => {
    // console.log(clock.getElapsedTime());
    const time = clock.getElapsedTime(); //각기기 마다 frame이 다를수 있기 대문에 타임으로 값을 조절해준다.
    // 360도 === 2파이
    // mesh.rotation.x += 0.01; // 라디안
    // 1라디안 === 180도 / 파이
    // 1도 === (파이 / 180) 라디안
    // 파이 라디안 === 180도
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.rotation.y = 2 * time;
    mesh.position.y = time;
    if (mesh.position.y > time) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  };

  // Event
  window.addEventListener('resize', resizeHandler);
  draw();
};
