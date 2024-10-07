import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./TitleCoverColorSwiper.style";
import useTitleImageStore from "store/useTitleImageStore";
import { titleCoverColors } from "styles/Theme";

const TitleCoverColorSwiper = () => {
  const currentColor = useTitleImageStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleImageStore(
    (state) => state.setTitleCoverColor
  );

  const colorKeys = Object.keys(titleCoverColors);
  const currentIndex = colorKeys.indexOf(
    Object.keys(titleCoverColors).find(
      (key) => titleCoverColors[key] === currentColor
    ) || ""
  );

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % colorKeys.length;
    setTitleCoverColor(titleCoverColors[colorKeys[nextIndex]]);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + colorKeys.length) % colorKeys.length;
    setTitleCoverColor(titleCoverColors[colorKeys[prevIndex]]);
  };

  return (
    <S.SwiperContainer>
      <S.PrevButton onClick={prevSlide} />
      <S.ColorSelectContainer>
        {colorKeys.map((colorKey) => (
          <S.ColorCircle
            key={colorKey}
            isSelected={titleCoverColors[colorKey] === currentColor}
            onClick={() => setTitleCoverColor(titleCoverColors[colorKey])}
            color={titleCoverColors[colorKey]}
          />
        ))}
      </S.ColorSelectContainer>
      <S.NextButton onClick={nextSlide} />
    </S.SwiperContainer>
  );
};

export default TitleCoverColorSwiper;
