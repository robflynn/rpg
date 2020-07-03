enum Key {
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
  D = 68,
  A = 65,
  W = 97,
  S = 83,
}

export class Controller {
  left: boolean = false
  right: boolean = false
  up: boolean = false
  down: boolean = false

  constructor() {
    window.addEventListener('keyup', this.keychange.bind(this))
    window.addEventListener('keydown', this.keychange.bind(this))
  }

  keychange($event) {
    let keyState = ($event.type == "keydown") ? true : false

    switch ($event.keyCode) {
      case Key.Left:
      case Key.A: this.left = keyState; break;
      case Key.Up:
      case Key.W: this.up = keyState; break;
      case Key.Right:
      case Key.D: this.right = keyState; break;
      case Key.Down:
      case Key.S: this.down = keyState; break;
    }

    console.log(this)
  }
}

export default Controller