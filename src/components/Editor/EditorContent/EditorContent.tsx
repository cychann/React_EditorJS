import React, { useRef } from "react";
import * as S from "./EditorContent.style";

import {
  Align,
  Emoji,
  File,
  GroupImage,
  Image,
  Line,
  Place,
  Text,
  Video,
} from "components/Editor/Block/index";
import { EditorBlockType } from "types/Editor";
import useEditorStore from "store/useEditorStore";

const elementComponents: Record<
  EditorBlockType,
  React.FC<{ data: any; id: any; active: boolean }>
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
  const { blokcs, activeBlockId, setActiveBlock, deleteBlock } =
    useEditorStore();
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

  const handleBlockClick = (id: string) => {
    setActiveBlock(id);
  };

  const handleBlockKeydown = (
    e: React.KeyboardEvent,
    id: string,
    type: EditorBlockType
  ) => {
    if (e.key === "Backspace" && type !== "text") {
      if (activeBlockId === id) {
        console.log("will be deleted", id);
        deleteBlock(id);
      }
    }
  };

  return (
    <S.EditorContentContainer ref={containerRef} onClick={handleClick}>
      {blokcs.map((block) => {
        const Component = elementComponents[block.type];
        return Component ? (
          <S.EditorBlockContainer
            tabIndex={0}
            onKeyDown={(e) => handleBlockKeydown(e, block.id, block.type)}
            onClick={() => handleBlockClick(block.id)}
          >
            <Component
              key={block.id}
              data={block.data}
              id={block.id}
              active={block.id === activeBlockId}
            />
          </S.EditorBlockContainer>
        ) : null;
      })}
    </S.EditorContentContainer>
  );
}
