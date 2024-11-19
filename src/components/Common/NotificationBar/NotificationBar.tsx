import React from "react";
import * as S from "./NotificationBar.style";

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
}

/**
 * 알림 메시지를 표시하는 공통 컴포넌트
 *
 * @example
 * ```tsx
 * <NotificationBar isVisible={showAlert}>
 *   최대 글자수를 초과했습니다.
 * </NotificationBar>
 * ```
 */
export default function NotificationBar({ children, isVisible }: Props) {
  return (
    <S.NotificationBarContainer $isVisible={isVisible}>
      {children}
    </S.NotificationBarContainer>
  );
}
