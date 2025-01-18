import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const { resolve } = require("path");

export default defineConfig({
  root: "src/entrypoints",
  plugins: [preact()],
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        dmdeckmaker: "src/entrypoints/dm/deckmaker/index.html",
        dmdemo: "src/entrypoints/dm/demo/index.html",
      },
      output: {
        entryFileNames: "assets/[name]/bundle.js",
        assetFileNames: (asset) => asset.name === ".css" ? (
          "assets/[name]/index.css"
        ) : (
          "assets/[name]/[hash].[ext]"
        ),
      },
    },
  },
});
