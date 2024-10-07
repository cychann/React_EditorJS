import React from "react";
import * as S from "./TitleSection.style";
import TitleToolbar from "../TitleToolbar/TitleToolbar";
import TitleInput from "../TitleInput/TitleInput";
import useTitleImageStore from "store/useTitleImageStore";
import TitleCoverColorSwiper from "../TitleTools/TitleCoverColor/TitleCoverColorSwiper/TitleCoverColorSwiper";

export default function TitleSection() {
  const titleImage = useTitleImageStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleImageStore((state) => state.titleCoverColor);
  const isTitleImageExpanded = useTitleImageStore((state) => state.isExpanded);

  return (
    <S.TitleSectionWrapper
      bgImage={titleImage}
      expanded={isTitleImageExpanded}
      bgColor={titleCoverColor}
    >
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper>메뉴바</S.TitleMenuWrapper>
        <S.TitleSaveWrapper>저장</S.TitleSaveWrapper>
      </S.TitleTopWrapper>
      <S.TitleBottomWrapper>
        <TitleToolbar />
        <TitleInput />
        {titleCoverColor && <TitleCoverColorSwiper />}
      </S.TitleBottomWrapper>
    </S.TitleSectionWrapper>
  );
}
