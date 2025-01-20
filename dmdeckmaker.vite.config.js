import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

export default defineConfig({
  root: "src/entrypoints",
  plugins: [preact()],
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        "main": "src/entrypoints/dm/deckmaker/index.html",
      },
      output: {
        entryFileNames: "bundle.js",
      },
    },
  },
});
