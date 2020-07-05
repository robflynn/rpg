import { Layer } from "@patd/display"
import World from "@patd/world"
import Vec2d from "@patd/vec2d"
import Game from "@patd/game"


export default class DebugLayer extends Layer {
  private game: Game

  constructor(game: Game) {
    super()

    this.game = game
  }

  render() {
    this.context.font = '20px monospace'
    this.context.fillStyle = "white"
    this.context.fillText(`${this.game.fps}`, 25, 25)

    if (this.game.sheet) {
      let sprites = this.game.sheet.sprites

      let x = 0
      let y = 50

      for (var i = 0; i < sprites.length; i++) {
        let sprite = sprites[i]
        console.log("Q",sprite)

        this.context.putImageData(sprite.imageData, x, y)

        x += sprite.width + 8
      }
    }
  }
}