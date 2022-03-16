import { DoubleSide, Mesh, MeshBasicMaterial } from 'three';

interface ImagePanelInfo {
  scene: THREE.Scene;
  textureLoader: THREE.TextureLoader;
  geometry: THREE.BufferGeometry;
  imageSrc: string;
  x: number;
  y: number;
  z: number;
}

export default class ImagePanel {
  private _info: ImagePanelInfo;
  private _mesh?: THREE.Mesh;
  private _sphereRotationX?: number;
  private _sphereRotationY?: number;
  private _sphereRotationZ?: number;
  constructor(info: ImagePanelInfo) {
    this._info = info;
    this.addMesh();
  }

  get mesh() {
    return this._mesh as THREE.Mesh;
  }

  get sphereRotationX() {
    return this._sphereRotationX;
  }
  get sphereRotationY() {
    return this._sphereRotationY;
  }
  get sphereRotationZ() {
    return this._sphereRotationZ;
  }

  addMesh() {
    const texture = this._info.textureLoader.load(this._info.imageSrc);
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });

    this._mesh = new Mesh(this._info.geometry, material);
    this._mesh.position.set(this._info.x, this._info.y, this._info.z);
    this._mesh.lookAt(0, 0, 0);

    // Sphere 상태의 호전각 저장
    this._sphereRotationX = this._mesh.rotation.x;
    this._sphereRotationY = this._mesh.rotation.y;
    this._sphereRotationZ = this._mesh.rotation.z;

    this._info.scene.add(this._mesh);
  }
}
