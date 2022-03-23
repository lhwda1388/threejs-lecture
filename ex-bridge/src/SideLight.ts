import { Mesh, Scene, SphereGeometry, MeshPhongMaterial } from 'three';
import { cm1, cm2, geo, mat } from './common';

export interface SideLightOptions {
  container?: Mesh | Scene;
  name: string;
  x?: number;
  y?: number;
  z?: number;
}

class SideLight {
  private _options: SideLightOptions;
  private _geometry?: SphereGeometry;
  private _material?: MeshPhongMaterial;
  private _mesh?: Mesh<SphereGeometry, MeshPhongMaterial>;
  constructor({
    name = '',
    x = 0,
    y = 0,
    z = 0,
    container = cm1.scene,
    ...options
  }: SideLightOptions) {
    this._options = {
      name,
      x,
      y,
      z,
      container,
      ...options,
    };
    this._geometry = geo.sideLight;
    this._material = mat.sideLight;
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.set(
      this._options.x as number,
      this._options.y as number,
      this._options.z as number,
    );
    container.add(this._mesh);
  }

  turnOff() {
    this._mesh?.material.color.set(cm2.lightOffColor);
  }
}

export default SideLight;
