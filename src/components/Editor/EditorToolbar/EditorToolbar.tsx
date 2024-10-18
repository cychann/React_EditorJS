import React from "react";
import FixedToolbar from "components/Common/FixedToolbar/FixedToolbar";
import ImageIcon from "../EditorBlockIcon/ImageIcon/ImageIcon";
import GroupImageIcon from "../EditorBlockIcon/GroupImageIcon/GroupImageIcon";
import VideoIcon from "../EditorBlockIcon/VideoIcon/VideoIcon";
import FileIcon from "../EditorBlockIcon/FileIcon/FileIcon";
import LocationIcon from "../EditorBlockIcon/LocationIcon/LocationIcon";
import EmojiIcon from "../EditorBlockIcon/EmojiIcon/EmojiIcon";
import LineIcon from "../EditorBlockIcon/LineIcon/LineIcon";
import AlignIcon from "../EditorBlockIcon/AlignIcon/AlignIcon";
import useEditorStore from "store/useEditorStore";
import EditorToolModal from "../EditorToolModal/EditorToolModal";
import PlaceModal from "../EditorToolModal/PlaceModal/PlaceModal";
import EmojiModal from "../EditorToolModal/EmojiModal/EmojiModal";

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
          {activeModal === "line" && <div>구분선 모달</div>}
        </EditorToolModal>
      )}
      <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
        <ImageIcon />
        <GroupImageIcon />
        <VideoIcon />
        <FileIcon />
        <LocationIcon />
        <EmojiIcon />
        <LineIcon />
        <AlignIcon />
      </FixedToolbar>
    </>
  );
}
