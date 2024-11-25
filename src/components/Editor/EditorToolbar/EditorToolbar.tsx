import {
  AlignIcon,
  EmojiIcon,
  FileIcon,
  GroupImageIcon,
  ImageIcon,
  LineIcon,
  PlaceIcon,
  VideoIcon,
} from "@/components/Editor/EditorBlockIcon/index";

import {
  EditorToolModal,
  PlaceModal,
  EmojiModal,
  LineModal,
} from "@/components/Editor/EditorToolModal/index";

import FixedToolbar from "@/components/Common/FixedToolbar/FixedToolbar";
import useEditorStore from "@/store/useEditorStore";
import { RefObject, useEffect, useState } from "react";

interface Props {
  editorSectionRef: RefObject<HTMLDivElement>;
}

/**
 * 에디터의 툴바 컴포넌트
 * 블록을 추가할 수 있는 도구들을 제공
 */
export default function EditorToolbar({ editorSectionRef }: Props) {
  const [toolbarTop, setToolbarTop] = useState(487);

  const editor = useEditorStore((state) => state.editor);
  const currentBlockIndex = useEditorStore((state) => state.currentBlockIndex);
  const setCurrentBlockIndex = useEditorStore(
    (state) => state.setCurrentBlockIndex
  );

  /**
   * 현재 블록의 인덱스를 처리하는 함수
   * 블록이 없거나 선택된 블록이 있을 때 인덱스를 업데이트
   */
  const handleBlockIndex = () => {
    if (!editor) return;

    const blockIndex = editor.blocks.getCurrentBlockIndex();
    const blocksCount = editor.blocks.getBlocksCount();

    // 블록이 선택된 경우
    if (blockIndex > -1) {
      setCurrentBlockIndex(blockIndex);
      return;
    }

    // 블록이 하나만 있는 경우
    if (blocksCount === 1) {
      const firstBlock = editor.blocks.getBlockByIndex(0);
      const shouldUseFirstBlock =
        firstBlock?.name === "paragraph" && firstBlock.isEmpty;
      setCurrentBlockIndex(shouldUseFirstBlock ? 0 : 1);

      return;
    }

    // 그 외의 경우 마지막 블록의 인덱스 사용
    setCurrentBlockIndex(Math.max(0, blocksCount - 1));
  };

  /**
   * 새로운 블록을 추가하는 함수
   */
  const addBlock = (type: string, data: object) => {
    if (!editor) return;

    const currentBlock = editor.blocks.getBlockByIndex(currentBlockIndex);
    const isEmptyParagraph =
      currentBlock?.name === "paragraph" && currentBlock.isEmpty;

    if (isEmptyParagraph) {
      // 현재 블록이 빈 단락이면 교체
      editor.blocks.delete(currentBlockIndex);
      editor.blocks.insert(type, data, undefined, currentBlockIndex);
    } else {
      // 그 외의 경우 다음 위치에 삽입
      editor.blocks.insert(type, data, undefined, currentBlockIndex + 1);
    }
  };

  useEffect(() => {
    /**
     * 스크롤 이벤트 핸들러
     * 에디터 섹션의 위치에 따라 툴바의 위치를 동적으로 조정
     */
    const handleScroll = () => {
      if (editorSectionRef.current) {
        const rect = editorSectionRef.current.getBoundingClientRect();

        if (rect.top > 0) {
          setToolbarTop(rect.top + 40);
        }

        if (rect.top <= 0) {
          setToolbarTop(40);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <EditorToolModal top={toolbarTop}>
        <PlaceModal addBlock={addBlock} />
        <EmojiModal addBlock={addBlock} />
        <LineModal addBlock={addBlock} />
      </EditorToolModal>
      <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
        <ImageIcon handleBlockIndex={handleBlockIndex} addBlock={addBlock} />
        <GroupImageIcon
          handleBlockIndex={handleBlockIndex}
          addBlock={addBlock}
        />
        <VideoIcon handleBlockIndex={handleBlockIndex} addBlock={addBlock} />
        <FileIcon handleBlockIndex={handleBlockIndex} addBlock={addBlock} />
        <PlaceIcon handleBlockIndex={handleBlockIndex} />
        <EmojiIcon handleBlockIndex={handleBlockIndex} />
        <LineIcon handleBlockIndex={handleBlockIndex} />
        <AlignIcon />
      </FixedToolbar>
    </>
  );
}
