import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

function copyAssets() {
  const srcDir = resolve(__dirname, 'assets');
  const destDir = resolve(__dirname, 'dist/assets');
  
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  
  const files = readdirSync(srcDir);
  files.forEach(file => {
    copyFileSync(resolve(srcDir, file), resolve(destDir, file));
  });
  
  console.log('Assets copiados para dist/assets/');
}

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        meusEventos: resolve(__dirname, 'meus-eventos.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-assets',
      closeBundle() {
        copyAssets();
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
