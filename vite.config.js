import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'data/maps/*', dest: 'data/maps' },
        { src: 'data/sprites/*', dest: 'data/sprites' },
        { src: 'data/music/*', dest: 'data/music' }
      ]
    })
  ],

  resolve: {
    extensions: ['.ts', '.json'],

    alias: {
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
      '@engine': fileURLToPath(new URL('./src/lib/engine', import.meta.url)),
    }
  }
})

