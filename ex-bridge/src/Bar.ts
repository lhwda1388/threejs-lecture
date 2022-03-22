import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat } from './common';
import { BoxGeometry } from 'three';

type BarOptions = StuffOptions;

class Bar extends Stuff<BarOptions, BoxGeometry> {
  constructor(options: BarOptions) {
    super(options);
    this._geometry = geo.bar;
    this._material = mat.bar;

    this._options.width = this._geometry.parameters.width;
    this._options.height = this._geometry.parameters.height;
    this._options.depth = this._geometry.parameters.depth;

    this.setMesh();
    this.setCannonBody();
  }
}

export default Bar;
