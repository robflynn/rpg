import { Map } from '@engine/map'

export class World {
  get map(): Map { return this._map }
  set map(value: Map) { this._map = value; this.mapChanged() }
  private _map: Map

  constructor() {}

  private mapChanged() { }
}

export default World