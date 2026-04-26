import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    host: '127.0.0.1',
    open: '/'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022'
  },
  // Let Vite serve static files from /images and /i18n
  publicDir: 'public'
});
