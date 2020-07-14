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

  add(rightValue: number): Vec2
  add(rightValue: Vec2): Vec2
  add<T>(rightValue: number | Vec2): Vec2 {
    if (typeof rightValue === "number") {
      return new Vec2(this.x + rightValue, this.y + rightValue)
    }

    return new Vec2(this.x + rightValue.x, this.y + rightValue.y)
  }

  subtract(rightValue: number): Vec2
  subtract(rightValue: Vec2): Vec2
  subtract<T>(rightValue: number | Vec2): Vec2 {
    if (typeof rightValue === "number") {
      return new Vec2(this.x - rightValue, this.y - rightValue)
    }

    return new Vec2(this.x - rightValue.x, this.y - rightValue.y)
  }

  multiply(multiplier: number): Vec2
  multiply(multiplier: Vec2): Vec2
  multiply<T>(multiplier: number | Vec2): Vec2 {
    if (typeof multiplier === "number") {
      return new Vec2(multiplier * this.x, multiplier * this.y)
    }

    return new Vec2(multiplier.x * this.x, multiplier.y * this.y)
  }

  divide(divisor: number): Vec2
  divide(divisor: Vec2): Vec2
  divide<T>(divisor: number | Vec2): Vec2 {
    if (typeof divisor === "number") {
      return new Vec2(this.x / divisor, this.y / divisor)
    }

    return new Vec2(this.x / divisor.x, this.y / divisor.y)
  }
}

export default Vec2