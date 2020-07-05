console.log('new engine choo choo')

import Engine from "@engine/engine"
import AssetLoader from "@engine/asset_loader"

const DungeonMap = require("@data/maps/dungeon.map.json")

import Scene from "@engine/scene"

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

    this.loadGameData()
  }

  onUpdate(time) {
  }

  onStateChange(fromState, toState) {
    console.log(`State changed: ${fromState} -> ${toState}`)
  }

  private async loadGameData() {
    let map = await AssetLoader.loadMapFromJSON(DungeonMap)
    console.log(map)
  }
}

let engine = new PatdGame("#editor", 16 * 32, 16 * 32)

AssetLoader
  .loadMapFromJSON(DungeonMap)
  .then(map => {
    console.log(map)
    //engine.loadMap(map)
    engine.start()
  })

/*
import Vue from 'vue'

import App from "@editor/app.vue"
import SplitPane from 'vue-splitpane'
import AssetLoader from './lib/patd/asset_loader';

Vue.component('split-pane', SplitPane)

document.addEventListener('DOMContentLoaded', () => {
  let editorElement = document.querySelector('#editor')
  if (editorElement) {
    new Vue({
      el: editorElement,
      render: h => h(App),
    })
  }
})*/