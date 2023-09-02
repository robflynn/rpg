import { Map } from "@engine/map"
import Scene from "@engine/scene"
import World, { Direction } from "@engine/world"
import Controller from "@engine/controller"
import Vec2 from "@engine/vec2"
import { DEFAULT_FPS } from '@engine/defaults'

export enum EngineState {
  notStarted = "EngineState.notStarted",
  started    = "EngineState.started",
  paused     = "EngineState.paused",
}

export interface EngineOptions {
  fps?: number
}

export default class Engine {
  readonly width: number
  readonly height: number

  private accumulatedTime:number = 0
  private animationFrameHandle: number
  private time: number = 0
  private targetFPS: number
  private fps: number
  private fpsTime: number
  private frameCount: number

  private updated: boolean = false

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

  constructor(selector: string, width: number, height: number, options: EngineOptions = {}) {
    this.width = width
    this.height = height
    this.selector = selector

    this.targetFPS = options.fps || DEFAULT_FPS
    this.fpsTime = 0
    this.frameCount = 0
    this.fps = 0


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

  stop() {
    this.state = EngineState.paused

    window.cancelAnimationFrame(this.animationFrameHandle)
  }

  redraw() {
    this.context.save()
    this.context.setTransform(1, 0, 0, 1, 0, 0)
    this.context.restore()

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
    this.animationFrameHandle = window.requestAnimationFrame(this.update.bind(this))
  }

  private update(timestamp: number) {
    const elapsedTime = timestamp - this.time
    this.time = timestamp
    this.accumulatedTime += elapsedTime
    this.fpsTime += elapsedTime
    this.frameCount++
    const timePerFrame = 1000 / this.targetFPS

    while (this.accumulatedTime >= timePerFrame) {
      this.accumulatedTime -= timePerFrame

      if (this.scene) {
        this.scene.update(timePerFrame)
      }

      this.onUpdate(timePerFrame)
      this.updated = true
    }

    if (this.fpsTime >= 1000) {
      this.fps = this.frameCount
      this.frameCount = 0
      this.fpsTime = 0
    }

    if (this.updated) {
      this.render()
      this.updated = false
    }

    this.animationFrameHandle = window.requestAnimationFrame(this.update.bind(this))
  }

  private render() {
    if (this.scene) {
      this.context.drawImage(this.scene.buffer, 0, 0, this.scene.buffer.width * 4, this.scene.buffer.height * 4)

      this.context.fillStyle = 'white'
      this.context.font = '12px monospace'
      this.context.fillText(`FPS: ${this.fps}`, 10, 10)
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