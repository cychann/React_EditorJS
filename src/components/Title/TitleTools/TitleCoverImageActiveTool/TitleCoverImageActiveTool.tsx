import React from "react";
import * as S from "./TitleCoverImageActive.style";

import useTitleStore from "store/useTitleStore";

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
      <S.ExpandIcon expanded={isTitleImageExpanded} onClick={expandImage} />
      <S.TrashIcon onClick={deleteTitleImage} />
    </S.IconWrapper>
  );
}
