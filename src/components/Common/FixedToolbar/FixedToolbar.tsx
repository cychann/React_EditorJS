import React from "react";
import * as S from "./FixedToolbar.style";

interface Props {
  position: { top: number; right: number };
  children?: React.ReactNode;
}

export default function FixedToolbar({ position, children }: Props) {
  return (
    <S.FixedToolbarContainer top={position.top} right={position.right}>
      {children}
    </S.FixedToolbarContainer>
  );
}
