import Engine from "@engine/engine"
import { global as AssetManager } from "@engine/asset_loader"

import Scene from "@engine/scene"
import WorldScene from "@engine/scenes/world_scene"
import { World } from "@engine/world"
import Character from '@engine/entities/character'
import TileSet from "@engine/tile_set"
import Map from "@engine/map"
import * as ease from 'easy-ease'


/*
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

let time = 0
let diff = 30
let minTime = 0
let maxTime = 150

for (var i = 0, len = diff; i <= len; i++) {
  (function(s) {
    setTimeout(function() {
      torch.position.y += 1
    }, time);
  })(i);

  time = easeInQuad(i, minTime, maxTime, diff);
  console.log(time);
}
*/

/*
class Tween {
  static to(object, duration, from, to) {
    let time = 0

  }
}
*/

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
    let sprite = tileset.getTileByName("torch").sprite

    let spookyboi = new Character()
    spookyboi.position.x = 250
    spookyboi.position.y = 50
    spookyboi.glowing = false
    spookyboi.sprite = sprite
    spookyboi.onUpdate = (elapsedTime) => {
      let player = this.world.player
      let heading = player.position.subtract(spookyboi.position)
      let distance = Math.sqrt((heading.y * heading.y) + (heading.x * heading.x))
      let direction = heading.divide(distance)
      //console.log(direction)
      spookyboi.velocity = direction
    }

    // this.world.addEntity(spookyboi)

    for (var i = 0; i < 9; i++) {
      let torch = new Character()
      torch.sprite = tileset.getTileByName('torch').sprite
      torch.position.x = 32 + (i * 32)
      torch.position.y = -15
      torch.glowing = false

      this.world.addEntity(torch)

      ease({
        startValue: -15,
        endValue: 0,
        durationMs: 250,
        onStep: (y) => { torch.position.y = y },
        onComplete: () => { console.log('done easing') }
      })
    }

    let candle = new Character()
    candle.sprite = tileset.getTileByName('candle').sprite
    candle.position.x = 16 * 1
    candle.position.y = 16 * 8
    this.world.addEntity(candle)

    let candle2 = new Character()
    candle2.sprite = tileset.getTileByName('candle').sprite
    candle2.position.x = 16 * 18
    candle2.position.y = 16 * 8
    this.world.addEntity(candle2)




/*
    let time = 0
    let diff = 30
    let minTime = 0
    let maxTime = 150

    for (var i = 0, len = diff; i <= len; i++) {
      (function(s) {
        setTimeout(function() {
          torch.position.y += 1
        }, time);
      })(i);

      time = easeInQuad(i, minTime, maxTime, diff);
      console.log(time);
    }
    */


  }
}

let engine = new PatdGame("#editor", 16 * 32 * 4, 16 * 32 * 4)
engine.start()
