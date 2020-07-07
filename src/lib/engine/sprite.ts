// Not sure how I want to store this so using a type alias...
export type SpriteImage = HTMLCanvasElement

export class Sprite {
  readonly image: SpriteImage

  get width(): number {
    return this.image.width
  }

  set width(width: number) {
    this.image.width = width
  }

  get height(): number {
    return this.image.height
  }

  set height(height: number) {
    this.image.height = height
  }

  constructor(image: SpriteImage) {
    this.image = image
  }
}

export default Sprite