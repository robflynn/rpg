import GameObject from "@patd/object"
import Player from "@patd/player"
import Character from "@patd/character"

const Map = require("@data/map.json")
const Tiles = require("@data/tiles.json")

export interface WorldArguments {
  tileWidth?: number
  tileHeight?: number
}

export interface Tile {
  id: number,
  color: string,
  passable: boolean
}

export class World extends GameObject {
  static readonly defaultTileWidth: number = 32
  static readonly defaultTileHeight: number = 32

  readonly tileWidth: number
  readonly tileHeight: number

  readonly map: any = Map
  readonly player: Player

  private tiles: Tile[] = Tiles

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

  constructor({ tileWidth, tileHeight }: WorldArguments = {}) {
    super()

    this.tileWidth = tileWidth || World.defaultTileWidth
    this.tileHeight = tileHeight || World.defaultTileHeight

    this.player = new Player()
  }

  getTile(id: number): Tile | null {
    for (var i = 0; i < this.tiles.length; i++) {
      let tile = this.tiles[i]

      if (tile.id == id) { return tile }
    }

    return null
  }

  canMoveRight(character: Character): boolean {
    let cPos = character.position

    if (cPos.x == this.maxTileX) { return false }

    let tileID = this.map[cPos.y][cPos.x + 1]
    let tile = this.getTile(tileID)

    if (tile) {
      // Cannot pass the impassable!
      if (!tile.passable) { return false }
    }

    return true
  }

  canMoveLeft(character: Character): boolean {
    let cPos = character.position

    if (cPos.x == 0) { return false }

    let tileID = this.map[cPos.y][cPos.x - 1]
    let tile = this.getTile(tileID)

    if (tile) {
      // Cannot pass the impassable!
      if (!tile.passable) { return false }
    }

    return true
  }

  canMoveUp(character: Character): boolean {
    let cPos = character.position

    if (cPos.y == 0) { return false }

    let tileID = this.map[cPos.y - 1][cPos.x]
    let tile = this.getTile(tileID)

    if (tile) {
      // Cannot pass the impassable!
      if (!tile.passable) { return false }
    }

    return true
  }

  canMoveDown(character: Character): boolean {
    let cPos = character.position

    if (cPos.y == this.maxTileY) { return false }

    let tileID = this.map[cPos.y + 1][cPos.x]
    let tile = this.getTile(tileID)

    if (tile) {
      // Cannot pass the impassable!
      if (!tile.passable) { return false }
    }

    return true
  }

  update() {
    this.player.update()
  }
}

export default World