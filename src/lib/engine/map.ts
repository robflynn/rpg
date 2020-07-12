import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import TileSet from '@engine/tile_set'

type TileMap = number

export class Map {
  readonly width: number
  readonly height: number
  readonly tileSize: number

  public tiles: TileMap[]
  public walls: number[] = []
  public tileset: TileSet

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