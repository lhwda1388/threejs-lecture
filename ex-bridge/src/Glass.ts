import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';
import { BoxGeometry } from 'three';

type GlassOptions = {
  type: 'normal' | 'strong';
} & StuffOptions;

class Glass extends Stuff<GlassOptions, BoxGeometry> {
  constructor(options: GlassOptions) {
    super(options);
    this._geometry = geo.glass;
    switch (this._options.type) {
      case 'normal':
        this._material = mat.glass1;
        break;
      case 'strong':
        this._material = mat.glass2;
        break;
    }

    this._options.width = this._geometry.parameters.width;
    this._options.height = this._geometry.parameters.height;
    this._options.depth = this._geometry.parameters.depth;

    this.setMesh();
    this.setCannonBody();
  }
}

export default Glass;
