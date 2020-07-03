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
      // set position to 2 if right
      this.player.x = 1
    }

    if (this.controller.left) {
      // set position to 2 if right
      this.player.x = 0
    }

    if (this.controller.up) {
      // set position to 2 if right
      this.player.y = 0
    }

    if (this.controller.down) {
      // set position to 2 if right
      this.player.y = 1
    }

    // Draw the gamw
    this.display.render()

		this.requestFrame()
	}
}