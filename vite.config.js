// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
    plugins: [
        react(),
    ],
    root: './src',
    // publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: false,
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components'),
        },
    },
    server: {
        open: true,
        watch: {
            usePolling: true,
        },
    },
    optimizeDeps: {
        esbuildOptions: {
          plugins: [
            {
              name: "load-js-files-as-jsx",
              setup(build) {
                build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                  loader: "jsx",
                  contents: await fs.readFile(args.path, "utf8"),
                }));
              },
            },
          ],
        },
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
});
