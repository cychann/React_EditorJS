import React from "react";
import * as S from "./NotificationBar.style";

interface Props {
  children: React.ReactNode;
  isVisible: boolean; // 알림 표시 여부
}

export default function NotificationBar({ children, isVisible }: Props) {
  return (
    <S.NotificationBarContainer isVisible={isVisible}>
      {children}
    </S.NotificationBarContainer>
  );
}
