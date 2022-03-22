import { Mesh } from 'three';
import { cm1 } from './common';

export interface StuffOptions {
  name: string;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
}

class Stuff<T extends StuffOptions> {
  protected _options: T;
  protected _geometry?: THREE.BufferGeometry;
  protected _material?: THREE.Material;
  protected _mesh?: THREE.Mesh;

  constructor({
    name = '',
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    ...options
  }) {
    this._options = {
      name,
      x,
      y,
      z,
      rotationX,
      rotationY,
      rotationZ,
      ...options,
    } as unknown as T;
  }

  get mesh() {
    return this._mesh as THREE.Mesh;
  }

  addMesh() {
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh?.position.set(
      this._options.x as number,
      this._options.y as number,
      this._options.z as number,
    );
    cm1.scene.add(this._mesh);
  }
}

export default Stuff;
