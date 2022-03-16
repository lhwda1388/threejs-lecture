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
  constructor(info: ImagePanelInfo) {
    this._info = info;
    this.addMesh();
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
    this._info.scene.add(this._mesh);
  }
}
