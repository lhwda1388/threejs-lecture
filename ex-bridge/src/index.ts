import './index.scss';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { cm1, cm2 } from './common';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Pillar from './Pillar';
import Floor from './Floor';
import Bar from './Bar';
import SideLight from './SideLight';
import Glass, { GlassMesh } from './Glass';
import Player from './Player';
import MousePosClick from './MousePosClick';
import Stuff, { StuffOptions } from './Stuff';
import { Mesh, BufferGeometry, Material, Vector3 } from 'three';
import gsap from 'gsap';
import PreventDragClick from './PreventDragClick';

// ----- 주제: The Bridge 게임 만들기

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

// Scene common.ts 에서 생성
cm1.scene.background = new THREE.Color(cm2.backgroundColor);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.x = -4;
camera.position.y = 19;
camera.position.z = 14;

const camera2 = camera.clone();
camera2.position.x = 0;
camera2.position.y = 0;
camera2.position.z = 0;
camera2.lookAt(0, 1, 0);

cm1.scene.add(camera, camera2);

// Light
const ambientLight = new THREE.AmbientLight(cm2.lightColor, 0.8);
cm1.scene.add(ambientLight);

const spotLightDistance = 50;

const spotLight1 = new THREE.SpotLight(cm2.lightColor, 1);
spotLight1.castShadow = true;
spotLight1.shadow.mapSize.width = 2048;
spotLight1.shadow.mapSize.height = 2048;
const spotLight2 = spotLight1.clone();
const spotLight3 = spotLight1.clone();
const spotLight4 = spotLight1.clone();
spotLight1.position.set(
  -spotLightDistance,
  spotLightDistance,
  spotLightDistance,
);
spotLight2.position.set(
  spotLightDistance,
  spotLightDistance,
  spotLightDistance,
);
spotLight3.position.set(
  -spotLightDistance,
  spotLightDistance,
  -spotLightDistance,
);
spotLight4.position.set(
  spotLightDistance,
  spotLightDistance,
  -spotLightDistance,
);

cm1.scene.add(spotLight1, spotLight2, spotLight3, spotLight4);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 물리엔진
cm1.world.gravity.set(0, -9.8, 0);

const defaultContactMaterial = new CANNON.ContactMaterial(
  cm1.defaultMaterial,
  cm1.defaultMaterial,
  {
    friction: 0.3,
    restitution: 0.2,
  },
);

const glassDefaultMaterial = new CANNON.ContactMaterial(
  cm1.glassMaterial,
  cm1.defaultMaterial,
  {
    friction: 1,
    restitution: 0,
  },
);

const playerGlassMaterial = new CANNON.ContactMaterial(
  cm1.playerMaterial,
  cm1.glassMaterial,
  {
    friction: 1,
    restitution: 0,
  },
);

cm1.world.defaultContactMaterial = defaultContactMaterial;
cm1.world.addContactMaterial(glassDefaultMaterial);
cm1.world.addContactMaterial(playerGlassMaterial);

// 물체 만들기
const glassUnitSize = 1.2;
const glassCount = 10;
const objects: Stuff<StuffOptions, BufferGeometry, Material>[] = [];

// 바닥
const floor = new Floor({
  name: 'floor',
});

// 기둥
const pillar1 = new Pillar({
  name: 'pillar',
  x: 0,
  y: 5.5,
  z: -glassUnitSize * 12 - glassUnitSize / 2,
});

const pillar2 = new Pillar({
  name: 'pillar2',
  x: 0,
  y: 5.5,
  z: glassUnitSize * 12 + glassUnitSize / 2,
});

objects.push(pillar1, pillar2);

// 바
const bar1 = new Bar({
  name: 'bar',
  x: -1.6,
  y: 10.3,
  z: 0,
});
const bar2 = new Bar({
  name: 'bar',
  x: -0.4,
  y: 10.3,
  z: 0,
});
const bar3 = new Bar({
  name: 'bar',
  x: 0.4,
  y: 10.3,
  z: 0,
});
const bar4 = new Bar({
  name: 'bar',
  x: 1.6,
  y: 10.3,
  z: 0,
});

// 사이드 라이트
const sideLights: SideLight[] = [];
for (let i = 0; i < 49; i++) {
  sideLights.push(
    new SideLight({
      name: 'sideLight',
      container: bar1.mesh,
      z: i * 0.5 - glassUnitSize * glassCount,
    }),
    new SideLight({
      name: 'sideLight4',
      container: bar4.mesh,
      z: i * 0.5 - glassUnitSize * glassCount,
    }),
  );
}

