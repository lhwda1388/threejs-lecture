import Stuff from './Stuff';
import { StuffOptions } from './Stuff';
import { cm1 } from './common';

import PlayerModel from './models/ilbuni.glb';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Object3D,
} from 'three';

type PlayerOptions = StuffOptions;

class Player extends Stuff<PlayerOptions, BoxGeometry> {
  private _actions: AnimationAction[] = Array.from({ length: 3 });
  private _mixer?: AnimationMixer;

  constructor(options: PlayerOptions) {
    super(options);

    this._options.width = 0.5;
    this._options.height = 0.5;
    this._options.depth = 0.5;

    this._mesh = new Mesh(
      new BoxGeometry(
        this._options.width,
        this._options.height,
        this._options.depth,
      ),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
      }),
    );
    this._mesh.castShadow = true;
    this._mesh.position.set(
      this._options.x as number,
      this._options.y as number,
      this._options.z as number,
    );
    cm1.scene.add(this._mesh);

    cm1.gltfLoader.load(PlayerModel, (glb) => {
      this._modelMesh = glb.scene.children[0];
      this._modelMesh.receiveShadow = true;
      this._modelMesh.castShadow = true;
      this._modelMesh.position.set(
        this._options.x as number,
        this._options.y as number,
        this._options.z as number,
      );
      this._modelMesh.rotation.set(
        this._options.rotationX as number,
        this._options.rotationY as number,
        this._options.rotationZ as number,
      );

      this._modelMesh.animations = glb.animations;
      this._mixer = new AnimationMixer(this._modelMesh);
      this._actions[0] = this._mixer.clipAction(this._modelMesh.animations[0]); // default

      this._actions[1] = this._mixer.clipAction(this._modelMesh.animations[1]); // fall

      this._actions[2] = this._mixer.clipAction(this._modelMesh.animations[2]); // jump
      this._actions[2].repetitions = 1; // jump

      this._actions[0].play(); // default

      cm1.scene.add(this._modelMesh);
      this.setCannonBody();
    });
  }

  get actions() {
    return this._actions;
  }

  update(time: number) {
    this._mixer?.update(time);
  }
}

export default Player;
