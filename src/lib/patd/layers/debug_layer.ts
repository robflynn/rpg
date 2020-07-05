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
  }
}