import React from "react";
import * as S from "./TitleCoverColorIcon.style";
import useTitleStore from "store/useTitleStore";
import { titleCoverColors } from "styles/Theme";

export default function TitleCoverColorIcon() {
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleStore((state) => state.setTitleCoverColor);

  const toggleTitleCoverColor = () => {
    if (titleCoverColor) setTitleCoverColor(null);
    if (!titleCoverColor) setTitleCoverColor(titleCoverColors.red);
  };
  return <S.ColorIcon size={25} onClick={toggleTitleCoverColor} />;
}
