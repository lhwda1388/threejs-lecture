import {
  AnimationClip,
  BufferGeometry,
  Material,
  Mesh,
  Object3D,
  Quaternion,
  Vector3,
} from 'three';
import { cm1 } from './common';
import { Material as CannonMaterial, Box, Vec3, Body } from 'cannon-es';

export interface StuffOptions {
  name: string;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  depth?: number;
  cannonMaterial?: CannonMaterial;
  mass?: number;
}

class Stuff<
  T extends StuffOptions,
  G extends BufferGeometry,
  M extends Material,
> {
  protected _options: T;
  protected _geometry?: G;
  protected _material?: M;
  protected _mesh?: Mesh<G, M> | (Object3D & { animations: AnimationClip[] });
  protected _modelMesh?: Object3D & { animations: AnimationClip[] };
  protected _cannonBody?: Body;

  constructor({
    name = '',
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    width = 1,
    height = 1,
    depth = 1,
    cannonMaterial = cm1.defaultMaterial,
    mass = 0,
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
      width,
      height,
      depth,
      cannonMaterial,
      mass,
      ...options,
    } as T;
  }

  get mesh() {
    return this._mesh as Mesh;
  }

  get modelMesh() {
    return this._modelMesh as Mesh;
  }

  get name() {
    return this._options.name;
  }

  get cannonBody() {
    return this._cannonBody as Body;
  }

  setMesh() {
    if (!this._geometry) return;
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
    this._mesh.name = this._options.name;
    cm1.scene.add(this._mesh);
  }

  setCannonBody() {
    const material = this._options.cannonMaterial;
    const shape = new Box(
      new Vec3(
        (this._options.width as number) / 2,
        (this._options.height as number) / 2,
        (this._options.depth as number) / 2,
      ),
    );
    this._cannonBody = new Body({
      mass: this._options.mass,
      position: new Vec3(this._options.x, this._options.y, this._options.z),
      shape,
      material,
    });
    this._cannonBody.quaternion.setFromAxisAngle(
      new Vec3(0, 1, 0),
      this._options.rotationY as number,
    );

    cm1.world.addBody(this._cannonBody);
  }

  updatePosition() {
    if (!this?._cannonBody) return;
    this._mesh?.position.copy(
      this?._cannonBody?.position as unknown as Vector3,
    );

    this._modelMesh?.position.copy(
      this?._cannonBody?.position as unknown as Vector3,
    );
  }

  updateRotation() {
    if (!this?._cannonBody) return;
    this._mesh?.quaternion.copy(
      this?._cannonBody?.quaternion as unknown as Quaternion,
    );
    this._modelMesh?.quaternion.copy(
      this?._cannonBody?.quaternion as unknown as Quaternion,
    );
  }
}

export default Stuff;
