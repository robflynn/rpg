export class Vec2d {
  x: number
  y: number

  static get zero():Vec2d {
    return new Vec2d(0, 0)
  }

  get normalized(): Vec2d {
    let length = this.length

    return new Vec2d(this.x / length, this.y / length)
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  add(rightValue: Vec2d): Vec2d {
    this.x += rightValue.x
    this.y += rightValue.y

    return this
  }
}

export default Vec2d