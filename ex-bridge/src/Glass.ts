import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { geo, mat, sounds } from './common';
import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

type GlassOptions = {
  type: GlassType;
  step: number;
} & StuffOptions;

type GlassType = 'normal' | 'strong';
export type GlassMesh = Mesh & { step: number; type: GlassType };

class Glass extends Stuff<GlassOptions, BoxGeometry, MeshPhongMaterial> {
  protected _mesh?: GlassMesh;
  private _sound: HTMLAudioElement;
  constructor(options: GlassOptions) {
    super(options);
    this._geometry = geo.glass;
    this._sound = sounds[this._options.type];
    switch (this._options.type) {
      case 'normal':
        this._material = mat.glass1;
        this._options.mass = 1;
        break;
      case 'strong':
        this._material = mat.glass2;
        this._options.mass = 0;
        break;
    }

    this._options.width = this._geometry.parameters.width;
    this._options.height = this._geometry.parameters.height;
    this._options.depth = this._geometry.parameters.depth;

    this.setMesh();
    this.setCannonBody();
    if (this._mesh) {
      this._mesh.step = this._options.step;
      this._mesh.type = this._options.type;
    }

    this._cannonBody?.addEventListener('collide', this.playground.bind(this));
  }

  playground(e: any) {
    const velocity = e.contact.getImpactVelocityAlongNormal();
    if (velocity > 5) {
      this._sound.currentTime = 0;
      this._sound.play();
    }
  }
}

export default Glass;
