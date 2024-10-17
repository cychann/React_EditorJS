import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import React from "react";
import Text from "components/Editor/Block/Text/Text";
import * as S from "./EditorContent.style";
import Image from "../Block/Image/Image";
import GroupImage from "../Block/GroupImage/GroupImage";
import Video from "../Block/Video/Video";
import File from "../Block/File/File";
import Place from "../Block/Place/Place";
import Emoji from "../Block/Emoji/Emoji";
import Line from "../Block/Line/Line";
import Align from "../Block/Align/Align";
import { EditorBlockType } from "types/Editor";
import useEditorStore from "store/useEditorStore";

const elementComponents: Record<EditorBlockType, React.FC<{ data: any }>> = {
  text: Text,
  image: Image,
  groupImage: GroupImage,
  video: Video,
  file: File,
  place: Place,
  emoji: Emoji,
  line: Line,
  align: Align,
};

export default function EditorContent() {
  const { blokcs } = useEditorStore();
  return (
    <S.EditorContentContainer>
      <ContentEditable>
        {blokcs.map((block) => {
          const Component = elementComponents[block.type];
          return Component ? (
            <Component key={block.id} data={block.data} />
          ) : null;
        })}
      </ContentEditable>
    </S.EditorContentContainer>
  );
}
