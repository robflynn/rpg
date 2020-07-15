import Scene from '@engine/scene'
import Map from '@engine/map'
import Engine from '@engine/engine'
import { Tile } from '@engine/tile_set'
import { World, Direction } from '@engine/world'
import Controller from '@engine/controller'
import { Vec2 } from '@engine/vec2'
import Entity from "@engine/entity"
import { Asset } from '@engine/asset_loader'
import { DEFAULT_TILE_SIZE } from '@engine/defaults';

export class GLWorldScene extends Scene {
  readonly world: World

  private controller: Controller = new Controller()
  private foo: WebGL2RenderingContext

  get tileSize(): number {
    return this.map.tileSize
  }

  get map(): Map {
    return this.world.map
  }

  constructor(engine: Engine, world: World) {
    super(engine, engine.width, engine.height)

    this.canvas = document.createElement('canvas')
    this.foo = this.canvas.getContext('webgl2', { antialias: false })

     this.world = world
  }

  render() {
    this.renderMap()
  }

  renderMap() {
    let NUM_IMAGES = 1

    let tileset = this.world.map.tileset
    let tile = tileset.getTileByName("player")
    let gl = this.foo

    let data = tile.sprite.image.getContext('2d').getImageData(0, 0, DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE)
    let pixels = new Uint8Array(data.data.buffer)

    var texture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage3D(
        gl.TEXTURE_2D_ARRAY,
        0,
        gl.RGBA,
        DEFAULT_TILE_SIZE, // width
        DEFAULT_TILE_SIZE, // height
        NUM_IMAGES,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels
    );

  }
}

export default GLWorldScene