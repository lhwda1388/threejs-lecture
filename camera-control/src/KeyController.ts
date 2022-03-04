export default class KeyController {
  private _keys: { [key: string]: boolean };
  constructor() {
    this._keys = {};

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log(e.code);
      this._keys[e.code] = true;
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      delete this._keys[e.code];
    });
  }

  get keys() {
    return this._keys;
  }
}
