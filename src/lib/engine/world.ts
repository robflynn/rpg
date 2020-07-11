import Map from '@engine/map'
import Player from "@engine/player"
import Vec2 from '@engine/vec2'
import Bounds from '@engine/bounds'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'

export interface WorldArguments {
  map?: Map
}

export enum Direction {
  north,
  south,
  east,
  west
}

class Wall {
  position: Vec2

  get x():number {
    return this.position.x
  }

  get y():number {
    return this.position.y
  }

  get width():number {
    return DEFAULT_TILE_SIZE
  }

  get height():number {
    return DEFAULT_TILE_SIZE
  }

  get bounds():Bounds {
    // FIXME: GROSS
    return new Bounds(this.position.x, this.position.y, DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE)
  }

  constructor(x: number, y: number) {
    this.position = new Vec2(x, y)
  }
}

export class World {
  get map(): Map { return this._map }
  set map(value: Map) { this._map = value; this.mapChanged() }
  private _map: Map
  private _walls: Wall[] = []

  player: Player

  constructor({ map }: WorldArguments = {}) {
    if (map) { this.map = map }

    this.player = new Player()
    this.player.teleportTo(2, 2)
  }

  private mapChanged() {
    this.findWalls()
  }

  private findWalls() {
    let map = this.map

    this._walls = []

    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        let index = (y * map.width) + x
        let wall = map.walls[index]

        if (!wall) { continue }

        let walle = new Wall(x * DEFAULT_TILE_SIZE, y * DEFAULT_TILE_SIZE)
        this._walls.push(walle)
      }
    }
  }

  public collides(object: Player, position: Vec2 = null): boolean {
    let bbox = object.bounds

    if (position != null) {
      // shift bbox if position is supplied
      bbox.x = position.x
      bbox.y = position.y
    }

    // Does it collide with any walls?
    for (var i = 0; i < this._walls.length; i++) {
      let wall = this._walls[i]

      if (wall.bounds.intersects(bbox)) { return true }
    }

    return false
  }

  public canBeOccupied(position: Vec2): boolean {
    return !this.collides(this.player, position)
  }
}

export default World