// 유리판
let glassTypeNumber = 0;
let glassTypes: ('normal' | 'strong')[] = [];
const glassZ: number[] = [];
for (let i = 0; i < glassCount; i++) {
  glassZ.push(-(i * glassUnitSize * 2 - glassUnitSize * (glassCount - 1)));
}
for (let i = 0; i < glassCount; i++) {
  glassTypeNumber = Math.round(Math.random());

  switch (glassTypeNumber) {
    case 0:
      glassTypes = ['normal', 'strong'];
      break;
    case 1:
      glassTypes = ['strong', 'normal'];
      break;
  }
  const glass1 = new Glass({
    step: i + 1,
    name: `glass-${glassTypes[0]}`,
    x: -1,
    y: 10.5,
    z: glassZ[i],
    type: glassTypes[0],
    cannonMaterial: cm1.glassMaterial,
  });
  const glass2 = new Glass({
    step: i + 1,
    name: `glass-${glassTypes[1]}`,
    x: 1,
    y: 10.5,
    z: glassZ[i],
    type: glassTypes[1],
    cannonMaterial: cm1.glassMaterial,
  });
  objects.push(glass1, glass2);
}

// 플레이어
const player = new Player({
  name: 'player',
  x: 0,
  y: 10.8,
  z: pillar2.cannonBody.position.z - 2,
  rotationY: Math.PI,
  cannonMaterial: cm1.playerMaterial,
  mass: 30,
});

objects.push(player);

// Raycaster

const raycaster = new THREE.Raycaster();
const mouse = new MousePosClick(canvas, (e) => {
  if (preventDragClick.mouseMoved) return;
  checkIntersects();
});

const checkIntersects = () => {
  raycaster.setFromCamera(mouse.pos, camera);

  const intersects = raycaster.intersectObjects(cm1.scene.children);
  for (const item of intersects) {
    checkClickedObject(item.object as Mesh);
    break;
  }
};

let fail = false;
let jumping = false;
let onReplay = false;
const checkClickedObject = (mesh: Mesh) => {
  if (mesh.name.indexOf('glass') !== -1) {
    // 유리판 클릭
    const asMesh = mesh as GlassMesh;
    if (!jumping && !fail && asMesh.step - cm2.step === 1) {
      jumping = true;
      cm2.step++;
      player.jump();
      switch (asMesh.type) {
        case 'normal': {
          const timerId = setTimeout(() => {
            fail = true;
            player.fall();
            sideLights.forEach((item) => item.turnOff());
            const timerId2 = setTimeout(() => {
              onReplay = true;
              player.cannonBody.position.y = 9;
              clearTimeout(timerId2);
              const timerId3 = setTimeout(() => {
                onReplay = false;
                clearTimeout(timerId3);
              }, 3000);
            }, 2000);
            clearTimeout(timerId);
          }, 700);

          break;
        }
        case 'strong':
          break;
      }
      const timerId = setTimeout(() => {
        jumping = false;
        clearTimeout(timerId);
      }, 1000);
      gsap.to(player.cannonBody.position, {
        duration: 1,
        x: mesh.position.x,
        z: mesh.position.z,
      });
      gsap.to(player.cannonBody.position, {
        duration: 0.4,
        y: 12,
      });
      if (cm2.step === glassCount && asMesh.type === 'strong') {
        const timerId = setTimeout(() => {
          player.jump();
          gsap.to(player.cannonBody.position, {
            duration: 1,
            x: 0,
            z: pillar1.cannonBody.position.z,
          });
          gsap.to(player.cannonBody.position, {
            duration: 0.4,
            y: 12,
          });

          clearTimeout(timerId);
        }, 1500);
      }
    }
  }
};

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  controls.update();
  player.update(delta);

  cm1.world.step(1 / 60, delta, 3);
  objects.forEach((item) => {
    if (item.name === 'player' && item.modelMesh) {
      item.updatePosition();
      if (fail) item.updateRotation();
      item.modelMesh.position.y += 0.15;
    } else {
      item.updatePosition();
      item.updateRotation();
    }
  });

  if (!onReplay) {
    renderer.render(cm1.scene, camera);
  } else {
    renderer.render(cm1.scene, camera2);
    camera2.position.z = player.cannonBody.position.z;
    camera2.position.x = player.cannonBody.position.x;
  }

  renderer.setAnimationLoop(draw);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(cm1.scene, camera);
}

// 이벤트
window.addEventListener('resize', setSize);

const preventDragClick = new PreventDragClick(canvas);

draw();
