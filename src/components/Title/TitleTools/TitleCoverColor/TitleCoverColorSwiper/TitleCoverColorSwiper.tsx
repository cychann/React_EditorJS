import React from "react";
import * as S from "./TitleCoverColorSwiper.style";
import useTitleStore from "store/useTitleStore";
import { TITLE_COVER_COLORS } from "styles/Theme";

const TitleCoverColorSwiper = () => {
  const currentColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleStore((state) => state.setTitleCoverColor);

  const colorKeys = Object.keys(TITLE_COVER_COLORS);
  const currentIndex = colorKeys.indexOf(
    Object.keys(TITLE_COVER_COLORS).find(
      (key) => TITLE_COVER_COLORS[key] === currentColor
    ) || ""
  );

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % colorKeys.length;
    setTitleCoverColor(TITLE_COVER_COLORS[colorKeys[nextIndex]]);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + colorKeys.length) % colorKeys.length;
    setTitleCoverColor(TITLE_COVER_COLORS[colorKeys[prevIndex]]);
  };

  return (
    <S.SwiperContainer>
      <S.PrevButton onClick={prevSlide} />
      <S.ColorSelectContainer>
        {colorKeys.map((colorKey) => (
          <S.ColorCircle
            key={colorKey}
            $isSelected={TITLE_COVER_COLORS[colorKey] === currentColor}
            onClick={() => setTitleCoverColor(TITLE_COVER_COLORS[colorKey])}
            color={TITLE_COVER_COLORS[colorKey]}
          />
        ))}
      </S.ColorSelectContainer>
      <S.NextButton onClick={nextSlide} />
    </S.SwiperContainer>
  );
};

export default TitleCoverColorSwiper;
