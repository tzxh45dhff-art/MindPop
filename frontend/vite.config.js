import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/json2video': {
        target: 'https://api.json2video.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/json2video/, '')
      }
    }
  }
})
