import * as THREE from 'three';

export default class MousePosClick {
  private _pos: THREE.Vector2 = new THREE.Vector2();
  private _canvas: HTMLCanvasElement;
  private _clickHandler?: (e: MouseEvent) => void;
  constructor(
    canvas: HTMLCanvasElement,
    clickHandler?: (e: MouseEvent) => void,
  ) {
    this._canvas = canvas;

    window.addEventListener('click', this.mouseClickHandler.bind(this));
    this._clickHandler = clickHandler;
    return this;
  }

  get pos() {
    return this._pos;
  }

  mouseClickHandler(e: MouseEvent) {
    const { x: canvasX, y: canvasY } = this._canvas.getBoundingClientRect();
    // 캔버스의 좌표를 three좌표로 변환한다.
    this._pos.x = ((e.clientX - canvasX) / this._canvas.clientWidth) * 2 - 1;
    this._pos.y = -(
      ((e.clientY - canvasY) / this._canvas.clientHeight) * 2 -
      1
    );
    this._clickHandler?.(e);
  }
}
