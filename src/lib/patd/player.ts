import GameObject from '@patd/object'

export interface PlayerArguments {
  x?: number
  y?: number
}

export class Player extends GameObject {
  private _x: number
  private _y: number

  get x(): number { return this._x }
  set x(value: number) { this._x = value }

  get y(): number { return this._y }
  set y(value: number) { this._y = value }

  constructor({ x, y }: PlayerArguments = {}) {
    super()

    this._x = x || 0
    this._y = y || 0
  }
}

export default Player