import React from "react";
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
  const { isModalOpen, activeModal } = useEditorStore();

  const addBlock = (type: string, data: object) => {
    if (editor.current) {
      const index = editor.current.blocks.getBlocksCount() + 1;
      editor.current.blocks.insert(type, data, undefined, index);
      editor.current.caret.setToLastBlock("start", 0);
    }
  };

  return (
    <>
      {isModalOpen && (
        <EditorToolModal top={toolbarTop}>
          {activeModal === "place" && <PlaceModal addBlock={addBlock} />}
          {activeModal === "emoji" && <EmojiModal addBlock={addBlock} />}
          {activeModal === "line" && <LineModal addBlock={addBlock} />}
        </EditorToolModal>
      )}
      <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
        <ImageIcon addBlock={addBlock} />
        <GroupImageIcon />
        <VideoIcon addBlock={addBlock} />
        <FileIcon addBlock={addBlock} />
        <PlaceIcon />
        <EmojiIcon />
        <LineIcon />
        <AlignIcon />
      </FixedToolbar>
    </>
  );
}
