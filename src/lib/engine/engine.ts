import { Map } from "@engine/map"
import Scene from "@engine/scene"
import World from "@engine/world"
import Controller from "@engine/controller"

export enum EngineState {
  notStarted = "EngineState.notStarted",
  started    = "EngineState.started",
  paused     = "EngineState.paused",
}

export interface EngineOptions {}

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

  protected scene: Scene
  protected world: World
  protected controller: Controller

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private selector: string
  private element: HTMLElement
  private _state: EngineState = EngineState.notStarted

  constructor(selector: string, width: number, height: number, { }: EngineOptions = {}) {
    this.width = width
    this.height = height
    this.selector = selector

    this.world = new World()
    this.controller = new Controller()

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
    if (this.scene) {
      this.scene.update(fTime)
    }

    this.redraw()
    this.onUpdate(fTime)

    window.requestAnimationFrame(this.update.bind(this))
  }

  private render() {
    if (this.scene) {
      this.context.drawImage(this.scene.buffer, 0, 0, this.scene.buffer.width * 3, this.scene.buffer.height * 3)
    }
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