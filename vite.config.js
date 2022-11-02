import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  serveur: {
    proxy: {
      "/api/v1" : "http://localhost:8005/"
    },
  },
  plugins: [react()],


})

