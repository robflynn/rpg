import GameObject from "@patd/object"

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
  }
}