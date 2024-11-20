import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5005', // Backend API URL
        changeOrigin: true, // Ensures the host header of the request is changed to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite the URL
      },
    },
  },
})
