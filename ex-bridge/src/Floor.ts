import { Mesh } from 'three';
import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { cm1, geo, mat } from './common';

type FloorOptions = StuffOptions;

class Floor extends Stuff<FloorOptions> {
  constructor(options: FloorOptions) {
    super(options);
    this._geometry = geo.floor;
    this._material = mat.floor;
    if (this._mesh) {
      this._mesh.receiveShadow = true;
    }
  }
}

export default Floor;
