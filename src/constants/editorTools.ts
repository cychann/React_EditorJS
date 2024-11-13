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
import Strikethrough from "components/Editor/EditorTools/InlineTools/StrikeThrough";
import ColorPicker from "components/Editor/EditorTools/InlineTools/TextColor";
import Underline from "components/Editor/EditorTools/InlineTools/Underline";

export const EDITOR_JS_TOOLS = {
  /* Block Tool */
  paragraph: {
    class: CustomParagraph,
    inlineToolbar: ["bold", "underline", "strikethrough", "link", "color"],
  },
  header: {
    class: Header,
    inlineToolbar: ["bold", "underline", "strikethrough", "link", "color"],

    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: ["bold", "underline", "strikethrough", "link", "color"],
  },
  list: {
    class: List,
    inlineToolbar: ["bold", "underline", "strikethrough", "link", "color"],
  },
  unifiedImage: UnifiedImage,
  video: Video,
  file: File,
  place: Place,
  emoji: Emoji,
  delimiter: Delimiter,

  /* Inline Tool */
  underline: Underline,
  strikethrough: Strikethrough,
  color: {
    class: ColorPicker,
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
      ],
    },
  },
};
