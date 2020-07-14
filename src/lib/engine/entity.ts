import Vec2 from "@engine/vec2"
import Sprite from "@engine/sprite"
import World from "@engine/world"

export class Entity {
  get position(): Vec2 { return this._position }
  set position(position: Vec2) { this._position = position; this.positionChanged() }
  protected _position: Vec2 = Vec2.zero

  get sprite(): Sprite { return this._sprite }
  set sprite(sprite: Sprite) { this._sprite = sprite; this.spriteChanged(); }
  protected _sprite?: Sprite

  onUpdate?: Function
  world: World

  update(elapsedTime: number) {
    if (this.onUpdate) { this.onUpdate(this, elapsedTime) }
  }

  // TODO: Temporary method.  Refactor.
  teleportTo(col: number, row: number) {
    let xpos = col * 16  // FIXME: Don't hard code this. This is proof to me that this is the wrong place for this.
    let ypos = row * 16

    this.position = new Vec2(xpos, ypos)
  }

  positionChanged() {}
  spriteChanged() {}
}

export default Entity