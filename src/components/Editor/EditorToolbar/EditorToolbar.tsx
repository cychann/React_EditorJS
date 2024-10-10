import React from "react";
import * as S from "./EditorToolbar.style";

interface Props {
  toolbarTop: number;
}

export default function EditorToolbar({ toolbarTop }: Props) {
  return (
    <S.EditorToolbarContainer style={{ top: `${toolbarTop}px` }}>
      <p>Tool</p>
      <p>Tool</p>
      <p>Tool</p>
      <p>Tool</p>
      <p>Tool</p>
    </S.EditorToolbarContainer>
  );
}
