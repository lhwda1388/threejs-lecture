import { Mesh } from 'three';
import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { cm1, geo, mat } from './common';

type PillarOptions = StuffOptions;

class Pillar extends Stuff {
  private _geometry: THREE.BufferGeometry;
  private _material: THREE.Material;
  private _mesh: THREE.Mesh;
  constructor(options: PillarOptions) {
    super(options);
    this._geometry = geo.pillar;
    this._material = mat.pillar;
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.set(this._options.x, this._options.y, this._options.z);
    this._mesh.castShadow = true;
    this._mesh.receiveShadow = true;
    cm1.scene.add(this._mesh);
  }
}

export default Pillar;
