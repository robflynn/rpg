import Scene from '@engine/scene'
import Map from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '@engine/tile_set'
import { World, Direction } from '@engine/world'
import Controller from '@engine/controller'
import { Vec2 } from '@engine/vec2'
import Entity from "@engine/entity"
import { Asset } from '@engine/asset_loader'

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

    if (this.world.map.music) {
      this.playMusic(this.world.map.music)
    }
  }

  playMusic(musicName) {
    let a = document.createElement("audio")
    a.src = "data/" + musicName
    a.loop = true
    a.volume = 0.05
    document.querySelector('body').appendChild(a)
    setTimeout(() => { a.play() }, 1000)
  }

  update(elapsedTime) {
    this.handleControllerInput()

    this.world.player.update(elapsedTime)
    this.updateEntities(elapsedTime)

    super.update(elapsedTime)
  }

  private updateEntities(elapsedTime: number) {
    for (var i = 0; i < this.world.entities.length; i++) {
      let entity = this.world.entities[i]

      entity.update(elapsedTime)
      entity.position = entity.position.add(entity.velocity)
    }
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

      let vector = new Vec2(dx, dy).normalized.multiply(accel)
      let newPosition = this.world.player.position.add(vector)

      // FIXME: This does not account for solid spaces to the west and
      //        available space to the north with both keys pressed.
      //
      //        Do we prevent the entire diagnoal move or do we
      //        let the character slide north against the wall?
      //
      if (this.world.canBeOccupied(newPosition)) {
        this.world.player.position = newPosition
      }
    }
  }

  render() {
    this.renderMap()
    this.renderWalls()
    this.renderPlayer()
    this.renderEntities()
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

  private renderEntities() {
    let entities = this.world.entities

    for (var i = 0; i < entities.length; i++) {
      let entity = entities[i]

      this.renderEntity(entity)
    }
  }

  private renderEntity(entity: Entity) {
    if (entity.sprite) {
      this.context.drawImage(entity.sprite.image, entity.position.x, entity.position.y)

      if (entity.glowing) {

        let cw = this.canvas.width
        let ch = this.canvas.height
        let c = this.context
        c.save()

        let cx = entity.position.x + 8
        let cy = entity.position.y + 6
        let r = 8

        c.globalCompositeOperation = 'lighter';
        var rnd = 0.05 * Math.sin(3.1 * Date.now() / 1000);
        let grad = c.createRadialGradient(cx, cy, 0, cx, cy, r)
        let alpha = 0.7
        grad.addColorStop(0.0, `rgba(187, 187, 153, ${alpha})`)
        grad.addColorStop(0.2 + rnd, `rgba(170, 170, 136, ${alpha})`)
        grad.addColorStop(0.7 + rnd, `rgba(102, 51, 0, ${alpha})`)
        grad.addColorStop(0.9, `rgba(17, 17, 0, ${alpha})`)
        grad.addColorStop(1.0, '#000')
        c.fillStyle = grad
        c.beginPath
        c.arc(cx, cy, r, 0, 2 * Math.PI)
        c.fill()
        c.restore()
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