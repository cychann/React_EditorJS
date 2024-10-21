import React, { useRef } from "react";
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

const elementComponents: Record<
  EditorBlockType,
  React.FC<{ data: any; id: any }>
> = {
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const { top, bottom, left, right } = container.getBoundingClientRect();
      const paddingTop = top + 0;
      const paddingBottom = bottom - 120;
      const paddingLeft = left + 0;
      const paddingRight = right;

      const clickedInsideContent =
        event.clientY >= paddingTop &&
        event.clientY <= paddingBottom &&
        event.clientX >= paddingLeft &&
        event.clientX <= paddingRight;

      if (!clickedInsideContent) {
        const editableElements = container.querySelectorAll(
          "[contenteditable='true']"
        );
        const lastEditable = editableElements[
          editableElements.length - 1
        ] as HTMLElement | null;

        if (lastEditable) {
          lastEditable.focus();

          const range = document.createRange();
          const selection = window.getSelection();

          range.selectNodeContents(lastEditable);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
  };

  return (
    <S.EditorContentContainer ref={containerRef} onClick={handleClick}>
      {blokcs.map((block) => {
        const Component = elementComponents[block.type];
        return Component ? (
          <S.EditorBlockContainer>
            <Component key={block.id} data={block.data} id={block.id} />
          </S.EditorBlockContainer>
        ) : null;
      })}
    </S.EditorContentContainer>
  );
}
