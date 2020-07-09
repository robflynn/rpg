export class Vec2 {
  x: number
  y: number

  static get zero():Vec2 {
    return new Vec2(0, 0)
  }

  get normalized(): Vec2 {
    let length = this.length

    return new Vec2(this.x / length, this.y / length)
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  add(rightValue: Vec2): Vec2 {
    this.x += rightValue.x
    this.y += rightValue.y

    return this
  }
}

export default Vec2