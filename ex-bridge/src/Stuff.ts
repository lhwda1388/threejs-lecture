import { AnimationClip, BufferGeometry, Material, Mesh, Object3D } from 'three';
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
  protected _mesh?: Mesh | (Object3D & { animations: AnimationClip[] });

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

  get position() {
    return {
      x: this._options.x as number,
      y: this._options.y as number,
      z: this._options.z as number,
    };
  }

  addMesh() {
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh?.position.set(
      this._options.x as number,
      this._options.y as number,
      this._options.z as number,
    );
    this._mesh?.rotation.set(
      this._options.rotationX as number,
      this._options.rotationY as number,
      this._options.rotationZ as number,
    );
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    cm1.scene.add(this._mesh);
  }
}

export default Stuff;
