/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';

import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Convert all environment variables to stringified format for use in the define object
  const defineEnv: Record<string, string> = {};
  for (const key in env) {
    defineEnv[`process.env.${key}`] = JSON.stringify(env[key]);
  }
  return {
    root: __dirname,
    cacheDir: './node_modules/.vite/.',
    define: defineEnv,

    plugins: [
      svgr(),
      react(),
      nxViteTsPaths(),
      EnvironmentPlugin('all', { prefix: 'VITE_' }),
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    build: {
      outDir: './dist/near-multichain-demo',
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },

    test: {
      globals: true,
      cache: {
        dir: './node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
        reportsDirectory: './coverage/near-multichain-demo',
        provider: 'v8',
      },
    },
  };
});
