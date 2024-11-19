import React from "react";
import * as S from "./TitleCoverColorIcon.style";
import useTitleStore from "store/useTitleStore";
import { TITLE_COVER_COLORS } from "styles/Theme";

/**
 * 제목 섹션의 커버 컬러 토글 아이콘 컴포넌트
 * 커버 컬러의 활성화/비활성화를 담당
 */
export default function TitleCoverColorIcon() {
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleStore((state) => state.setTitleCoverColor);
  const setTitleColor = useTitleStore((state) => state.setTitleColor);

  /**
   * 커버 컬러 토글 핸들러
   * - 커버 컬러가 있으면 제거
   * - 커버 컬러가 없으면 기본 컬러(빨간색)로 설정
   * - 커버 컬러 변경 시 제목 텍스트 컬러는 초기화
   */
  const toggleTitleCoverColor = () => {
    if (titleCoverColor) setTitleCoverColor(null);
    if (!titleCoverColor) setTitleCoverColor(TITLE_COVER_COLORS.red);

    setTitleColor(null);
  };
  return (
    <S.ImageColorIcon
      onClick={toggleTitleCoverColor}
      $hasCoverBg={!!titleCoverColor}
    />
  );
}
