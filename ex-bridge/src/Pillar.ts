import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';
import { BoxGeometry, MeshPhongMaterial } from 'three';

type PillarOptions = StuffOptions;

class Pillar extends Stuff<PillarOptions, BoxGeometry, MeshPhongMaterial> {
  constructor(options: PillarOptions) {
    super(options);
    this._geometry = geo.pillar;
    this._material = mat.pillar;

    this._options.width = this._geometry.parameters.width;
    this._options.height = this._geometry.parameters.height;
    this._options.depth = this._geometry.parameters.depth;

    this.setMesh();
    this.setCannonBody();
  }
}

export default Pillar;
