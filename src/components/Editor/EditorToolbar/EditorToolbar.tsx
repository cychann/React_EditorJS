import React from "react";
import * as S from "./EditorToolbar.style";
import FixedToolbar from "components/Common/FixedToolbar/FixedToolbar";
import { EditorBlockType } from "types/Editor";

interface Props {
  toolbarTop: number;
  onAddElement: (type: EditorBlockType) => void;
}

export default function EditorToolbar({ toolbarTop, onAddElement }: Props) {
  return (
    <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
      <S.ImageIcon onClick={() => onAddElement("image")} />
      <S.GroupImageIcon onClick={() => onAddElement("groupImage")} />
      <S.VideoIcon onClick={() => onAddElement("video")} />
      <S.LinkIcon onClick={() => onAddElement("link")} />
      <S.LocationIcon onClick={() => onAddElement("place")} />
      <S.EmojiIcon onClick={() => onAddElement("emoji")} />
      <S.LineIcon onClick={() => onAddElement("line")} />
      <S.AlignIcon onClick={() => onAddElement("align")} />
    </FixedToolbar>
  );
}
