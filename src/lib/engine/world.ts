import { Map } from '@engine/map'

export interface WorldArguments {
  map?: Map
}

export class World {
  get map(): Map { return this._map }
  set map(value: Map) { this._map = value; this.mapChanged() }
  private _map: Map

  constructor({ map }: WorldArguments = {}) {
    if (map) { this._map = map } // dont fire the event, set it directly
  }

  private mapChanged() { }
}

export default World