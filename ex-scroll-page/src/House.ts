import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
interface HouseOptions {
  scene: THREE.Scene;
  modelSrc: string;
  gltfLoader: GLTFLoader;
  x: number;
  z: number;
  height: number;
}

export default class House {
  private _options: HouseOptions;
  private _mesh?: THREE.Mesh;

  constructor({ height = 2, ...options }: HouseOptions) {
    this._options = { height, ...options };
    this.addMesh();
  }

  get mesh() {
    return this._mesh as THREE.Mesh;
  }

  addMesh() {
    this._options.gltfLoader.load(this._options.modelSrc, (gltf) => {
      console.log(gltf);
      this._mesh = gltf.scene.children[0] as THREE.Mesh;
      console.log(this._mesh);
      this._mesh.position.set(
        this._options.x,
        this._options.height / 2,
        this._options.z,
      );
      this._mesh.castShadow = true;
      this._options.scene.add(this._mesh);
    });
  }
}
