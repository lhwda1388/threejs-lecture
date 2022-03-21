import { Mesh } from 'three';
import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { cm1, geo, mat } from './common';

type BarOptions = StuffOptions;

class Bar extends Stuff {
  constructor(options: BarOptions) {
    super(options);
    this._geometry = geo.bar;
    this._material = mat.bar;
    this.addMesh();
    if (this._mesh) {
      this._mesh.castShadow = true;
      this._mesh.receiveShadow = true;
    }
  }
}

export default Bar;
