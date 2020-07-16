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

const vertexShader =
`#version 300 es
precision highp float;
precision highp int;

void main()
{
    gl_Position = vec4(2.f * float(uint(gl_VertexID) % 2u) - 1.f, 2.f * float(uint(gl_VertexID) / 2u) - 1.f, 0.0, 1.0);
}
`

const fragmentShader =
`#version 300 es
precision highp float;
precision highp int;

uniform sampler2D diffuse;

uniform vec2 u_imageSize;

out vec4 color;

void main()
{
    color = texture(diffuse, vec2(gl_FragCoord.x, u_imageSize.y - gl_FragCoord.y) / u_imageSize);
}
`

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

  createShader(source, type): WebGLShader {
    let gl = this.foo
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    return shader
  }

  createProgram(): WebGLProgram {
    let gl = this.foo

    let program = gl.createProgram()
    let vs = this.createShader(vertexShader, gl.VERTEX_SHADER)
    let fs = this.createShader(fragmentShader, gl.FRAGMENT_SHADER)
    gl.attachShader(program, vs)
    gl.deleteShader(vs)
    gl.attachShader(program, fs)
    gl.deleteShader(fs)
    gl.linkProgram(program)

    var vslog = gl.getShaderInfoLog(vs)
    if (vslog) {
      console.log(vslog)
    }

    var fslog = gl.getShaderInfoLog(fs)
    if (fslog) {
      console.log(fslog)
    }

    return program
  }

  renderMap() {
    let NUM_IMAGES = 1

    let tileset = this.world.map.tileset
    let tile = tileset.getTileByName("player")
    let gl = this.foo

    let data = tile.sprite.image.getContext('2d').getImageData(0, 0, DEFAULT_TILE_SIZE, DEFAULT_TILE_SIZE)
    let pixels = new Uint8Array(data.data.buffer)

    let program = this.createProgram()

    var diffuseLocation = gl.getUniformLocation(program, 'diffuse');
    var imageSizeLocation = gl.getUniformLocation(program, 'u_imageSize');
    var vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);


    var texture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tile.sprite.image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    // -- Render
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.uniform1i(diffuseLocation, 0)
    gl.uniform2f(imageSizeLocation, this.canvas.width / 2, this.canvas.height / 2)

    gl.bindVertexArray(vertexArray);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Delete WebGL resources
    gl.deleteTexture(texture);
    gl.deleteProgram(program);
    gl.deleteVertexArray(vertexArray);
  }
}

export default GLWorldScene