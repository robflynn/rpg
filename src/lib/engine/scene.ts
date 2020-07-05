import Renderable from "@engine/renderable"

export abstract class Scene extends Renderable {
  get buffer(): HTMLCanvasElement {
    return this.canvas
  }

  update(fTime) {
    this.render()
  }
}

export default Scene