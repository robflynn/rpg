export abstract class Renderable {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  readonly width: number
  readonly height: number

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.context.imageSmoothingEnabled = true

    this.width = width
    this.height = height

    this.autoSize()
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  private autoSize() {
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  abstract render()
}

export default Renderable