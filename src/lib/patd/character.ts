import GameObject from "@patd/object"
import Vec2d from "@patd/vec2d"

export interface CharacterArguments {
  position: Vec2d
}

export class Character extends GameObject {
  readonly speed: number = 150

  private _position: Vec2d

  get position(): Vec2d { return this._position }
  set position(value: Vec2d) { this._position = value }

  constructor({ position }: CharacterArguments = {} as CharacterArguments) {
    super()

    this._position = position || new Vec2d({ x: 0, y: 0 })
  }
}

export default Character