import React from "react";
import * as S from "./TitleSection.style";
import TitleToolbar from "../TitleToolbar/TitleToolbar";
import TitleInput from "../TitleInput/TitleInput";
import useTitleImageStore from "store/useTitleImageStore";

export default function TitleSection() {
  const titleImage = useTitleImageStore((state) => state.titleCoverImage);

  return (
    <S.TitleSectionWrapper bgImage={titleImage}>
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper>메뉴바</S.TitleMenuWrapper>
        <S.TitleSaveWrapper>저장</S.TitleSaveWrapper>
      </S.TitleTopWrapper>
      <S.TitleBottomWrapper>
        <TitleToolbar />
        <TitleInput />
      </S.TitleBottomWrapper>
    </S.TitleSectionWrapper>
  );
}
