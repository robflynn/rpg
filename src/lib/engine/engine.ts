import { Map } from "@engine/map"

export enum EngineState {
  notStarted = "EngineState.notStarted",
  started    = "EngineState.started",
  paused     = "EngineState.paused",
}

export interface EngineOptions {}

abstract class Renderable {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  abstract render()
}

abstract class Scene extends Renderable {
  get buffer(): HTMLCanvasElement {
    return this.canvas
  }

  get width(): number {
    return this.canvas.width
  }

  get height(): number {
    return this.canvas.height
  }

  constructor() {
    super()
  }
}

class LoadingScene extends Scene {
  render() {
    let c = this.context

    c.fillStyle = 'black'
    c.fillRect(0, 0, this.width, this.height)
  }
}

export default class Engine {
  readonly width: number
  readonly height: number

  get state(): EngineState {
    return this._state
  }

  set state(value: EngineState) {
    let fromState = this.state
    let toState = value

    // Process the state transition, will only fire the
    // state change event if successful.
    // NOTE: Value will change inside the method for simplicity.
    // TODO: Refactor this, it's dirty but quick.
    if (this.handleStateChange(fromState, toState)) {
      this.onStateChange(fromState, toState)
    }
  }

  private scene: Scene = new LoadingScene()
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private selector
  private element: HTMLElement
  private _state: EngineState = EngineState.notStarted

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
    this.state = EngineState.started

    this.onStart()
  }

  redraw() {
    this.context.resetTransform()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.render()
  }

  loadMap(map: Map) {}

  private handleStateChange(fromState, toState) {
    if (fromState == EngineState.notStarted && toState == EngineState.started) {
      this.transitionFromNotStartedToStarted()

      return true
    }

    return false
  }

  private transitionFromNotStartedToStarted() {
    // TODO: Gross. I should probably just define a lookup table of
    // transitions and callbacks.
    this._state = EngineState.started

    // Begin the update loop
    this.update(0)
  }

  private update(fTime) {

    this.onUpdate(fTime)

    window.requestAnimationFrame(this.update.bind(this))
  }

  private render() {
//    this.scene.redraw()
    //this.context.drawImage(this.scene.buffer, 0, 0)

    console.log("yo")
    //console.log(this.scene.buffer.width)
  }

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