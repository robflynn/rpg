console.log('new engine choo choo')

import Engine from "@engine/engine"
import AssetLoader from "@engine/asset_loader"

const DungeonMap = require("@data/maps/dungeon.map.json")

class PatdGame extends Engine {
  onCreate() {
    console.log('patd game created.')
  }

  onStart() {
    console.log('patd game started.')
  }

  onUpdate(time) {
    console.log(time)
  }

  onStateChange(fromState, toState) {
    console.log(`State changed: ${fromState} -> ${toState}`)
  }
}

let engine = new PatdGame("#editor", 16 * 32, 16 * 32)

AssetLoader
  .loadMapFromJSON(DungeonMap)
  .then(map => {
    engine.loadMap(map)
    engine.start()
  })

/*
import Vue from 'vue'

import App from "@editor/app.vue"
import SplitPane from 'vue-splitpane'

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