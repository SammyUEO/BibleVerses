// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/bibleapi': {
        target: 'https://api.getbible.net',
        changeOrigin: true,
        secure: false, // De obicei nu e necesar pentru HTTPS public, dar nu strică
        rewrite: (path) => path.replace(/^\/bibleapi/, ''),
        // --- ADAUGĂ TIMEOUT ---
        // Setează timeout-ul la 30 de secunde (30000 ms)
        // Poți ajusta valoarea dacă este necesar
        timeout: 30000,
        // --- SFÂRȘIT ADAUGARE ---
      },
    },
  },
})
