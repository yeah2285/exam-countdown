import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // GitHub Pages 部署路径（请根据您的仓库名修改）
  // 如果仓库名是 'LawExamApp'，则 base 为 '/LawExamApp/'
  // 如果是用户/用户名.github.io，则 base 为 '/'
  base: '/exam-countdown/',

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: '法考倒计时 2026',
        short_name: '法考倒计时',
        description: '2026年法考倒计时与每日诗词',
        theme_color: '#8B1A1A',
        background_color: '#F5E6D3',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/exam-countdown/',
        icons: [
          {
            src: '/exam-countdown/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/exam-countdown/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  css: {
    devSourcemap: false
  }
});
