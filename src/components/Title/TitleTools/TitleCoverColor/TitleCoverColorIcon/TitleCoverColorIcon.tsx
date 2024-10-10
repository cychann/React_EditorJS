import React from "react";
import * as S from "./TitleCoverColorIcon.style";
import useTitleStore from "store/useTitleStore";
import { TITLE_COVER_COLORS } from "styles/Theme";

export default function TitleCoverColorIcon() {
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleStore((state) => state.setTitleCoverColor);
  const setTitleColor = useTitleStore((state) => state.setTitleColor);

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
