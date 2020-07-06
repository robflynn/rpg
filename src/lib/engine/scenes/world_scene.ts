import { Scene } from '@engine/scene'
import { Map } from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '@engine/tile_set'
import { World } from '@engine/world'
import { Direction } from "@engine/world"

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
    this.renderPlayer()
  }

  private renderPlayer() {
    let player = this.world.player

    // draw facing direction
    let sx = player.x * this.tileSize
    let sy = player.y * this.tileSize

    this.context.resetTransform()

    let tile = this.world.map.tileset.getTileByName("player")

    let canvas = document.createElement('canvas')
    let c2d = canvas.getContext('2d')
    canvas.width = this.tileSize
    canvas.height = this.tileSize
    c2d.putImageData(tile.image, 0, 0)

    this.context.drawImage(canvas, sx, sy)
    console.log(tile.image)

    // Draw facing vector
    let ex = sx + this.tileSize
    let ey = sy + this.tileSize
    let cx = (ex - sx) / 2 + sx
    let cy = (ey - sx) / 2 + sy

    let dx = 0
    let dy = 0

    if (player.direction == Direction.east) {
      dx = this.tileSize
      dy = 1
    }
    else if (player.direction == Direction.north) {
      dx = 1
      dy = -this.tileSize
    }
    else if (player.direction == Direction.south) {
      dx = 1
      dy = this.tileSize
    }
    else if (player.direction == Direction.west) {
      dx = -this.tileSize
      dy = 1
    }

    this.context.fillStyle = 'magenta'
    this.context.fillRect(cx, cy, dx, dy)

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