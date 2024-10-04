import React, { useState } from "react";
import * as S from "./TitleInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";

export default function TitleInput() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  return (
    <S.TitleInputWrapper>
      <ContentEditable
        placeholder="제목을 입력하세요"
        fontSize={45}
        onChange={setTitle}
      />
      <ContentEditable
        placeholder="소제목을 입력하세요"
        fontSize={16}
        onChange={setSubtitle}
      />
    </S.TitleInputWrapper>
  );
}
