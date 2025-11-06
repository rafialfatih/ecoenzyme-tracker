import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    deps: {
      inline: ['vue-router'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '.jpg': fileURLToPath(new URL('./src/__tests__/setup/mockImage.js', import.meta.url)),
      '.png': fileURLToPath(new URL('./src/__tests__/setup/mockImage.js', import.meta.url)),
    },
  },
})
