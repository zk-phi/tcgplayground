import nestedPlugin from "postcss-nested";
import importGlobPlugin from "postcss-import-ext-glob";
import importPlugin from "postcss-import";
import minifyPlugin from "postcss-minify";

export default {
  plugins: [
    nestedPlugin,
    importGlobPlugin,
    importPlugin,
    minifyPlugin,
  ],
};
