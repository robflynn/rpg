import { Map, MapArguments } from "@engine/map"
import { TileSet, Tile } from '@engine/tile_set'

const buildMap = (mapData, tileSize = 16) => {
  return new Map(mapData.width, mapData.height, tileSize)
}

export default class AssetLoader {
  static async loadMapFromJSON(mapData: MapArguments) {
    let tileSize = mapData.tileSize || 16

    let map: Map = buildMap(mapData, tileSize)

    let tilesetImageData = await AssetLoader.imageDataFromInline64(mapData.tileset.image)
    let tileset = TileSet.createTileSet(tilesetImageData, mapData.tileset.tiles, mapData.tileSize)
    console.log(tileset)
  }

    static imageDataFromInline64(encodedImage: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      let image = new Image()

      image.onload = () => {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        context.drawImage(image, 0, 0)

        resolve(context.getImageData(0, 0, image.width, image.height))
      }

      image.onerror = (err) => {
        reject(err)
      }

      image.src = encodedImage
    })
  }

}