import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';

type GlassOptions = {
  type: 'normal' | 'strong';
} & StuffOptions;

class Glass extends Stuff<GlassOptions> {
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

    this.addMesh();
  }
}

export default Glass;
