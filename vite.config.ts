import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { injectFontsToHead } from "./src/utils/fontPreload";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        tags: injectFontsToHead,
      },
    }),
  ],
  publicDir: "public",
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      constants: path.resolve(__dirname, "./src/constants"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      store: path.resolve(__dirname, "./src/store"),
      styles: path.resolve(__dirname, "./src/styles"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
