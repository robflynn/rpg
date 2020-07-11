import Scene from '@engine/scene'
import Map from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '@engine/tile_set'
import { World, Direction } from '@engine/world'
import Controller from '@engine/controller'
import { Vec2 } from '@engine/vec2'

export class WorldScene extends Scene {
  readonly world: World

  private controller: Controller = new Controller()

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

  update(elapsedTime) {
    this.handleControllerInput()

    this.world.player.update(elapsedTime)

    super.update(elapsedTime)
  }

  private handleControllerInput() {
    let dx = 0
    let dy = 0

    if (this.controller.right) {
      dx += 1
      this.world.player.direction = Direction.east
    }

    if (this.controller.left) {
      dx -= 1
      this.world.player.direction = Direction.west
    }

    if (this.controller.up) {
      dy -= 1
      this.world.player.direction = Direction.north
    }

    if (this.controller.down) {
      dy += 1
      this.world.player.direction = Direction.south
    }

    if ((dx !=0) || (dy != 0)) {
      let accel = this.world.player.speed

      console.log(accel)
      let vector = new Vec2(dx, dy).normalized.multiply(accel)
      console.log(vector)
      let newPosition = this.world.player.position.add(vector)

      if (this.world.canBeOccupied(newPosition)) {
        this.world.player.position = newPosition
      }
    }
  }

  render() {
    this.renderMap()
    this.renderWalls()
    this.renderPlayer()
  }

  renderWalls() {
    let map = this.world.map

    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        let index = (y * map.width) + x
        let wall = map.walls[index]

        if (!wall) { continue }
      }
    }
  }

  private renderPlayer() {
    let player = this.world.player

    // draw facing direction
    let sx = player.position.x
    let sy = player.position.y

    this.context.resetTransform()

    let tile = this.world.map.tileset.getTileByName("player")

    let canvas = document.createElement('canvas')
    let c2d = canvas.getContext('2d')
    canvas.width = this.tileSize
    canvas.height = this.tileSize
    c2d.drawImage(tile.sprite.image, 0, 0)

    //console.log(sx, sy)
    this.context.drawImage(canvas, sx, sy)

    // Draw facing vector
    let ex = sx + this.tileSize
    let ey = sy + this.tileSize
    let cx = (ex - sx) / 2 + sx
    let cy = (ey - sy) / 2 + sy

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

    this.context.drawImage(tile.sprite.image, sx, sy)
  }
}

export default WorldScene