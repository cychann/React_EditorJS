import React from "react";
import * as S from "./TitleCoverImageActive.style";

import useTitleImageStore from "store/useTitleImageStore";

export default function TitleCoverImageActiveTool() {
  const setTitleImage = useTitleImageStore((state) => state.setTitleCoverImage);

  const deleteTitleImage = () => {
    setTitleImage(null);
  };
  return (
    <S.IconWrapper>
      <S.ExpandIcon size={25} />
      <S.TrashIcon size={25} onClick={deleteTitleImage} />
    </S.IconWrapper>
  );
}
