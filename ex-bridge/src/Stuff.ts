import { BufferGeometry, Material, Mesh } from 'three';
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
  protected _geometry?: BufferGeometry;
  protected _material?: Material;
  protected _mesh?: Mesh;

  constructor({
    name = '',
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    ...options
  }: T) {
    this._options = {
      name,
      x,
      y,
      z,
      rotationX,
      rotationY,
      rotationZ,
      ...options,
    } as T;
  }

  get mesh() {
    return this._mesh as Mesh;
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
