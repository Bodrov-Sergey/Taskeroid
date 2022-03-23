import { resolve } from 'path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: {
      '@router': resolve(__dirname, 'src/router/index.ts'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@api': resolve(__dirname, 'src/api.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`,
      },
    },
  },

  esbuild: {
    jsxInject: `import * as React from 'react';`,
  },
});
