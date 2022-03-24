import {
  AnimationMixer,
  Camera,
  Color,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface CreateSceneOptions {
  renderer: WebGLRenderer;
  bgColor?: string;
  fov?: number;
  near?: number;
  far?: number;
  placeholder: string;
  cameraPosition?: { x: number; y: number; z: number };
}

class CreateScene {
  private _scene: Scene;
  private _renderer: WebGLRenderer;
  private _camera: PerspectiveCamera;
  private _bgColor: string;
  private _fov: number;
  private _near: number;
  private _far: number;
  private _aspect: number;
  private _placeholder: string;
  private _elem: HTMLElement;
  private _controller: OrbitControls;
  private _meshes: Mesh[] = [];
  private _mixer?: AnimationMixer;

  constructor({
    renderer,
    bgColor = 'white',
    fov = 75,
    near = 0.1,
    far = 100,
    placeholder,
    cameraPosition = { x: 0, y: 0, z: 3 },
  }: CreateSceneOptions) {
    this._renderer = renderer;
    this._bgColor = bgColor;
    this._fov = fov;
    this._near = near;
    this._far = far;
    this._placeholder = placeholder;
    this._elem = document.querySelector(this._placeholder) as HTMLElement;
    const rect = this._elem?.getBoundingClientRect();
    this._aspect = rect?.width / rect?.height;

    this._scene = new Scene();
    this._scene.background = new Color(this._bgColor);

    this._camera = new PerspectiveCamera(
      this._fov,
      this._aspect,
      this._near,
      this._far,
    );
    this._camera.position.x = cameraPosition.x;
    this._camera.position.y = cameraPosition.y;
    this._camera.position.z = cameraPosition.z;

    this._scene.add(this._camera);

    this._controller = new OrbitControls(this._camera, this._elem);
  }

  get scene() {
    return this._scene;
  }

  set(func: () => void) {
    func();
  }

  get meshes() {
    return this._meshes;
  }

  get camera() {
    return this._camera;
  }

  get mixer() {
    return this._mixer as AnimationMixer;
  }

  set mixer(mixer: AnimationMixer) {
    this._mixer = mixer;
  }

  render(delta?: number) {
    const rect = this._elem?.getBoundingClientRect();

    if (
      rect.bottom < 0 ||
      rect.top > this._renderer.domElement.clientHeight ||
      rect.left > this._renderer.domElement.clientHeight ||
      rect.right < 0
    ) {
      return;
    }

    const canvasBottom = this._renderer.domElement.clientHeight - rect.bottom;
    this._renderer.setScissor(rect.left, canvasBottom, rect.width, rect.height);
    this._renderer.setScissorTest(true);
    this._renderer.setViewport(
      rect.left,
      canvasBottom,
      rect.width,
      rect.height,
    );

    this._camera.aspect = rect.width / rect.height;
    this._camera.updateProjectionMatrix();

    this._controller.update();
    if (delta) {
      this._mixer?.update(delta);
    }
    this._renderer.render(this._scene, this._camera);
  }
}

export default CreateScene;
