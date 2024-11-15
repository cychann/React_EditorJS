import React, { useEffect, useState } from "react";
import {
  AlignIcon,
  EmojiIcon,
  FileIcon,
  GroupImageIcon,
  ImageIcon,
  LineIcon,
  PlaceIcon,
  VideoIcon,
} from "components/Editor/EditorBlockIcon/index";

import {
  EditorToolModal,
  PlaceModal,
  EmojiModal,
  LineModal,
} from "components/Editor/EditorToolModal/index";

import FixedToolbar from "components/Common/FixedToolbar/FixedToolbar";
import useEditorStore from "store/useEditorStore";
import EditorJS from "@editorjs/editorjs";

interface Props {
  toolbarTop: number;
  editor: React.MutableRefObject<EditorJS | null | undefined>;
}

export default function EditorToolbar({ toolbarTop, editor }: Props) {
  const { activeModal, currentBlockIndex, setCurrentBlockIndex } =
    useEditorStore();

  const handleBlockIndex = () => {
    if (editor.current) {
      const blockIndex = editor.current.blocks.getCurrentBlockIndex();

      console.log("edtior current block", blockIndex);

      if (blockIndex === -1) {
        const index = editor.current.blocks.getBlocksCount();
        setCurrentBlockIndex(index);
      }

      if (blockIndex > -1) {
        setCurrentBlockIndex(blockIndex);
      }
    }
  };

  const addBlock = (type: string, data: object) => {
    if (editor.current) {
      const blockIndex = editor.current.blocks.getCurrentBlockIndex();

      console.log("edtior current block", blockIndex);

      if (blockIndex === -1) {
        const index = editor.current.blocks.getBlocksCount();
        setCurrentBlockIndex(index);
      }

      if (blockIndex > -1) {
        setCurrentBlockIndex(blockIndex);
      }

      editor.current.blocks.insert(
        type,
        data,
        undefined,
        currentBlockIndex + 1
      );
      editor.current.caret.setToLastBlock("start", 0);
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
        <AlignIcon editor={editor} />
      </FixedToolbar>
    </>
  );
}
