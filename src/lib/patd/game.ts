import GameObject from '@patd/object'
import World from "@patd/world"
import Display from "@patd/display"
import Controller from '@patd/controller'
import Player from "@patd/player"
import { throttle } from "throttle-debounce"

export default class Game {
  protected display: Display
  protected controller: Controller

  readonly world: World

  readonly element: Element
  readonly selector: string

  private _lastUpdate: any

  get player(): Player { return this.world.player }

  private throttledMovePlayerTo: Function

  constructor(selector: string) {
    // Setup the containing element
    this.element = document.querySelector(selector)
    this.selector = selector
    if (!this.element) { throw `Could not find game container: ${selector}.` }
    this.element.innerHTML = ''

    // Instantiate dependencies
    this.world = new World()
    this.display = new Display(this)
    this.controller = new Controller()

    this.throttledMovePlayerTo = throttle(this.player.speed, false, (player, position) => player.position = position)

    // Prepare for rendering
    this.resize()

    // Re-render on resize
    window.addEventListener('resize', this.resize.bind(this), { passive: true })

    // Render
    this.requestFrame()
  }

	private requestFrame() {
		window.requestAnimationFrame(this.update.bind(this))
	}

	protected resize() {
    this.display.resize()
	}

	update(time) {
    this.world.update()

    let newPosition = { x: this.player.position.x, y: this.player.position.y }

    if (this.controller.right && this.world.canMoveRight(this.player)) {
      newPosition.x++
    }

    if (this.controller.left && this.world.canMoveLeft(this.player)) {
      newPosition.x--
    }

    if (this.controller.down && this.world.canMoveDown(this.player)) {
      if (newPosition.y < this.world.maxTileY) {
        newPosition.y++
      }
    }

    if (this.controller.up && this.world.canMoveUp(this.player)) {
      if (newPosition.y > 0) {
        newPosition.y--
      }
    }

    this.throttledMovePlayerTo(this.player, newPosition)

    // Draw the gamw
    this.display.render()

    this._lastUpdate = performance.now()
		this.requestFrame()
	}
}