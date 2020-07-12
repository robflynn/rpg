import Loader from '@engine/loader'
import { Asset } from '@engine/asset_loader'
import Sprite from '@engine/sprite'
import { imageToCanvas } from '@engine/helpers'

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
  })
}

export default class PNGLoader extends Loader<Sprite> {
  get type(): string {
    return "png"
  }

  async load(name: string, data: Blob) {
    let image = new Image()
    let imgPromise = onloadToPromiseWrapper(image)
    image.src = URL.createObjectURL(data)
    await imgPromise

    return new Sprite(imageToCanvas(image))
  }
}