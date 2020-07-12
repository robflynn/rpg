import Engine from "@engine/engine"
import { global as AssetLoader } from "@engine/asset_loader"

const DungeonMap = require("@data/maps/dungeon.map.json")

import Scene from "@engine/scene"
import WorldScene from "@engine/scenes/world_scene"
import { World } from "@engine/world"
import Character from '@engine/entities/character'
import TileSet from "@engine/tile_set"
import Map from "@engine/map"

let assets = [
  "sprites/dungeon_tiles.png",
  "maps/dungeon.map.json",
]

let pendingAssets = Object.keys(assets).length

class LoadingScene extends Scene {
  render() {
    let c = this.context

    c.fillStyle = 'black'
    c.fillRect(0, 0, this.width, this.height)

    c.font = '20px monospace'
    c.fillStyle = 'white'
    c.fillText("Loading...", 50, 50)
  }
}

class PatdGame extends Engine {
  onCreate() {
    console.log('patd game created.')
  }

  onStart() {
    console.log('patd game started.')

    // Show the loading scene
    this.scene = new LoadingScene(this, this.width, this.height)

    this.loadAssets()
  }

  async loadAssets() {
    Promise.all(assets.map(asset => this.loadAsset(asset)))
      .then(() => {
        this.initializeGame()

        let mapJSON = AssetLoader.get("maps/dungeon.map.json")
        console.log(mapJSON)
      })
  }

  async loadAsset(asset: string) {
    let name = asset

    return AssetLoader.loadAsset(name)
  }

  onUpdate(time) {
  }

  onStateChange(fromState, toState) {
    console.log(`State changed: ${fromState} -> ${toState}`)
  }

  private async initializeGame() {
    let map = AssetLoader.get('maps/dungeon.map.json')
    this.world.map = map

    let scene = new WorldScene(this, this.world)
    this.scene = scene
  }
}

let engine = new PatdGame("#editor", 16 * 32 * 2, 16 * 32 * 2)
engine.start()
