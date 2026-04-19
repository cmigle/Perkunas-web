import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5180,
    strictPort: true,
    host: '127.0.0.1',
    open: '/index.html'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
