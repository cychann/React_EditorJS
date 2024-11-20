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

interface Props {
  toolbarTop: number;
}

/**
 * 에디터의 툴바 컴포넌트
 * 블록을 추가할 수 있는 도구들을 제공
 */
export default function EditorToolbar({ toolbarTop }: Props) {
  const { editor, activeModal, currentBlockIndex, setCurrentBlockIndex } =
    useEditorStore();

  /**
   * 현재 블록의 인덱스를 처리하는 함수
   * 블록이 없거나 선택된 블록이 있을 때 인덱스를 업데이트
   */
  const handleBlockIndex = () => {
    if (editor) {
      const blockIndex = editor.blocks.getCurrentBlockIndex();

      if (blockIndex === -1) {
        const index = editor.blocks.getBlocksCount();
        setCurrentBlockIndex(index);
      }

      if (blockIndex > -1) {
        setCurrentBlockIndex(blockIndex);
      }
    }
  };

  /**
   * 새로운 블록을 추가하는 함수
   * 현재 블록 다음 위치에 새 블록을 삽입하고 캐럿을 이동
   */
  const addBlock = (type: string, data: object) => {
    if (editor) {
      const blockIndex = editor.blocks.getCurrentBlockIndex();

      if (blockIndex === -1) {
        const index = editor.blocks.getBlocksCount();
        setCurrentBlockIndex(index);
      }

      if (blockIndex > -1) {
        setCurrentBlockIndex(blockIndex);
      }

      editor.blocks.insert(type, data, undefined, currentBlockIndex + 1);
      editor.caret.setToLastBlock("start", 0);
    }
  };

  return (
    <>
      {activeModal && (
        <EditorToolModal top={toolbarTop}>
          {activeModal === "place" && <PlaceModal addBlock={addBlock} />}
          {activeModal === "emoji" && <EmojiModal addBlock={addBlock} />}
          {activeModal === "line" && <LineModal addBlock={addBlock} />}
        </EditorToolModal>
      )}
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
