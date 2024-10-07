import React from "react";
import * as S from "./TitleCoverColorIcon.style";
import useTitleImageStore from "store/useTitleImageStore";
import { titleCoverColors } from "styles/Theme";

export default function TitleCoverColorIcon() {
  const titleCoverColor = useTitleImageStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleImageStore(
    (state) => state.setTitleCoverColor
  );

  const toggleTitleCoverColor = () => {
    if (titleCoverColor) setTitleCoverColor(null);
    if (!titleCoverColor) setTitleCoverColor(titleCoverColors.red);
  };
  return <S.ColorIcon size={25} onClick={toggleTitleCoverColor} />;
}
