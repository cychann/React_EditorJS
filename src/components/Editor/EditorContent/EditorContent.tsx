import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import React from "react";
import Text from "components/Editor/Block/Text/Text";
import * as S from "./EditorContent.style";
import Image from "../Block/Image/Image";
import GroupImage from "../Block/GroupImage/GroupImage";
import Video from "../Block/Video/Video";
import Link from "../Block/Link/Link";
import Place from "../Block/Place/Place";
import Emoji from "../Block/Emoji/Emoji";
import Line from "../Block/Line/Line";
import Align from "../Block/Align/Align";
import { EditorBlockType, EditorElement } from "types/Editor";

const elementComponents: Record<EditorBlockType, React.FC> = {
  text: Text,
  image: Image,
  groupImage: GroupImage,
  video: Video,
  link: Link,
  place: Place,
  emoji: Emoji,
  line: Line,
  align: Align,
};

interface EditorContentProps {
  elements: EditorElement[];
}

export default function EditorContent({ elements }: EditorContentProps) {
  return (
    <S.EditorContentContainer>
      <ContentEditable>
        {elements.map((element) => {
          const Component = elementComponents[element.type];
          return Component ? <Component key={element.id} /> : null;
        })}
      </ContentEditable>
    </S.EditorContentContainer>
  );
}
