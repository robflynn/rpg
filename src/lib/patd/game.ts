import GameObject from '@patd/object'
import World from "@patd/world"
import Display from "@patd/display"
import Controller from '@patd/controller'
import Player from "@patd/player"

export default class Game extends GameObject {
  protected display: Display
  protected controller: Controller

  readonly world: World

  readonly element: Element
  readonly selector: string

  get player(): Player { return this.world.player }

  constructor(selector: string) {
    super()

    // Setup the containing element
    this.element = document.querySelector(selector)
    this.selector = selector
    if (!this.element) { throw `Could not find game container: ${selector}.` }
    this.element.innerHTML = ''

    // Instantiate dependencies
    this.world = new World()
    this.display = new Display(this)
    this.controller = new Controller()

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

	update() {
    this.world.update()

    if (this.controller.right) {
      if (this.player.x < this.world.maxTileX) {
        this.player.x++
      }
    }

    if (this.controller.left) {
      if (this.player.x > 0) {
        this.player.x--
      }
    }

    if (this.controller.down) {
      if (this.player.y < this.world.maxTileY) {
        this.player.y++
      }
    }

    if (this.controller.up) {
      if (this.player.y > 0) {
        this.player.y--
      }
    }


    // Draw the gamw
    this.display.render()

		this.requestFrame()
	}
}