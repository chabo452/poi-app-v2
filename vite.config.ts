import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/poi-app-v2/',
  plugins: [react()],
})
