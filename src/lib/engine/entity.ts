import Vec2 from "@engine/vec2"

export class Entity {
  get position(): Vec2 { return this._position }
  set position(position: Vec2) { this._position = position; this.positionChanged() }
  protected _position: Vec2 = Vec2.zero

  positionChanged() {}

  // TODO: Temporary method.  Refactor.
  teleportTo(col: number, row: number) {
    let xpos = col * 16  // FIXME: Don't hard code this. This is proof to me that this is the wrong place for this.
    let ypos = row * 16

    this.position = new Vec2(xpos, ypos)
  }
}

export default Entity