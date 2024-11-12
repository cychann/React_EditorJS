import Delimiter from "components/Editor/EditorTools/BlockTools/Delimiter";
import Emoji from "components/Editor/EditorTools/BlockTools/Emoji";
import File from "components/Editor/EditorTools/BlockTools/File";
import CustomParagraph from "components/Editor/EditorTools/BlockTools/Paragraph";
import Place from "components/Editor/EditorTools/BlockTools/Place";
import UnifiedImage from "components/Editor/EditorTools/BlockTools/UnifiedImage";
import Video from "components/Editor/EditorTools/BlockTools/Video";
import Strikethrough from "components/Editor/EditorTools/InlineTools/StrikeThrough";
import Underline from "components/Editor/EditorTools/InlineTools/Underline";

export const EDITOR_JS_TOOLS = {
  /* Block Tool */
  paragraph: {
    class: CustomParagraph,
    inlineToolbar: true,
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
