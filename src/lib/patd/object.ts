import { v4 as uuidv4 } from 'uuid'

type Identifier = string

interface GameObjectArguments {
  id?: Identifier
}

export default class GameObject {
  readonly id: Identifier

  constructor({ id }: GameObjectArguments = {}) {
    this.id = id || uuidv4()

    console.log(`Game object online: [${this.id}]`)
  }

  update() {}
}