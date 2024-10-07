import React, { useState } from "react";
import * as S from "./TitleInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import useTitleStore from "store/useTitleStore";
import { commonTheme } from "styles/Theme";

export default function TitleInput() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleAlign = useTitleStore((state) => state.alignment);

  return (
    <S.TitleInputWrapper align={titleAlign}>
      <ContentEditable
        placeholder="제목을 입력하세요"
        fontSize={45}
        onChange={setTitle}
        fontColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
        placeholderColor={commonTheme.gray_primary}
        cursorColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
      />
      <ContentEditable
        placeholder="소제목을 입력하세요"
        fontSize={16}
        onChange={setSubtitle}
        fontColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
        placeholderColor={commonTheme.gray_primary}
        cursorColor={
          titleImage ? commonTheme.white_primary : commonTheme.black_primary
        }
      />
    </S.TitleInputWrapper>
  );
}
