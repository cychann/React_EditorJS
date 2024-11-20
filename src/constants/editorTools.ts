import {
  Delimiter,
  Emoji,
  File,
  Header,
  List,
  CustomParagraph,
  Place,
  Quote,
  UnifiedImage,
  Video,
} from "@/components/Editor/EditorTools/BlockTools/index";

import {
  FontPicker,
  Strikethrough,
  TextBackgroundColor,
  TextColor,
  Underline,
} from "@/components/Editor/EditorTools/InlineTools/index";

/**
 * Editor.js에서 사용되는 도구들의 설정 객체
 * Block Tools: 문단, 헤더, 인용구 등의 블록 레벨 도구들
 * Inline Tools: 폰트, 밑줄, 색상 등의 인라인 스타일 도구들
 */
export const EDITOR_JS_TOOLS = {
  /* Block Tool */
  paragraph: {
    class: CustomParagraph,
    inlineToolbar: [
      "link",
      "bold",
      "underline",
      "strikethrough",
      "font",
      "color",
      "backgroundColor",
    ],
  },
  header: {
    class: Header,
    inlineToolbar: [],

    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: [],
  },
  list: {
    class: List,
    inlineToolbar: [],
  },
  unifiedImage: UnifiedImage,
  video: Video,
  file: File,
  place: Place,
  emoji: Emoji,
  delimiter: Delimiter,

  /* Inline Tool */
  font: FontPicker,
  underline: Underline,
  strikethrough: Strikethrough,
  color: {
    class: TextColor,
    config: {
      colorCollections: [
        "#ffffff",
        "#000000",
        "#16b06d",
        "#00c6be",
        "#2e84b6",
        "#959595",
        "#f4c016",
        "#f6655b",
        "#ec4c69",
        "#5c5cb2",
      ],
    },
  },
  backgroundColor: {
    class: TextBackgroundColor,
    config: {
      colorCollections: [
        "#ffffff",
        "#000000",
        "#16b06d",
        "#00c6be",
        "#2e84b6",
        "#959595",
        "#f4c016",
        "#f6655b",
        "#ec4c69",
        "#5c5cb2",
      ],
    },
  },
};
