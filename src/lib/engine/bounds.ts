export default class Bounds {
  x: number
  y: number
  width: number
  height: number

  get xMin(): number {
    return this.x
  }

  get xMax(): number {
    return this.x + this.width
  }

  get yMin(): number {
    return this.y
  }

  get yMax(): number {
    return this.y + this.height
  }

  constructor(x: number, y:number, width:number, height:number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  intersects(that: Bounds): boolean {
    return (this.x < that.x + that.width &&
      this.x + this.width > that.x &&
      this.y < that.y + that.height &&
      this.y + this.height > that.y)
  }
}