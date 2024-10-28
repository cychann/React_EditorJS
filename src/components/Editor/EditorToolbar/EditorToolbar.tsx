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

interface Props {
  toolbarTop: number;
}

export default function EditorToolbar({ toolbarTop }: Props) {
  const { isModalOpen, activeModal } = useEditorStore();

  return (
    <>
      {isModalOpen && (
        <EditorToolModal top={toolbarTop}>
          {activeModal === "place" && <PlaceModal />}
          {activeModal === "emoji" && <EmojiModal />}
          {activeModal === "line" && <LineModal />}
        </EditorToolModal>
      )}
      <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
        <ImageIcon />
        <GroupImageIcon />
        <VideoIcon />
        <FileIcon />
        <PlaceIcon />
        <EmojiIcon />
        <LineIcon />
        <AlignIcon />
      </FixedToolbar>
    </>
  );
}
