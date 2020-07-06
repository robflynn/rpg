import { Map, MapArguments } from "@engine/map"
import { TileSet, Tile } from '@engine/tile_set'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import { MapJSON } from './map'

const buildMap = (mapData, { tileset }) => {
  let tileSize = mapData.tileSize || DEFAULT_TILE_SIZE
  let map = new Map(mapData.width, mapData.height, tileSize, tileset)

  // TODO: Why did I do it this way?
  map.tileset = tileset

  return map
}

export default class AssetLoader {
  static async loadMapFromJSON(mapData: MapJSON) {
    let tileSize = mapData.tileSize || 16

    let tilesetImageData = await AssetLoader.imageDataFromInline64(mapData.tileset.image)
    let tileset = TileSet.createTileSet(tilesetImageData, mapData.tileset.tiles, mapData.tileSize)

    let map: Map = buildMap(mapData, { tileset })
    map.tiles = mapData.tiles

    return map
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