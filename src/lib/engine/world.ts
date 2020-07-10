import { Map } from '@engine/map'
import Player from "@engine/player"
import Vec2 from '@engine/vec2'

export interface WorldArguments {
  map?: Map
}

export enum Direction {
  north,
  south,
  east,
  west
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

  public canBeOccupied(position: Vec2): boolean {
    return true
  }

}

export default World