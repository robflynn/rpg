import Engine from "@engine/engine"
import { global as AssetManager } from "@engine/asset_loader"

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
    for (var i = 0; i < assets.length; i++) {
      let assetName = assets[i]
      let asset = await this.loadAsset(assetName).catch((err) => { console.log("some kind of err? ", err)} )
    }

    this.initializeGame()
  }

  async loadAsset(asset: string) {
    let name = asset

    return AssetManager.loadAsset(name)
  }

  onUpdate(time) {
  }

  onStateChange(fromState, toState) {
    console.log(`State changed: ${fromState} -> ${toState}`)
  }

  private async initializeGame() {
    let map = AssetManager.get('maps/dungeon.map.json') as Map
    this.world.map = map

    let scene = new WorldScene(this, this.world)
    this.scene = scene

    let tileset = map.tileset
    let sprite = tileset.getTileByName("badguy").sprite

    let spookyboi = new Character()
    spookyboi.position.x = 250
    spookyboi.position.y = 50
    spookyboi.sprite = sprite
    spookyboi.onUpdate = (elapsedTime) => {
      let player = this.world.player
      let heading = player.position.subtract(spookyboi.position)
      let distance = Math.sqrt((heading.y * heading.y) + (heading.x * heading.x))
      let direction = heading.divide(distance)
      console.log(direction)
      spookyboi.velocity = direction
    }

    this.world.addEntity(spookyboi)
  }
}

let engine = new PatdGame("#editor", 16 * 32 * 2, 16 * 32 * 2)
engine.start()
