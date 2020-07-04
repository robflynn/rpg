export abstract class Layer {
  readonly canvas: HTMLCanvasElement
  readonly context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
  }

  resize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  abstract render()
}

export default class Display {
  // All display layers will get rendered down here
  readonly canvas: HTMLCanvasElement
  readonly context: CanvasRenderingContext2D

  get layers(): Layer[] {
    return this._displayLayers
  }

  private _displayLayers: Layer[] = []

  constructor() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
  }

  addLayer(layer: Layer) {
    this._displayLayers.push(layer)
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  render() {
    this.layers.forEach(layer => {
      layer.redraw()
      this.context.drawImage(layer.canvas, 0, 0)
    })
  }

  resize(width: number, height: number) {
    this.canvas.width = width
    this.canvas.height = height

    this.layers.forEach(layer => layer.resize(width, height))
  }
}