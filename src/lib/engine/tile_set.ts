import { DEFAULT_TILE_SIZE } from "@engine/defaults"

export interface TileArguments {
  x?: number,
  y?: number,
  name: string,
  variants?: any, // unused
  id?: any // unused
}

export class Tile {
  readonly image: ImageData
  readonly id: number
  public name: string

  constructor(id: number, image: ImageData) {
    this.image = image
    this.id = id
  }
}


export interface TileSetArguments {
  image: ImageData
  tiles: Tile[]
}

export class TileSet {
  readonly tiles: Tile[]
  static readonly tileSize = DEFAULT_TILE_SIZE

  static createTileSet(image: ImageData, tiles: TileArguments[], tileSize = DEFAULT_TILE_SIZE): TileSet {
    //let imageData = await AssetLoader.imageDataFromInline64(tilesetImage)
    let tileset = new TileSet()
    let columns = Math.ceil(image.width / tileSize)

    let images = TileSet.parse(image)

    for (var i = 0; i < tiles.length; i++) {
      let tileData = tiles[i]
      let tileIndex = tileData.y * columns + tileData.x

      let tile = new Tile(tileData.id, images[tileIndex])
      tile.name = tileData.name
      tileset.tiles.push(tile)
    }

    return tileset
  }

  constructor() {
    this.tiles = []
  }

  getTileByName(name: string): Tile | null {
    for (var i = 0; i < this.tiles.length; i++) {
      let tile = this.tiles[i]

      if (tile.name == name) { return tile }
    }

    return null
  }

  private static parse(image: ImageData): ImageData[] {
    let width = image.width
    let height = image.height

    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = image.width
    canvas.height = image.height
    context.clearRect(0, 0, width, height)
    context.fillStyle = 'blue'
    context.fillRect(0, 0, width, height)
    context.putImageData(image, 0, 0)

    let tileImages = []

    for (var y = 0; y < height; y += this.tileSize) {
      for (var x = 0; x < width; x += this.tileSize) {
        let tileImageData = context.getImageData(x, y, this.tileSize, this.tileSize)
        tileImages.push(tileImageData)
      }
    }

    return tileImages
  }
}

export default TileSet