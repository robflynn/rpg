export interface Vec2dArguments {
  x?: number
  y?: number
}

export class Vec2d {
  x: number
  y: number

  constructor({ x, y }: Vec2dArguments = {}) {
    this.x = x || 0
    this.y = y || 0
  }

  add(rightValue: Vec2d): Vec2d {
    this.x += rightValue.x
    this.y += rightValue.y

    return this
  }
}

export default Vec2d