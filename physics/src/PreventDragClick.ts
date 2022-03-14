export default class PreventDragClick {
  private _mouseMoved = false;
  private _clickStartX = 0;
  private _clickStartY = 0;
  private _clickStartTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousedown', this.mousedownHandler.bind(this));
    canvas.addEventListener('mouseup', this.mouseupHandler.bind(this));
  }

  get mouseMoved() {
    return this._mouseMoved;
  }

  mousedownHandler(e: MouseEvent) {
    this._clickStartX = e.clientX;
    this._clickStartY = e.clientY;
    this._clickStartTime = Date.now();
  }

  mouseupHandler(e: MouseEvent) {
    const xGap = Math.abs(e.clientX - this._clickStartX);
    const yGap = Math.abs(e.clientY - this._clickStartY);
    const timeGap = Date.now() - this._clickStartTime;
    this._mouseMoved = true;
    if (xGap > 5 || yGap > 5 || timeGap > 0.5 * 1000) {
      this._mouseMoved = true;
    } else {
      this._mouseMoved = false;
    }
  }
}
