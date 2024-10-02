import React from "react";
import * as S from "./TitleInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";

export default function TitleInput() {
  return (
    <S.TitleInputWrapper>
      <ContentEditable placeholder="제목을 입력하세요" />
      <ContentEditable placeholder="소제목을 입력하세요" />
      {/* <S.TitleInput contentEditable />
      <S.SubTitleInput contentEditable /> */}
    </S.TitleInputWrapper>
  );
}
