import Delimiter from "components/Editor/Blocks/Delimiter";
import Emoji from "components/Editor/Blocks/Emoji";
import File from "components/Editor/Blocks/File";
import CustomParagraph from "components/Editor/Blocks/Paragraph";
import Place from "components/Editor/Blocks/Place";
import UnifiedImage from "components/Editor/Blocks/UnifiedImage";
import Video from "components/Editor/Blocks/Video";

export const EDITOR_JS_TOOLS = {
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
};
