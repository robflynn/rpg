import { Scene } from '@engine/scene'
import { Map } from '@engine/map'
import Engine from '@engine/engine'

export default class MapScene extends Scene {
  readonly map: Map

  constructor(engine: Engine, width: number, height: number, map: Map) {
    super(engine, width, height)

    this.map = map
  }

  render() {
    this.context.font = '24px monospace'
    this.context.fillText("Hello, I am the map scene.", 100, 100)
  }
}
