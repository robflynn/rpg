import GameObject from '@patd/object'
import Game from "./game"

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
    this.renderTile(this.game.player.position.x, this.game.player.position.y, 99)
  }

  private drawMap() {
    for (var y = 0; y < this.game.world.map.length; y++) {
      let row = this.game.world.map[y]

      for (var x = 0; x < row.length; x++) {
        let cell = row[x]

        this.renderTile(x, y, cell)
      }
    }
  }

  renderTile(x: number, y: number, tile: number) {
    let tileWidth = this.game.world.tileWidth
    let tileHeight = this.game.world.tileHeight

    let sx = x * tileWidth
    let sy = y * tileHeight

    this.context.fillStyle = this.getColorFromTile(tile)
    this.context.fillRect(sx, sy, tileWidth, tileHeight)
  }

  private getColorFromTile(tile: number): string {
    switch(tile) {
      case 0: {
        return 'green'
      }
      case 1: {
        return 'blue'
      }
      case 2: {
        return 'orange'
      }
      case 99: {
        return 'pink'
      }
      default: {
        return 'gray'
      }
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}

export default Display