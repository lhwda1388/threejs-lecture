import { Mesh, Scene } from 'three';
import { cm1, geo, mat } from './common';
import Stuff, { StuffOptions } from './Stuff';

export interface SideLightOptions extends StuffOptions {
  container?: Mesh | Scene;
}

class SideLight extends Stuff<SideLightOptions> {
  constructor({ container = cm1.scene, ...options }: SideLightOptions) {
    super({ ...options });
    this._geometry = geo.floor;
    this._material = mat.floor;
    if (this._mesh) {
      container.add(this._mesh);
    }
  }
}

export default SideLight;
