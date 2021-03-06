import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import PreventDragClick from './PreventDragClick';
import Domino from './Domino';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import MousePosClick from './MousePosClick';
import { Body } from 'cannon-es';

// ----- 주제: 도미노 물리엔진 처리

export default function example() {
  // Renderer
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Cannon(물리엔진)
  const cannonWorld = new CANNON.World();
  cannonWorld.gravity.set(0, -9.8, 0);

  // 성능을 위한 셋팅
  // cannonWorld.allowSleep = true; // body가 엄청 느려지면(멈췃을때) 테스트 안함
  cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);
  // broadphase
  // SAPBroadphase // 가장 많이 사용
  // NativeBroadphase // 기본
  // GridBroadphase // 구역을 나누어 테스트

  const defaultMaterial = new CANNON.Material('default');
  const rubberMaterial = new CANNON.Material('rubber');
  const ironMaterial = new CANNON.Material('iron');
  const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction: 0.01, // 마찰
      restitution: 0.9, // 반발
    },
  );

  cannonWorld.defaultContactMaterial = defaultContactMaterial;

  const rubberDefaultContactMaterial = new CANNON.ContactMaterial(
    rubberMaterial,
    defaultMaterial,
    {
      friction: 0.5,
      restitution: 0.7,
    },
  );

  cannonWorld.addContactMaterial(rubberDefaultContactMaterial);

  const ironDefaultContactMaterial = new CANNON.ContactMaterial(
    ironMaterial,
    defaultMaterial,
    {
      friction: 0.5,
      restitution: 0,
    },
  );

  cannonWorld.addContactMaterial(ironDefaultContactMaterial);

  const floorShape = new CANNON.Plane(); // 지오메트리 같은
  const floorBody = new CANNON.Body({
    mass: 0, // 중력 영향 X
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
    material: defaultMaterial,
  }); // 물리가 적용되는 실체
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);

  cannonWorld.addBody(floorBody);

  // Mesh
  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: 'slategray',
    }),
  );

  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;

  scene.add(floorMesh);
  // 도미노 생성
  const dominos: Domino[] = [];
  const gltfLoader = new GLTFLoader();

  for (let i = -3; i < 17; i++) {
    const domino = new Domino({
      index: i,
      scene,
      cannonWorld,
      z: -i * 0.8,
      gltfLoader,
    });

    dominos.push(domino);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // 주사율에 따른 제한
    let cannonStepTime = 1 / 60;
    if (delta < 0.01) cannonStepTime = 1 / 120;
    cannonWorld.step(cannonStepTime, delta, 3);

    dominos.forEach((item) => item.draw());

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // Raycaster
  const raycater = new THREE.Raycaster();
  const checkIntersects = () => {
    if (preventDragClick.mouseMoved) return;
    raycater.setFromCamera(mousePosClick.pos, camera);

    const intersects = raycater.intersectObjects<
      THREE.Object3D & {
        cannonBody?: Body;
      }
    >(scene.children);
    for (const item of intersects) {
      if (item.object?.cannonBody) {
        const meshDirection = new THREE.Vector3(
          item.object.position.x,
          item.object.position.y,
          item.object.position.z,
        );
        meshDirection.normalize();
        const cameraDirection = new THREE.Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z,
        );
        cameraDirection.normalize();
        console.log(cameraDirection);
        item.object?.cannonBody?.applyForce(
          new CANNON.Vec3(0, 0, -cameraDirection.z * 100),
          new CANNON.Vec3(meshDirection.x, meshDirection.y, meshDirection.z),
        );
      }
      break;
    }
  };

  // 이벤트
  window.addEventListener('resize', setSize);

  const preventDragClick = new PreventDragClick(canvas);
  const mousePosClick = new MousePosClick(canvas);
  mousePosClick.afterClickEvent = checkIntersects;
  draw();
}
