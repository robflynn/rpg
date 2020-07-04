import { Character, CharacterArguments } from '@patd/character'
import Vec2d from '@patd/vec2d'

export class Player extends Character {

  readonly speed: number = 50
  readonly stride: number = 1

  constructor({ position }: CharacterArguments = {} as CharacterArguments) {
    super({ position })
  }
}

export default Player