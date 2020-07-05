import { Map, MapArguments } from "@engine/map"
import TileSet from "@engine/tile_set"

enum EngineState {
  noStarted = "EngineState.notStarted",
  started   = "EngineState.started",
  paused    = "EngineState.paused",
}

interface EngineOptions {}

export default class Engine {
  readonly width: number
  readonly height: number

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private selector
  private element: HTMLElement

  get state(): EngineState {
    return this._state
  }

  set state(value: EngineState) {
    let fromState = this.state
    let toState = value
    this._state = value

    this.onStateChange(fromState, toState)
  }

  private _state: EngineState

  constructor(selector: string, width: number, height: number, { }: EngineOptions = {}) {
    this.width = width
    this.height = height
    this.selector = selector

    this.createCanvas()
    this.onCreate()
  }

  onCreate() {}
  onStart() {}
  onUpdate(time: number) {}
  onStateChange(fromState: EngineState, toState: EngineState) {}

  start() {
    this.onStart()
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  loadMap(map: Map) {}

  private render() {}

  private createCanvas() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')

    this.element = document.querySelector(this.selector)
    if (!this.element) {
      throw `No element found matching selector '${this.selector}'.`
    }

    this.canvas.width = this.width
    this.canvas.height = this.height

    this.element.innerHTML = ''
    this.element.appendChild(this.canvas)
  }
}