import GameObject from "@patd/object"
import Player from "@patd/player"

interface WorldArguments {
  tileWidth?: number
  tileHeight?: number
}

export default class World extends GameObject {
  static readonly defaultTileWidth: number = 32
  static readonly defaultTileHeight: number = 32

  readonly tileWidth: number
  readonly tileHeight: number

  readonly map: any
  readonly player: Player

  get maxTileX(): number {
    if (!this.map || !this.map.length) {
      return 0
    }

    return this.map[0].length - 1
  }

  get maxTileY(): number {
    if (!this.map || !this.map.length) {
      return 0
    }

    return this.map.length - 1
  }

  constructor({ tileWidth, tileHeight }: WorldArguments = {}) {
    super()

    this.tileWidth = tileWidth || World.defaultTileWidth
    this.tileHeight = tileHeight || World.defaultTileHeight

    this.map = [
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [1, 1, 0, 2, 0, 0],
      [0, 1, 1, 0, 0, 1],
      [0, 1, 1, 0, 0, 1],
    ]

    this.player = new Player()
  }

  update() {
    this.player.update()
  }
}