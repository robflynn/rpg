import { Layer } from "@patd/display"
import World from "@patd/world"

const resizeImageData = require('resize-image-data')

export interface WorldArguments {
  world: World
}

export default class WorldLayer extends Layer {
  private world: World

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

  //#region Map

  private drawMap() {
    let map = this.world.map

    for (var y = 0; y < map.length; y++) {
      let row = map[y]

      for (var x = 0; x < row.length; x++) {
        let cell = row[x]

        this.drawTile(x, y, cell)
      }
    }
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
    }
  }

  //#region: Player
  private drawPlayer() {
    let player = this.world.player

    this.drawTile(player.position.x, player.position.y, 99)
  }
}