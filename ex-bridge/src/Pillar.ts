import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';

type PillarOptions = StuffOptions;

class Pillar extends Stuff<PillarOptions> {
  constructor(options: PillarOptions) {
    super(options);
    this._geometry = geo.pillar;
    this._material = mat.pillar;

    this.addMesh();
    if (this._mesh) {
      this._mesh.castShadow = true;
      this._mesh.receiveShadow = true;
    }
  }
}

export default Pillar;
