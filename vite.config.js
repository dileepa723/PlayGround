import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // three.js is a single large dependency; the game is intentionally one bundle
    chunkSizeWarningLimit: 800,
  },
})
