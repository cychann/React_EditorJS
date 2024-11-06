import Delimiter from "components/Editor/Blocks/Delimiter";
import Emoji from "components/Editor/Blocks/Emoji";
import File from "components/Editor/Blocks/File";
import GroupImage from "components/Editor/Blocks/GroupImage";
import Image from "components/Editor/Blocks/Image";
import CustomParagraph from "components/Editor/Blocks/Paragraph";
import Place from "components/Editor/Blocks/Place";
import Video from "components/Editor/Blocks/Video";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: CustomParagraph,
    inlineToolbar: true,
  },
  image: Image,
  groupImage: GroupImage,
  video: Video,
  file: File,
  place: Place,
  emoji: Emoji,
  delimiter: Delimiter,
};
