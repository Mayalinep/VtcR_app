import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        '**/*.config.*',
        '**/types/**',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      // Aligné avec tsconfig.json : @/* pointe vers ./* (racine du projet app/)
      '@': path.resolve(__dirname, '..'),
    },
  },
});
