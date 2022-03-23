import { BoxGeometry, MeshPhongMaterial } from 'three';
import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';

type FloorOptions = StuffOptions;

class Floor extends Stuff<FloorOptions, BoxGeometry, MeshPhongMaterial> {
  constructor(options: FloorOptions) {
    super(options);
    this._geometry = geo.floor;
    this._material = mat.floor;

    this._options.width = this._geometry.parameters.width;
    this._options.height = this._geometry.parameters.height;
    this._options.depth = this._geometry.parameters.depth;

    this.setMesh();
    if (this._mesh) {
      this._mesh.castShadow = false;
    }
    this.setCannonBody();
  }
}

export default Floor;
