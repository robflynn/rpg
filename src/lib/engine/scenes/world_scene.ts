import { Scene } from '@engine/scene'
import { Map } from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '@engine/tile_set'
import { World } from '@engine/world'

export class WorldScene extends Scene {
  readonly world: World

  get tileSize(): number {
    return this.map.tileSize
  }

  get map(): Map {
    return this.world.map
  }

  constructor(engine: Engine, world: World) {
    super(engine, engine.width, engine.height)

    this.world = world
  }

  render() {
    this.renderMap()
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
    let sx = x * this.tileSize
    let sy = y * this.tileSize

    this.context.putImageData(tile.image, sx, sy)
  }
}

export default WorldScene