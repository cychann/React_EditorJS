import { HtmlTagDescriptor } from "vite";

/**
 * 선택적 폰트 preload 전략
 *
 * Critical fonts: 페이지 로드 시 즉시 필요한 폰트 (Regular weight만)
 * - 가장 많이 사용되는 폰트
 * - 초기 화면에 보이는 텍스트의 폰트
 *
 * Non-critical fonts: 사용자 인터랙션 시 필요한 폰트 (Bold weight 등)
 * - 필요할 때 lazy loading
 */

const criticalFonts = [
  "NotoSansKR-Regular.woff2",
  "NanumMyeongjo.woff2",
  "NanumGothic.woff2",
  "NanumBarunGothic.woff2",
  "Helvetica.woff2",
];

export const injectFontsToHead: HtmlTagDescriptor[] = criticalFonts.map(
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
