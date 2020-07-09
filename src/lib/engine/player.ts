import Vec2 from "@engine/vec2"
import { Direction } from "@engine/world"

export class Player {
  velocity: Vec2
  position: Vec2 = Vec2.zero

  get direction(): Direction { return this._direction }
  set direction(direction: Direction) { this._direction = direction; }
  private _direction: Direction = Direction.east

  face(direction: Direction) {
    this.direction = direction
  }

  update(elapsedTime: number) {
  }

  // TODO: Temporary method.  Refactor.
  teleportTo(col: number, row: number) {
    let xpos = col * 16  // FIXME: Don't hard code this. This is proof to me that this is the wrong place for this.
    let ypos = row * 16

    this.position = new Vec2(xpos, ypos)
  }
}

export default Player