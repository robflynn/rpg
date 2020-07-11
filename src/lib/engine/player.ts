import Vec2 from "@engine/vec2"
import { Direction } from "@engine/world"
import Bounds from '@engine/bounds'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'

export enum PlayerState {
  idle,
  walking,
}

export class Player {
  velocity: Vec2 = new Vec2(0, 0)
  position: Vec2 = Vec2.zero

  get direction(): Direction { return this._direction }
  set direction(direction: Direction) { this._direction = direction; }
  private _direction: Direction = Direction.east

  get bounds(): Bounds {
    // FIXME: GROSS
    return new Bounds(this.position.x, this.position.y, DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE)
  }

  private state: PlayerState = PlayerState.idle

  face(direction: Direction) {
    this.direction = direction
  }

  update(elapsedTime: number) {
    if ((Math.abs(this.velocity.x) > 0) || (Math.abs(this.velocity.y) > 0)) {
      this.state = PlayerState.walking
    } else {
      this.state = PlayerState.idle
    }

    if (this.velocity.x < 0) { this.direction = Direction.west }
    if (this.velocity.x > 0) { this.direction = Direction.east }
    if (this.velocity.y < 0) { this.direction = Direction.north }
    if (this.velocity.y > 0) { this.direction = Direction.south }

    let newPosition = this.position.add(this.velocity)

//    this.position = newPosition
  }

  // TODO: Temporary method.  Refactor.
  teleportTo(col: number, row: number) {
    let xpos = col * 16  // FIXME: Don't hard code this. This is proof to me that this is the wrong place for this.
    let ypos = row * 16

    this.position = new Vec2(xpos, ypos)
  }
}

export default Player