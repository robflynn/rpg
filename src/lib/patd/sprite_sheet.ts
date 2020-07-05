class Sprite {
  readonly imageData: ImageData

  get width(): number {
    return this.imageData.width
  }

  get height(): number {
    return this.imageData.height
  }

  constructor(imageData: ImageData) {
    this.imageData = imageData
  }
}

export default class SpriteSheet {
  get sprites(): Sprite[] {
    return this._sprites
  }
  private _sprites: Sprite[] = []

  static load(image: ImageData, width: number, height: number): Promise<SpriteSheet> {
    let tileW = width
    let tileH = height
    let tilesetW = image.width
    let tilesetH = image.height

    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')

    canvas.width = image.width
    canvas.height = image.height
    context.putImageData(image, 0, 0)

    return new Promise((resolve, reject) => {
      let sheet = new SpriteSheet()

      for (var y = 0, i = 0; y < tilesetH; y+= tileH, i++) {
        for (var x = 0, j = 0; x < tilesetW; x+= tileW, j++) {
          let sx = x
          let sy = y

          let spriteImageData = context.getImageData(sx, sy, tileW, tileH)
          let sprite = new Sprite(spriteImageData)

          sheet.addSprite(sprite)
        }
      }

      resolve(sheet)
    })
  }

  addSprite(sprite: Sprite) {
    this._sprites.push(sprite)
  }
}