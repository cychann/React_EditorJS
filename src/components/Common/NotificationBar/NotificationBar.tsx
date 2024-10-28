import React from "react";
import * as S from "./NotificationBar.style";

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
}

export default function NotificationBar({ children, isVisible }: Props) {
  return (
    <S.NotificationBarContainer $isVisible={isVisible}>
      {children}
    </S.NotificationBarContainer>
  );
}
