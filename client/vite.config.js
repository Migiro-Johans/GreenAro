import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      'nonenergetically-nonimpregnated-garfield.ngrok-free.dev',
      'localhost',
      '.ngrok-free.app',
      '.ngrok.io'
    ],
    proxy: {
      '/api': {
	target: 'http://localhost:5000',
	changeOrigin:true,
      }
    }
  }
})
