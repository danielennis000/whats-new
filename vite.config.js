import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/whats-new/',
  server: {
    proxy: {
      '/api/rss-feed': {
        target: 'https://ai.asu.edu/taxonomy/term/1/feed',
        changeOrigin: true,
        rewrite: (path) => '',
        configure: (proxy, options) => {
          // Add custom headers to bypass certain restrictions
          proxy.on('proxyReq', function(proxyReq, req, res) {
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
            proxyReq.setHeader('Accept', 'application/rss+xml, application/xml, text/xml');
          });
        }
      }
    }
  },
})