import React from "react";
import * as S from "./TitleInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import useTitleStore from "store/useTitleStore";
import { COMMON_THEME } from "styles/Theme";

export default function TitleInput() {
  const setTitleText = useTitleStore((state) => state.setTitleText);
  const setSubtitleText = useTitleStore((state) => state.setSubtitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const titleAlign = useTitleStore((state) => state.alignment);

  return (
    <S.TitleInputWrapper
      align={titleAlign}
      hasBackground={!!titleImage || !!titleCoverColor}
    >
      <ContentEditable
        placeholder="제목을 입력하세요"
        fontSize={45}
        onChange={setTitleText}
        fontColor={
          titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
        }
        placeholderColor={COMMON_THEME.gray_primary}
        cursorColor={
          titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
        }
      />
      <ContentEditable
        placeholder="소제목을 입력하세요"
        fontSize={16}
        onChange={setSubtitleText}
        fontColor={
          titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
        }
        placeholderColor={COMMON_THEME.gray_primary}
        cursorColor={
          titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
        }
      />
    </S.TitleInputWrapper>
  );
}
