import { BoxGeometry, MeshPhongMaterial, Scene, SphereGeometry } from 'three';

export const cm1 = {
  canvas: document.getElementById('canvas') as HTMLCanvasElement,
  scene: new Scene(),
};

export const cm2 = {
  backgroundColor: '#3e1322',
  lightColor: '#ffe9ac',
  pillarColor: '#071d28',
  floorColor: '#111',
  barColor: '#441c1d',
};

export const geo = {
  floor: new BoxGeometry(200, 1, 200),
  pillar: new BoxGeometry(5, 10, 5),
  bar: new BoxGeometry(0.1, 0.3, 1.2 * 21),
  sideLight: new SphereGeometry(0.1, 6, 6),
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
};
