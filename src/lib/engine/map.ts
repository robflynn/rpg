import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import TileSet from '@engine/tile_set'

export interface MapJSON {
  id: string,
  tileSize: number,
  width: number,
  height: number,
  tiles: number[],
  tileset: any
}

export interface MapArguments {
  id: string,
  tileSize: number,
  width: number,
  height: number,
  tiles: number[],
  tileset: TileSet
}

type TileMap = number

export class Map {
  readonly width: number
  readonly height: number
  readonly tileSize: number

  public tiles: TileMap[]

  set tileset(value: TileSet) {
    this._tileset = value
  }
  private _tileset: TileSet

  constructor(width: number, height: number, tileSize: number = DEFAULT_TILE_SIZE, tiles: TileMap[] = []) {
    this.width = width
    this.height = height
    this.tileSize = tileSize
    this.tiles = tiles
  }

  tileAt(x: number, y: number): number {
    let index = y * this.width + x

    return this.tiles[index]
  }
}

export default Map