import Entity from '@engine/entity'
import { Direction } from '@engine/world'
import Bounds from '@engine/bounds'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import Vec2 from '@engine/vec2'

export enum State {
  idle,
  walking,
}

export class Character extends Entity {
  name: string

  velocity: Vec2 = Vec2.zero

  get state(): State { return this._state }
  set state(state: State) { let oldState = this._state; this._state = state; this.stateChanged(oldState, state) }
  protected _state: State = State.idle

  get direction(): Direction { return this._direction }
  set direction(direction: Direction) { this._direction = direction; }
  private _direction: Direction = Direction.east

  get bounds(): Bounds {
    // FIXME: GROSS
    return new Bounds(this.position.x, this.position.y, DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE)
  }

  readonly heartbeat: number = 0.250

  face(direction: Direction) {
    this.direction = direction
  }

  stateChanged(from: State, to: State) {}
}

export default Character