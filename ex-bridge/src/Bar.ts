import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';

type BarOptions = StuffOptions;

class Bar extends Stuff<BarOptions> {
  constructor(options: BarOptions) {
    super(options);
    this._geometry = geo.bar;
    this._material = mat.bar;
    this.addMesh();
  }
}

export default Bar;
