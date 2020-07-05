import AssetLoader from '@engine/asset_loader'

export class Tile {
  readonly id: number
  readonly name: string
  readonly x: number
  readonly y: number

  readonly image: ImageData

  constructor(id: number, name: string, x: number, y: number, image: ImageData) {
    this.id = id
    this.name = name
    this.x =x
    this.y = y
    this.image = image
  }
}

export interface TileSetArguments {
  image: ImageData
  tiles: Tile[]
}

export class TileSet {
  readonly image: ImageData
  readonly tiles: Tile[]
  readonly tileSize: number

  constructor(image: ImageData, tileSize: number = 16) {
    this.image = image
    this.tiles = []
    this.tileSize = 16
  }
}

export default TileSet