import Delimiter from "components/Editor/EditorTools/BlockTools/Delimiter";
import Emoji from "components/Editor/EditorTools/BlockTools/Emoji";
import File from "components/Editor/EditorTools/BlockTools/File";
import Header from "components/Editor/EditorTools/BlockTools/Header";
import List from "components/Editor/EditorTools/BlockTools/List";
import CustomParagraph from "components/Editor/EditorTools/BlockTools/Paragraph";
import Place from "components/Editor/EditorTools/BlockTools/Place";
import Quote from "components/Editor/EditorTools/BlockTools/Quote";
import UnifiedImage from "components/Editor/EditorTools/BlockTools/UnifiedImage";
import Video from "components/Editor/EditorTools/BlockTools/Video";
import FontPicker from "components/Editor/EditorTools/InlineTools/FontPicker";
import Strikethrough from "components/Editor/EditorTools/InlineTools/StrikeThrough";
import BackgroundColorPicker from "components/Editor/EditorTools/InlineTools/TextBackgroundColor";
import ColorPicker from "components/Editor/EditorTools/InlineTools/TextColor";
import Underline from "components/Editor/EditorTools/InlineTools/Underline";

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
    class: ColorPicker,
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
    class: BackgroundColorPicker,
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
