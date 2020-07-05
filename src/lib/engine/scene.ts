import Renderable from "@engine/renderable"
import Engine from "@engine/engine"

export abstract class Scene extends Renderable {
  get buffer(): HTMLCanvasElement {
    return this.canvas
  }

  protected engine: Engine

  constructor(engine: Engine, width: number, height: number) {
    super(width, height)

    this.engine = engine
  }

  update(fTime) {
    this.render()
  }
}

export default Scene