import { Map } from '@engine/map'
import Vec2d from '@engine/vec2d'

export interface WorldArguments {
  map?: Map
}

export enum Direction {
  north,
  south,
  east,
  west
}

export class Player {
  movementVector: Vec2d
  position: Vec2d = new Vec2d(0, 0)

  get direction(): Direction { return this._direction }
  set direction(direction: Direction) { this._direction = direction; console.log(direction, ' changed direction. ') }
  private _direction: Direction = Direction.east

  face(direction: Direction) {
    this.direction = direction
  }

  update(elapsedTime: number) {
    console.log("Player updated: ", elapsedTime)
  }

  // TODO: Temporary method.  Refactor.
  teleportTo(col: number, row: number) {
    let xpos = col * 16  // FIXME: Don't hard code this. This is proof to me that this is the wrong place for this.
    let ypos = row * 16

    this.position = new Vec2d(xpos, ypos)
  }
}

export class World {
  get map(): Map { return this._map }
  set map(value: Map) { this._map = value; this.mapChanged() }
  private _map: Map

  player: Player

  constructor({ map }: WorldArguments = {}) {
    if (map) { this._map = map } // dont fire the event, set it directly

    this.player = new Player()
    this.player.teleportTo(1, 1)
  }

  private mapChanged() { }
}

export default World