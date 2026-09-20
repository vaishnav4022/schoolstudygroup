import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Do not auto-select another port; fail if 3000 is in use.
    strictPort: true,
    proxy: {
      // All requests to /api/v1/* are forwarded to the backend.
      // The browser only ever sees localhost:3000 → no CORS preflight needed.
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
