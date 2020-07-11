import { DEFAULT_TILE_SIZE } from "@engine/defaults"
import Sprite from "@engine/sprite"
import { encodedImageToCanvas } from "@engine/helpers"

export interface TileArguments {
  x?: number,
  y?: number,
  name: string,
  variants?: any, // unused
  id?: any // unused
}

export class Tile {
  readonly sprite: Sprite
  readonly id: number
  public name: string

  constructor(id: number, sprite: Sprite) {
    this.sprite = sprite
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

  static createTileSet(sprite: Sprite, tiles: TileArguments[], tileSize = DEFAULT_TILE_SIZE): TileSet {
    let tileset = new TileSet()
    let columns = Math.ceil(sprite.width / tileSize)

    let sprites = TileSet.parse(sprite)

    for (var i = 0; i < tiles.length; i++) {
      let tileData = tiles[i]
      let tileIndex = tileData.y * columns + tileData.x

      let tile = new Tile(tileData.id, sprites[tileIndex])
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

  private static parse(sprite: Sprite): Sprite[] {
    let width = sprite.width
    let height = sprite.height

    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = sprite.width
    canvas.height = sprite.height
    context.clearRect(0, 0, width, height)
    context.drawImage(sprite.image, 0, 0)

    let tileImages: Sprite[] = []

    for (var y = 0; y < height; y += this.tileSize) {
      for (var x = 0; x < width; x += this.tileSize) {
        let tileImageData = context.getImageData(x, y, this.tileSize, this.tileSize)
        let tileCanvas = encodedImageToCanvas(tileImageData)
        let sprite = new Sprite(tileCanvas)
        tileImages.push(sprite)
      }
    }

    return tileImages
  }
}

export default TileSet