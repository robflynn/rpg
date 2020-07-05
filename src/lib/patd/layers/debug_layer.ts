import { Layer } from "@patd/display"
import World from "@patd/world"
import Vec2d from "@patd/vec2d"
import Game from "@patd/game"


export default class DebugLayer extends Layer {
  private game: Game
  private showSpriteSheets = false

  constructor(game: Game) {
    super()

    this.game = game
  }

  render() {
    this.context.font = '20px monospace'
    this.context.fillStyle = "white"
    this.context.fillText(`${this.game.fps}`, 25, 25)

    if (this.showSpriteSheets) {
      if (this.game.sheets.length) {
        let y = 50

        for (var n = 0; n < this.game.sheets.length; n++) {
          let sheet = this.game.sheets[n]

          let x = 0
          let sprites = sheet.sprites

          for (var i = 0; i < sprites.length; i++) {
            let sprite = sprites[i]

            this.context.putImageData(sprite.imageData, x, y)

            x += sprite.width + 8
          }

          y += 20

        }
      }
    }
  }
}