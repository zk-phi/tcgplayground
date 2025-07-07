import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import { resolve } from "path";

export default defineConfig({
  root: "src/entrypoints",
  base: "/tcgplayground/",
  plugins: [preact()],
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/entrypoints/index.html",
        dm: "src/entrypoints/dm/demo/index.html",
        battle: "src/entrypoints/dm/battle/index.html",
        poke: "src/entrypoints/poke/demo/index.html",
      },
    },
  },
});
