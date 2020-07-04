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
})