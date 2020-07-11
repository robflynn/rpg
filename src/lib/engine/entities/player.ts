import Vec2 from "@engine/vec2"
import { Direction } from "@engine/world"
import Bounds from '@engine/bounds'
import { Character, State } from "@engine/entities/character"
import { DEFAULT_TILE_SIZE } from '@engine/defaults'

export class Player extends Character {
  readonly speed: number = 1.85
  velocity: Vec2 = Vec2.zero

  update(elapsedTime: number) {
    if ((Math.abs(this.velocity.x) > 0) || (Math.abs(this.velocity.y) > 0)) {
      this.state = State.walking
    } else {
      this.state = State.idle
    }

    if (this.velocity.x < 0) { this.direction = Direction.west }
    if (this.velocity.x > 0) { this.direction = Direction.east }
    if (this.velocity.y < 0) { this.direction = Direction.north }
    if (this.velocity.y > 0) { this.direction = Direction.south }
  }
}

export default Player