import React, { useState } from "react";
import * as S from "./TitleInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import useTitleImageStore from "store/useTitleImageStore";
import { commonTheme } from "styles/Theme";

export default function TitleInput() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const titleImage = useTitleImageStore((state) => state.titleCoverImage);

  return (
    <S.TitleInputWrapper>
      <ContentEditable
        placeholder="제목을 입력하세요"
        fontSize={45}
        onChange={setTitle}
        fontColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
        placeholderColor={commonTheme.gray_primary}
      />
      <ContentEditable
        placeholder="소제목을 입력하세요"
        fontSize={16}
        onChange={setSubtitle}
        fontColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
        placeholderColor={commonTheme.gray_primary}
      />
    </S.TitleInputWrapper>
  );
}
