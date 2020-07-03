import GameObject from '@patd/object'
import World from "@patd/world"
import Display from "@patd/display"

export default class Game extends GameObject {
  protected display: Display

  readonly world: World

  readonly element: Element
  readonly selector: string

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

    // Draw the gamw
    this.display.render()

		this.requestFrame()
	}
}