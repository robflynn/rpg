import Map from "@engine/map"
import TileSet from '@engine/tile_set'
import { DEFAULT_TILE_SIZE } from '@engine/defaults'
import Sprite from "@engine/sprite"
import JSONLoader from "@engine/loaders/json_loader"
import URLLoader from "@engine/loaders/url_loader"
import PNGLoader from "@engine/loaders/png_loader"
import { MapJSON, MapLoader } from "@engine/loaders/map_loader"
import Loader from "@engine/loader"

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

// TODO: Figure out what type an asset's data is/should be, or use generics maybe
type AssetData = any

export class Asset {
  name: string
  data: AssetData
}

export default class AssetLoader {
  private _assets = {}
  private _loaders = {}

  addLoader(loader: Loader) {
    console.log(`adding loader: ${loader.type}`)
    this._loaders[loader.type] = loader
  }

  addAsset(name: string, data: TileSet): Asset
  addAsset(name: string, data: Sprite): Asset
  addAsset(name: string, data: MapJSON): Asset
  addAsset(name: string, data: string): Asset
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

  getAssetPipeline(name: string): string[] {
    let pieces = name.split('.').slice(1)

    return pieces.reverse()
  }

  async loadAsset(name: string) {
    let url = `/data/${name}`
    let pipeline = ['url', ...this.getAssetPipeline(name)]

    let prevResponse = url

    while (pipeline.length) {
      let extension = pipeline.shift()
      if (!this._loaders.hasOwnProperty(extension)) { continue }
      let loader: Loader = this._loaders[extension]

      console.log("the loader was found: ", loader)

      prevResponse = await loader.load(name, prevResponse)
    }

    console.log('prev response = ', prevResponse)

    let asset = this.addAsset(name, prevResponse)

    return asset
  }
}

export const global = new AssetLoader()
global.addLoader(new URLLoader())
global.addLoader(new JSONLoader())
global.addLoader(new PNGLoader())
global.addLoader(new MapLoader())