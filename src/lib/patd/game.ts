import GameObject from '@patd/object'
import World from "@patd/world"
import Display from "@patd/display"
import Controller from '@patd/controller'
import Player from "@patd/player"
import { throttle, debounce } from "throttle-debounce"
import Map from "@patd/map"
import Tile from "@patd/tile"
import WorldLayer from "@patd/layers/world_layer"

const GameMap = require("@data/map.json") as Map
const Tiles = require("@data/tiles.json") as Tile[]

import TileSetData from "@data/tilesets.js"

//#region Helper Abstractions
const forEach = (array, callback) => {
  for (var n = 0; n < array.length; n++) {
    let item = array[n]

    callback(item)
  }
}

export default class Game {
  protected controller: Controller

  readonly world: World

  readonly element: Element
  readonly selector: string

  private _lastUpdate: any

  get player(): Player { return this.world.player }

  private throttledMovePlayerTo: Function
  private debouncedResize: Function

  private display: Display

  constructor(selector: string) {
    // Setup the containing element
    this.element = document.querySelector(selector)
    this.selector = selector
    if (!this.element) { throw `Could not find game container: ${selector}.` }
    this.element.innerHTML = ''

    // Pre-process the tiles before handing them over to the game world.
    // We need to do some tile -> texture associations and image pre-loading
    // This can be moved to a loader class later.
    this.processTileSets(Tiles, TileSetData)

    // Instantiate dependencies
    this.world = new World({ map: GameMap, tiles: Tiles, scale: 2 })
    this.display = new Display()

    document.querySelector('#root').appendChild(this.display.canvas)

    let worldLayer = new WorldLayer({ world: this.world })
    this.display.addLayer(worldLayer)

    this.controller = new Controller()

    this.throttledMovePlayerTo = throttle(this.player.speed, false, (player, position) => player.position = position)
    this.debouncedResize = debounce(500, false, this.resize.bind(this))

    // Prepare for rendering
    this.resize()

    // Re-render on resize
    window.addEventListener('resize', this.debouncedResize.bind(this), { passive: true })

    // Render
    this.requestFrame()
  }

  private processTileSets(tiles, tilesets) {
    Object.keys(tilesets).forEach(tilesetName => {
      let tileset = tilesets[tilesetName]
      let image = new Image()

      image.onload = () => {
        let canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        context.drawImage(image, 0, 0)

        tileset.textures.forEach(texture => {
          let textureImage = context.getImageData(texture.x, texture.y, 16, 16)

          for (var y = 0; y < textureImage.height; y++) {
            for (var x = 0; x < textureImage.width; x++) {
              let data = textureImage.data
              let offset = (y * 16 * 4) + (x * 4)
              let red = data[offset]
              let green = data[offset + 1]
              let blue = data[offset + 2]

              // magenta alpha mask
              if (red == 255 && green == 0 && blue == 255) {
                // set alpha 0
                data[offset + 3] = 0
              }
            }
          }

          texture.image = textureImage
        })

        tiles.forEach(tile => {
          if (tile["tileData"]) {
            let tileData = tile.tileData
            let tileset = tilesets[tileData.tileset]
            let texture = tileData.texture

            let matchedTexture = tileset.textures.filter(tilesetTexture => tilesetTexture.name == texture)
            if (matchedTexture && matchedTexture.length) {
              matchedTexture = matchedTexture[0]

              tile.image = matchedTexture.image
            }
          }
        })

      }
      image.src = tileset.image
    })
  }

  private requestFrame() {
    window.requestAnimationFrame(this.update.bind(this))
  }

  protected resize() {
    let width = window.innerWidth
    let height = window.innerHeight

    this.display.resize(width, height)
  }

  update(time) {
    this.world.update()

    let newPosition = { x: this.player.position.x, y: this.player.position.y }

    if (this.controller.right && this.world.canMoveRight(this.player)) {
      newPosition.x++
    }

    if (this.controller.left && this.world.canMoveLeft(this.player)) {
      newPosition.x--
    }

    if (this.controller.down && this.world.canMoveDown(this.player)) {
      if (newPosition.y < this.world.maxTileY) {
        newPosition.y++
      }
    }

    if (this.controller.up && this.world.canMoveUp(this.player)) {
      if (newPosition.y > 0) {
        newPosition.y--
      }
    }

    this.throttledMovePlayerTo(this.player, newPosition)

    this.display.redraw()

    this._lastUpdate = performance.now()
    this.requestFrame()
  }
}