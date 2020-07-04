import GameObject from "@patd/object"
import Player from "@patd/player"
import Character from "@patd/character"
import Tile from "@patd/tile"
import Map from "@patd/map"
import Vec2d from '@patd/vec2d'

export interface WorldArguments {
  tileWidth?: number
  tileHeight?: number
  scale?: number,
  map: Map,
  tiles: Tile[]
}

export class World extends GameObject {
  static readonly defaultTileWidth: number = 16
  static readonly defaultTileHeight: number = 16
  static readonly defaultScale: number = 1

  readonly tileWidth: number
  readonly tileHeight: number
  readonly scale: number

  get scaledTileWidth(): number {
    return this.tileWidth * this.scale
  }

  get scaledTileHeight(): number {
    return this.tileHeight * this.scale
  }

  readonly map: Map
  readonly player: Player

  readonly tiles: Tile[]

  get center(): Vec2d {
    let centerX = Math.floor(this.maxTileX / 2)
    let centerY = Math.floor(this.maxTileY / 2)

    return new Vec2d({ x: centerX, y: centerY })
  }

  get maxTileX(): number {
    if (!this.map || !this.map.length) {
      return 0
    }

    return this.map[0].length - 1
  }

  get maxTileY(): number {
    if (!this.map || !this.map.length) {
      return 0
    }

    return this.map.length - 1
  }

  constructor({ tileWidth, tileHeight, scale, map, tiles }: WorldArguments) {
    super()

    this.tileWidth = tileWidth || World.defaultTileWidth
    this.tileHeight = tileHeight || World.defaultTileHeight
    this.scale = scale || World.defaultScale

    this.map = map
    this.tiles = tiles

    this.player = new Player()
  }

  getTile(id: number): Tile | null {
    for (var i = 0; i < this.tiles.length; i++) {
      let tile = this.tiles[i]

      if (tile.id == id) { return tile }
    }

    return null
  }

  move(character: Character, direction: Vec2d) {
    if (this.canMove(character, direction)) {
      character.position.add(direction)
    }
  }

  canMove(character: Character, direction: Vec2d): boolean {
    let x = character.position.x
    let y = character.position.y

    x += direction.x
    y += direction.y

    // out of bounds
    if (x < 0 || x > this.maxTileX) {
      return false
    }

    if (y < 0 || y > this.maxTileY) {
      return false
    }

    let tile_idx = this.map[y][x]
    let tile = this.getTile(tile_idx)

    if (tile) {
      if (!tile.passable) { return false }
    }

    return true
  }

  update() {
    this.player.update()
  }
}

export default World