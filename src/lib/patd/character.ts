import GameObject from "@patd/object"

export class Character extends GameObject {
  readonly speed: number = 150

  constructor() {
    super()
  }
}

export default Character