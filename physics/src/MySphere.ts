import { Body, Sphere, Vec3, World } from 'cannon-es';
import { Mesh } from 'three';

export default class MySphere {
  private _scene: THREE.Scene;
  private _cannonWorld: World;
  private _cannonBody?: Body;
  private _geometry: THREE.BufferGeometry;
  private _material: THREE.Material;
  private _x: number;
  private _y: number;
  private _z: number;
  private _scale: number;
  private _mesh: THREE.Mesh;

  constructor({
    scene,
    cannonWorld,
    geometry,
    material,
    x,
    y,
    z,
    scale,
  }: {
    scene: THREE.Scene;
    cannonWorld: World;
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    x: number;
    y: number;
    z: number;
    scale: number;
  }) {
    this._scene = scene;
    this._cannonWorld = cannonWorld;
    this._geometry = geometry;
    this._material = material;
    this._x = x;
    this._y = y;
    this._z = z;
    this._scale = scale;

    this._mesh = new Mesh(this._geometry, this._material);
    this.addMesh();
    this.addCannonBody();
  }

  get cannonBody() {
    return this._cannonBody;
  }

  get mesh() {
    return this._mesh;
  }

  addMesh() {
    this._mesh.position.set(this._x, this._y, this._z);
    this._mesh.scale.set(this._scale, this._scale, this._scale);
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    this._scene.add(this._mesh);
  }

  addCannonBody() {
    const originalRadius = (this._geometry as any).parameters.radius;
    const shape = new Sphere(originalRadius * this._scale);
    this._cannonBody = new Body({
      mass: 1,
      position: new Vec3(this._x, this._y, this._z),
      shape,
    });
    this._cannonWorld.addBody(this._cannonBody);
  }
}
