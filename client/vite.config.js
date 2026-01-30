import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Base path for GitHub Pages. Replace with your repo name if different.
const basePath = '/todo-app/'

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
