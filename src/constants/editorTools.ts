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
import Underline from "components/Editor/EditorTools/InlineTools/Underline";

export const EDITOR_JS_TOOLS = {
  /* Block Tool */
  paragraph: {
    class: CustomParagraph,
    inlineToolbar: ["bold", "underline", "strikethrough", "link"],
  },
  header: {
    class: Header,
    inlineToolbar: ["bold", "underline", "strikethrough", "link"],
    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: ["bold", "underline", "strikethrough", "link"],
  },
  list: {
    class: List,
    inlineToolbar: ["bold", "underline", "strikethrough", "link"],
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
};
