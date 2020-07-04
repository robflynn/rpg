import { Layer } from "@patd/display"
import Map from "@patd/map"
import World from "@patd/world"
import Vec2d from "@patd/vec2d"

const resizeImageData = require('resize-image-data')

export interface WorldArguments {
  world: World
}

export type Camera = Vec2d

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export class MapWindow {
  private map: Map
  private box: BoundingBox

  constructor(map: Map, width: number, height: number) {
    this.map = map

    if (width > this.mapWidth) {
      width = this.mapWidth
    }

    if (height > this.mapHeight) {
      height = this.mapHeight
    }

    this.box = { x: 0, y: 0, width: width, height: height }
  }

  get halfViewportWidth(): number {
    return Math.ceil(this.box.width / 2)
  }

  get halfViewportHeight(): number {
    return Math.ceil(this.box.height / 2)
  }

  get mapWidth(): number {
    return this.map[0].length
  }

  get mapHeight(): number {
    return this.map.length
  }

  mapToWindowPosition(x: number, y: number): Vec2d {
    return new Vec2d({ x: x - this.box.x, y: y - this.box.y })
  }

  center(value: Vec2d) {
    let cx = value.x
    let cy = value.y

    let minCenterX = this.halfViewportWidth
    let maxCenterX = this.mapWidth - this.halfViewportWidth

    let minCenterY = this.halfViewportHeight
    let maxCenterY = this.mapHeight - this.halfViewportHeight

    if (cx < minCenterX) { cx = minCenterX }
    else if (cx > maxCenterX) { cx = maxCenterX }

    if (cy < minCenterY) { cy = minCenterY }
    else if (cy > maxCenterY) { cy = maxCenterY }

    let sx = cx - this.halfViewportWidth
    let sy = cy - this.halfViewportHeight

    this.box.x = sx
    this.box.y = sy
  }

  iterate(func: Function) {
    for (var y = 0; y < this.box.height; y++) {
      for (var x = 0; x < this.box.width; x++) {
        if (!func) { continue }

        let mapX = x + this.box.x
        let mapY = y + this.box.y

        func(x, y, mapX, mapY)
      }
    }
  }
}

export default class WorldLayer extends Layer {
  private world: World
  private mapWindow: MapWindow

  get camera(): Camera {
    return this.world.player.position
  }

  // Simple cache to handle scaled tile images
  private scaledImageCache: any = {}

  constructor({ world }: WorldArguments) {
    super()

    if (!world) {
      throw "World must be specified!"
    }

    this.world = world
  }

  render() {
    this.drawMap()
    this.drawPlayer()
  }

  resize(width: number, height: number) {
    let tileWidth = this.world.tileWidth * this.world.scale
    let tileHeight = this.world.tileHeight * this.world.scale

    let numTilesX = Math.ceil(width / tileWidth)
    let numTilesY = Math.ceil(height / tileHeight)

    let w = numTilesX * tileWidth
    let h = numTilesY * tileHeight

    super.resize(w, h)

    this.mapWindow = new MapWindow(this.world.map, numTilesX, numTilesY)
  }

  get scaledTileWidth(): number {
    return this.world.tileWidth * this.world.scale
  }

  get scaledTileHeight(): number {
    return this.world.tileHeight * this.world.scale
  }

  private drawMap() {
    let map = this.world.map

    this.mapWindow.center(this.camera)
    this.mapWindow.iterate((x, y, mapX, mapY) => {
      let tile = map[mapY][mapX]

      this.drawTile(x, y, tile)
    })
  }

  private drawTile(x: number, y: number, tileNumber: number) {
    let tileWidth = this.world.tileWidth
    let tileHeight = this.world.tileHeight
    let scale = this.world.scale

    let sx = x * tileWidth  * scale
    let sy = y * tileHeight * scale

    let tile = this.world.getTile(tileNumber)

    if (tile) {
      if (tile.image) {
        if (!this.scaledImageCache[tile.id]) {
          this.scaledImageCache[tile.id] =
            resizeImageData(tile.image, tile.image.width * scale, tile.image.height * scale)
        }

        let scaledImage = this.scaledImageCache[tile.id]
        this.context.putImageData(scaledImage, sx, sy)
      } else {
        // Old tyle fallback
        this.context.fillStyle = tile.color
        this.context.fillRect(sx, sy, tileWidth * scale, tileHeight * scale)
      }

      this.context.font = '10px monospace'
      this.context.fillStyle = "red"
      this.context.fillText(`(${x},${y})`, sx + 5, sy + 10)
    }
  }

  private drawPlayer() {
    let player = this.world.player

    let viewPosition = this.mapWindow.mapToWindowPosition(player.position.x, player.position.y)

    this.drawTile(viewPosition.x, viewPosition.y, 99)
  }
}