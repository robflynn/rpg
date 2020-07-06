import { Map } from '@engine/map'

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
  x: number = 1
  y: number = 1

  get direction(): Direction { return this._direction }
  set direction(direction: Direction) { this._direction = direction; console.log(direction, ' changed direction. ') }
  private _direction: Direction = Direction.east

  face(direction: Direction) {
    this.direction = direction
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
  }

  private mapChanged() { }
}

export default World