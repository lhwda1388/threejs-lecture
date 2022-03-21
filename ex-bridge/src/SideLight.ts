import { Mesh } from 'three';
import { cm1, geo, mat } from './common';

interface SideLightOptions {
  name: string;
  container?: THREE.Mesh;
  x?: number;
  y?: number;
  z?: number;
}

class SideLight {
  private _options: SideLightOptions;
  private _geometry: THREE.BufferGeometry;
  private _material: THREE.Material;
  private _mesh: THREE.Mesh;
  constructor({ x = 0, y = 0, z = 0, ...options }: SideLightOptions) {
    this._options = { x, y, z, ...options };
    const container = options.container || cm1.scene;
    this._geometry = geo.sideLight;
    this._material = mat.sideLight;
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh?.position.set(
      this._options.x as number,
      this._options.y as number,
      this._options.z as number,
    );

    container.add(this._mesh);
  }
}

export default SideLight;
