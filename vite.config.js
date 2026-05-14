import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { copyFileSync, mkdirSync, existsSync, cpSync } from 'fs';
import { resolve } from 'path';

function copyAllAssets() {
  const srcAssets = resolve(__dirname, 'assets');
  const destAssets = resolve(__dirname, 'dist/assets');
  const destJs = resolve(__dirname, 'dist/js');

  if (!existsSync(destAssets)) {
    mkdirSync(destAssets, { recursive: true });
  }
  if (!existsSync(destJs)) {
    mkdirSync(destJs, { recursive: true });
  }

  cpSync(srcAssets, destAssets, { recursive: true });
  copyFileSync(resolve(__dirname, 'js/app.js'), resolve(destJs, 'app.js'));

  console.log('Assets e JS copiados para dist/');
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        home: 'home.html',
        meusEventos: 'meus-eventos.html',
      },
    },
  },
  plugins: [
    {
      name: 'copy-all-assets',
      closeBundle() {
        copyAllAssets();
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/*.png', 'assets/*.jpg', 'assets/*.svg'],
      manifest: {
        name: 'Eventim Fusion',
        short_name: 'Eventim',
        description: 'Seus ingressos em um só lugar',
        theme_color: '#1d2144',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'assets/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/\/assets\//]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});