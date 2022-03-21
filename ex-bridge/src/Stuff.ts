export interface StuffOptions {
  name: string;
  x: number;
  y: number;
  z: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
}

class Stuff {
  protected _options: StuffOptions;
  constructor({
    name = '',
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    ...options
  }: StuffOptions) {
    this._options = {
      name,
      x,
      y,
      z,
      rotationX,
      rotationY,
      rotationZ,
      ...options,
    };
  }
}

export default Stuff;
