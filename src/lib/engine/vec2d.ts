export class Vec2d {
  x: number
  y: number

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