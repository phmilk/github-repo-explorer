import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // New feature-based aliases
      '@app': path.resolve(__dirname, './src/app'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features/auth': path.resolve(__dirname, './src/features/auth'),
      '@features/users': path.resolve(__dirname, './src/features/users'),
      '@features/repositories': path.resolve(
        __dirname,
        './src/features/repositories'
      )
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true
  }
})
