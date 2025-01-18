import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const { resolve } = require("path");

export default defineConfig({
  root: "src/entrypoints",
  plugins: [preact()],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        deckmakerdm: "src/entrypoints/dm/deckmaker/index.html",
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
