import tilesets from "@data/tilesets"

export interface TileSet {
  image: string,
  tiles: any[],
}

export interface MapArguments {
  id: string,
  tileSize: number,
  width: number,
  height: number,
  tiles: number[],
  tileset: TileSet
}

export class Map {
  readonly width: number
  readonly height: number
  readonly tileSize: number

  get tiles(): number[] {
    return this._tiles
  }
  set tiles(value: number[]) {
    this._tiles = value
  }
  private _tiles: number[]

  set tileset(value: TileSet) {
    this._tileset = value
  }
  private _tileset: TileSet

  constructor(width: number, height: number, tileSize: number = 16, tiles: number[] = []) {
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