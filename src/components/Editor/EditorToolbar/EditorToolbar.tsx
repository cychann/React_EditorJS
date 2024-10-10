import React from "react";
import * as S from "./EditorToolbar.style";
import FixedToolbar from "components/Common/FixedToolbar/FixedToolbar";

interface Props {
  toolbarTop: number;
}

export default function EditorToolbar({ toolbarTop }: Props) {
  return (
    <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
      <S.ImageIcon />
      <S.GroupImageIcon />
      <S.VideoIcon />
      <S.LinkIcon />
      <S.LocationIcon />
      <S.EmojiIcon />
      <S.LineIcon />
      <S.AlignIcon />
    </FixedToolbar>
  );
}
