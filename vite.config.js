import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/iTask/', // <-- Must be your EXACT repo name
  build: {
    outDir: 'dist',
  }
})

