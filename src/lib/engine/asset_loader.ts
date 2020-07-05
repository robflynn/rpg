import { Map, MapArguments } from "@engine/map"
import { TileSet, Tile } from '@engine/tile_set'

const buildTileSet = async (tilesetData, tileSize = 16) => {
  let tilesetImage = tilesetData.image
  let imageData = await AssetLoader.imageDataFromInline64(tilesetImage)

  return new TileSet(imageData, tileSize)
}

export default class AssetLoader {
  static loadMapFromJSON(mapData: MapArguments): Promise<Map> {
    return new Promise((resolve, reject) => {
      let tileSize = mapData.tileSize || 16
      let map = new Map(mapData.width, mapData.height, tileSize)

      buildTileSet(mapData.tileset, mapData.tileSize)


      //let tileSet = new TileSet(mapData.tileset.image, mapData.tileset.tiles,)

      //let tileset = TileSet.build(mapData.tileset.image, tiles: mapData.tileset.tiles, columns: 10 })

      //console.log('ts', tileset)
      resolve(map)
    })
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