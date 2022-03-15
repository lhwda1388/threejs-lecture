import {
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  Object3D,
  Vector2,
  Vector,
  Vector3,
  Quaternion,
} from 'three';
import { Body, Box, World, Vec3 } from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import DominoGLB from './models/domino.glb';

export default class Domino {
  private _scene: THREE.Scene;
  private _cannonWorld: World;
  private _cannonBody?: Body;
  private _x: number;
  private _y: number;
  private _z: number;
  private _width: number;
  private _height: number;
  private _depth: number;
  private _rotationY: number;
  private _gltfLoader: GLTFLoader;
  private _modelMesh?: Object3D;

  constructor({
    scene,
    cannonWorld,
    x = 0,
    y = 0.5,
    z = 0,
    width = 0.6,
    height = 1,
    depth = 0.2,
    rotationY = 0,
    gltfLoader,
  }: {
    scene: THREE.Scene;
    cannonWorld: World;
    x?: number;
    y?: number;
    z?: number;
    width?: number;
    height?: number;
    depth?: number;
    rotationY?: number;
    gltfLoader: GLTFLoader;
  }) {
    this._scene = scene;
    this._cannonWorld = cannonWorld;
    this._x = x;
    this._y = y;
    this._z = z;
    this._width = width;
    this._height = height;
    this._depth = depth;
    this._rotationY = rotationY;
    this._gltfLoader = gltfLoader;

    this._gltfLoader.load(DominoGLB, (gltf) => {
      this._modelMesh = gltf.scene.children[0];
      this._modelMesh.castShadow = true;
      this._modelMesh.position.set(this._x, this._y, this._z);
      this._scene.add(this._modelMesh);
      this.setCannonBody();
    });
  }

  draw() {
    this._modelMesh?.position.copy(
      this?._cannonBody?.position as unknown as Vector3,
    );
    this._modelMesh?.quaternion.copy(
      this?._cannonBody?.quaternion as unknown as Quaternion,
    );
  }

  setCannonBody() {
    const shape = new Box(
      new Vec3(this._width / 2, this._height / 2, this._depth / 2),
    );
    this._cannonBody = new Body({
      shape,
      mass: 1,
      position: new Vec3(this._x, this._y, this._z),
    });
    this._cannonBody.quaternion.setFromAxisAngle(
      new Vec3(0, 1, 0), // y축
      this._rotationY,
    );

    this._cannonWorld.addBody(this._cannonBody);
  }
}
