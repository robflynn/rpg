import Vue from 'vue/dist/vue.esm'

// @ts-ignore
import App from "@editor/app.vue"

document.addEventListener('DOMContentLoaded', () => {
  let editorElement = document.querySelector('#editor')
  if (editorElement) {
    new Vue({
      el: editorElement,
      render: h => h(App),
    })
  }
})