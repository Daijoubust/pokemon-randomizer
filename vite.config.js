import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      stream: 'stream-browserify',
      https: 'agent-base',
    },
  },
  plugins: [react()],
})
