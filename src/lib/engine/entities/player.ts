import { Direction } from "@engine/world"
import { Character, State } from "@engine/entities/character"

export class Player extends Character {
  readonly speed: number = 100

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