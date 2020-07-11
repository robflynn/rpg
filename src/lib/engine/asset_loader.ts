import { Map, MapJSON } from "@engine/map"
import TileSet from '@engine/tile_set'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import Sprite from "@engine/sprite"

interface OnLoadable {
  onload: any
  onerror: any
  onabort: any
}

function onloadToPromiseWrapper<T extends OnLoadable>(obj: T): Promise<T> {
  return new Promise((resolve, reject) => {
    obj.onload = () => resolve(obj)
    obj.onerror = reject
    obj.onerror = reject
  });
}

function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  let context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  return canvas
}

const buildMap = (mapData, { tileset }) => {
  let tileSize = mapData.tileSize || DEFAULT_TILE_SIZE
  let map = new Map(mapData.width, mapData.height, tileSize, tileset)

  // TODO: Why did I do it this way?
  map.tileset = tileset
  map.walls = mapData.walls

  return map
}

// TODO: Figure out what type an asset's data is/should be, or use generics maybe
type AssetData = any

export class Asset {
  name: string
  data: AssetData
}

export default class AssetLoader {
  private _assets = {}

  addAsset(name: string, data: TileSet): Asset
  addAsset(name: string, data: Sprite): Asset
  addAsset(name: string, data: MapJSON): Asset
  addAsset<T>(name: string, data: T): Asset {
    if (this._assets.hasOwnProperty(name)) { return this.get(name) }

    let asset = new Asset()
    asset.name = name
    asset.data = data

    this._assets[name] = asset

    return asset
  }

  get(name: string): AssetData {
    if (this._assets.hasOwnProperty(name)) {
      return this._assets[name].data
    }

    throw `Unknown asset: ${name}`
  }

  async loadImageFromBlob(blob) {
    let image = new Image()
    let imgPromise = onloadToPromiseWrapper(image)
    image.src = URL.createObjectURL(blob)
    await imgPromise

    return new Sprite(imageToCanvas(image))
  }

  async loadAsset(name: string) {
    let url = `/data/${name}`
    const response = await fetch(url)

    if (url.endsWith(".json")) {
      let json = await response.json()
      return global.addAsset(name, json)
    }
    else if (url.endsWith(".png")) {
      let data = await response.blob()
      let image = await this.loadImageFromBlob(data)
      return global.addAsset(name, image)
    }
    else {
      throw "Unknown asset type."
    }
  }

  async loadMapFromJSON(mapData: MapJSON) {
    let tilesetImageData = this.get(mapData.tileset.image)
    let mapName = mapData.id
    let tileset = TileSet.createTileSet(tilesetImageData, mapData.tileset.tiles, mapData.tileSize || DEFAULT_TILE_SIZE)

    this.addAsset(mapName, tileset)

    let map: Map = buildMap(mapData, { tileset })
    map.tiles = mapData.tiles

    return map
  }
}

export const global = new AssetLoader()

