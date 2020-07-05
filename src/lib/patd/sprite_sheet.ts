class Sprite {
  readonly imageData: ImageData

  public name?: string

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

  static load(image: any, width: number, height: number): Promise<SpriteSheet> {
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

      console.log(sheet)
      resolve(sheet)
    })
  }

  addSprite(sprite: Sprite) {
    this.sprites.push(sprite)
  }

  spriteAt(x: number, y: number, cols: number = 16): Sprite {
    let index = y * cols + x

    if (index >= this.sprites.length) {
      throw "Sprite index out of bounds of tileset."
    }

    return this.sprites[index]
  }

  get(name: string): Sprite | null {
    let sprites = this.sprites

    for (var i = 0; i < sprites.length; i++) {
      let sprite = sprites[i]

      if (sprite.name && sprite.name == name) {
        return sprite
      }
    }

    return null
  }
}