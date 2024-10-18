import React from "react";
import * as S from "./EditorToolModal.style";

interface Props {
  top: number;
  children: React.ReactNode;
}

export default function EditorToolModal({ top, children }: Props) {
  return (
    <S.EditorToolModalContainer $top={top}>
      {children}
    </S.EditorToolModalContainer>
  );
}
