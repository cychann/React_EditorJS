import React from "react";
import * as S from "./TitleCoverImageActive.style";
import useTitleStore from "store/useTitleStore";

/**
 * 커버 이미지가 활성화되었을 때 표시되는 도구 컴포넌트
 * 이미지 확장/축소 및 삭제 기능 제공
 */
export default function TitleCoverImageActiveTool() {
  const setTitleImage = useTitleStore((state) => state.setTitleCoverImage);
  const setImageExpanded = useTitleStore((state) => state.setIsExpanded);
  const isTitleImageExpanded = useTitleStore((state) => state.isExpanded);

  const deleteTitleImage = () => {
    setTitleImage(null);
    setImageExpanded(false);
  };

  const expandImage = () => {
    setImageExpanded(!isTitleImageExpanded);
  };

  return (
    <S.IconWrapper>
      <S.ExpandIcon $expanded={isTitleImageExpanded} onClick={expandImage} />
      <S.TrashIcon onClick={deleteTitleImage} />
    </S.IconWrapper>
  );
}
