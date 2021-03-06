import { Material, World } from 'cannon-es';
import { BoxGeometry, MeshPhongMaterial, Scene, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GlassCrashSound from './sounds/glass_crash.mp3';
import StrongGlassCrashSound from './sounds/strong_glass_crash.mp3';

export const cm1 = {
  scene: new Scene(),
  gltfLoader: new GLTFLoader(),

  //cannon
  world: new World(),
  defaultMaterial: new Material('default'),
  glassMaterial: new Material('glass'),
  playerMaterial: new Material('player'),
};

export const cm2 = {
  backgroundColor: '#3e1322',
  lightColor: '#ffe9ac',
  lightOffColor: '#eee',
  pillarColor: '#071d28',
  floorColor: '#111',
  barColor: '#441c1d',
  glassColor: '#9fdfff',
  step: 0,
};

export const geo = {
  floor: new BoxGeometry(200, 1, 200),
  pillar: new BoxGeometry(5, 10, 5),
  bar: new BoxGeometry(0.1, 0.3, 1.2 * 21),
  sideLight: new SphereGeometry(0.1, 6, 6),
  glass: new BoxGeometry(1.2, 0.05, 1.2),
};

export const mat = {
  floor: new MeshPhongMaterial({
    color: cm2.floorColor,
  }),
  pillar: new MeshPhongMaterial({
    color: cm2.pillarColor,
  }),
  bar: new MeshPhongMaterial({
    color: cm2.barColor,
  }),
  sideLight: new MeshPhongMaterial({
    color: cm2.lightColor,
  }),
  glass1: new MeshPhongMaterial({
    color: cm2.glassColor,
    transparent: true,
    opacity: 0.1,
  }),
  glass2: new MeshPhongMaterial({
    color: cm2.glassColor,
    transparent: true,
    opacity: 0.1,
  }),
};

const normalSound = new Audio();
normalSound.src = GlassCrashSound;

const strongSound = new Audio();
strongSound.src = StrongGlassCrashSound;

export const sounds = {
  normal: normalSound,
  strong: strongSound,
};
