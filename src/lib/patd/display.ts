import GameObject from '@patd/object'
import Game from "@patd/game"
import Tile from "@patd/tile"

export class Display extends GameObject {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private game: Game

  constructor(game: Game) {
    super()

    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')

    this.game = game
    this.canvas = canvas
    this.context = context

    this.game.element.appendChild(this.canvas)
  }

  render() {
    this.drawMap()
    this.drawPlayer()
  }

  private drawPlayer()  {
    this.drawTile(this.game.player.position.x, this.game.player.position.y, 99)
  }

  private drawMap() {
    for (var y = 0; y < this.game.world.map.length; y++) {
      let row = this.game.world.map[y]

      for (var x = 0; x < row.length; x++) {
        let cell = row[x]

        this.drawTile(x, y, cell)
      }
    }
  }

  drawTile(x: number, y: number, tileNumber: number) {
    let tileWidth = this.game.world.tileWidth
    let tileHeight = this.game.world.tileHeight

    let sx = x * tileWidth
    let sy = y * tileHeight

    let tile = this.game.world.getTile(tileNumber)

    if (tile) {
      if (tile.image) {
        this.context.putImageData(tile.image, sx, sy)
      } else {
        // Old tyle fallback
        this.context.fillStyle = tile.color
        this.context.fillRect(sx, sy, tileWidth, tileHeight)
      }
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

export default Display