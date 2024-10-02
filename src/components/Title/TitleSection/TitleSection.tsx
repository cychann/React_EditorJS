import React from "react";
import * as S from "./TitleSection.style";
import TitleToolbar from "../TitleToolbar/TitleToolbar";
import TitleInput from "../TitleInput/TitleInput";

export default function TitleSection() {
  return (
    <S.TitleSectionWrapper>
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
