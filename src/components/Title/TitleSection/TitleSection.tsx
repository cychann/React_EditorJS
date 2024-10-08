import React from "react";
import * as S from "./TitleSection.style";
import TitleToolbar from "components/Title/TitleToolbar/TitleToolbar";
import TitleInputWrapper from "components/Title/TitleInput/TitleInputWrapper/TitleInputWrapper";
import useTitleStore from "store/useTitleStore";
import TitleCoverColorSwiper from "components/Title/TitleTools/TitleCoverColor/TitleCoverColorSwiper/TitleCoverColorSwiper";

export default function TitleSection() {
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const isTitleImageExpanded = useTitleStore((state) => state.isExpanded);

  return (
    <S.TitleSectionWrapper
      $bgImage={titleImage}
      $expanded={isTitleImageExpanded}
      $bgColor={titleCoverColor}
    >
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper>메뉴바</S.TitleMenuWrapper>
        <S.TitleSaveWrapper>저장</S.TitleSaveWrapper>
      </S.TitleTopWrapper>
      <S.TitleBottomWrapper>
        <TitleToolbar />
        <TitleInputWrapper />
        {titleCoverColor && <TitleCoverColorSwiper />}
      </S.TitleBottomWrapper>
    </S.TitleSectionWrapper>
  );
}
