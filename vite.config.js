import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine the base path based on environment
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const isNetlify = process.env.NETLIFY === 'true'

// Choose appropriate base path based on deployment platform
let base = '/'
if (isGitHubPages) {
  base = '/whats-new-prototype/'
} else if (isNetlify) {
  base = '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
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