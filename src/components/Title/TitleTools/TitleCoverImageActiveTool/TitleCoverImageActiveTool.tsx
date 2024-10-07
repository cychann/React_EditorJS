import React from "react";
import * as S from "./TitleCoverImageActive.style";

import useTitleImageStore from "store/useTitleImageStore";

export default function TitleCoverImageActiveTool() {
  const setTitleImage = useTitleImageStore((state) => state.setTitleCoverImage);
  const setImageExpanded = useTitleImageStore((state) => state.setIsExpanded);
  const isTitleImageExpanded = useTitleImageStore((state) => state.isExpanded);

  const deleteTitleImage = () => {
    setTitleImage(null);
  };

  const expandImage = () => {
    setImageExpanded(!isTitleImageExpanded);
  };

  return (
    <S.IconWrapper>
      <S.ExpandIcon size={25} onClick={expandImage} />
      <S.TrashIcon size={25} onClick={deleteTitleImage} />
    </S.IconWrapper>
  );
}
