import World from "@patd/world"
import Display from "@patd/display"
import Controller from '@patd/controller'
import Player from "@patd/player"
import { throttle, debounce } from "throttle-debounce"
import Map from "@patd/map"
import Tile from "@patd/tile"
import WorldLayer from "@patd/layers/world_layer"
import SpriteSheet from "@patd/sprite_sheet"

const GameMap = require("@data/map.json") as Map
const Tiles = require("@data/tiles.json") as Tile[]

import TileSetData from "@data/tilesets.js"
import Vec2d from './vec2d'
import DebugLayer from './layers/debug_layer'
import AssetLoader from './asset_loader'

export default class Game {
  protected controller: Controller

  readonly world: World

  readonly element: Element
  readonly selector: string

  private _lastUpdate: any

  private _fpsBuffer = []
  private _fps: number = 0

  public sheets: SpriteSheet[] = []

  get player(): Player { return this.world.player }

  private handleThrottledControllerInput: Function
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
    this.world = new World({ map: GameMap, tiles: Tiles, scale: 6 })
    this.display = new Display()

    document.querySelector('#root').appendChild(this.display.canvas)

    let worldLayer = new WorldLayer({ world: this.world })
    this.display.addLayer(worldLayer)

    let debugLayer = new DebugLayer(this)
    this.display.addLayer(debugLayer)

    this.controller = new Controller()

    this.handleThrottledControllerInput = throttle(this.player.speed, false, (player, direction) => this.movePlayer(player))
    this.debouncedResize = debounce(500, false, this.resize.bind(this))

    // Prepare for rendering
    this.resize()

    // Re-render on resize
    window.addEventListener('resize', this.debouncedResize.bind(this), { passive: true })

    // Render
    this.requestFrame()
  }

  get fps(): number {
    return this._fps
  }

  private movePlayer(player: Player) {
    if (this.controller.right) {
      return this.world.move(player, new Vec2d({ x: 1, y: 0 }))
    }

    if (this.controller.left) {
      return this.world.move(player, new Vec2d({ x: -1, y: 0 }))
    }

    if (this.controller.up) {
      return this.world.move(player, new Vec2d({ x: 0, y: -1 }))
    }

    if (this.controller.down) {
      return this.world.move(player, new Vec2d({ x: 0, y: 1 }))
    }
  }

  private processTileSets(tiles, tilesets) {
    Object.keys(tilesets).forEach(tilesetName => {
      let tileset = tilesets[tilesetName]

      AssetLoader
        .loadInlineImage(tileset.image)
        .then(imageData => {
          SpriteSheet
            .load(imageData, 16, 16)
            .then(sheet => {
              // associate the names with the tiles, this should be cleaned up
              let textures = tileset.textures
              for (var i = 0; i < textures.length; i++) {
                let texture = textures[i]

                let sprite = sheet.spriteAt(texture.x, texture.y, 10)
                sprite.name = texture.name
                console.log(sprite)
              }

              for (var n = 0; n < tiles.length; n++) {
                let tile = tiles[n]

                if (tile["tileData"]) {
                  let tileData = tile.tileData
                  let tileset = tilesets[tileData.tileset]
                  let texture = tileData.texture

                  let sprite = sheet.get(texture)

                  tile.image = sprite.imageData
                }
              }

              this.sheets.push(sheet)
            })
        })
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
    const now = performance.now()

    while (this._fpsBuffer.length > 0 && this._fpsBuffer[0] <= now - 1000) {
      this._fpsBuffer.shift()
    }

    this._fpsBuffer.push(now)
    this._fps = this._fpsBuffer.length

    this.world.update()

    this.handleThrottledControllerInput(this.player)

    this.display.redraw()

    this._lastUpdate = performance.now()
    this.requestFrame()
   }
}