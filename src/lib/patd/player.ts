import Character from '@patd/character'
import Vec2d from '@patd/vec2d'

export interface PlayerArguments {
  position: Vec2d
}

export class Player extends Character {
  private _position: Vec2d

  get position(): Vec2d { return this._position }
  set position(value: Vec2d) { this._position = value }

  constructor({ position }: PlayerArguments = {} as PlayerArguments) {
    super()

    this._position = position || { x: 0, y: 0 }
  }
}

export default Player