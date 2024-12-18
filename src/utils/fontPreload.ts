import { readdirSync } from "fs";
import { resolve } from "path";
import { HtmlTagDescriptor } from "vite";

const fontsDirectory = resolve(__dirname, "../../public/assets/fonts");

const fontFiles = readdirSync(fontsDirectory).filter((file) =>
  file.endsWith(".woff2")
);

export const injectFontsToHead: HtmlTagDescriptor[] = fontFiles.map(
  (fontFile) => ({
    injectTo: "head",
    tag: "link",
    attrs: {
      rel: "preload",
      href: `/assets/fonts/${fontFile}`, 
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  })
);
