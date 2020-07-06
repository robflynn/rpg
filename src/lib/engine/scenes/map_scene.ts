import { Scene } from '@engine/scene'
import { Map } from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '../tile_set'

export default class MapScene extends Scene {
  readonly map: Map

  constructor(engine: Engine, map: Map) {
    let width = map.tileSize * map.width
    let height = map.tileSize * map.height

    // if the map is smaller than the engine window just use the engine size
    if (width < engine.width) { width = engine.width }
    if (height < engine.height) { height = engine.height }

    super(engine, width, height)

    this.map = map
  }

  render() {
    this.renderMap()

    this.context.font = '18px Arial'
    this.context.fillText("Hello, I am the map scene.", 100, 100)
  }

  private renderMap() {
    let x = 0
    let y = 0

    let tiles = this.map.tiles
    if (tiles && tiles.length) {
      for (var n = 0; n < tiles.length; n++) {
        let tileIndex = tiles[n]
        let tile = this.map.tileset.tiles[tileIndex]

        this.renderTile(tile, x, y)

        if (++x == this.map.width) { y++; x = 0 }
      }
    }
  }

  private renderTile(tile: Tile, x: number, y: number) {
    let sx = x * this.map.tileSize
    let sy = y * this.map.tileSize

    this.context.putImageData(tile.image, sx, sy)
  }
}
