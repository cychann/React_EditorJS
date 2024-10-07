import React from "react";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

export default function TitleTextInput() {
  const setTitleText = useTitleStore((state) => state.setTitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);

  return (
    <ContentEditable
      placeholder="제목을 입력하세요"
      fontSize={45}
      fontWeight={400}
      onChange={setTitleText}
      fontColor={
        titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
      }
      placeholderColor={COMMON_THEME.gray_primary}
      cursorColor={
        titleImage ? COMMON_THEME.white_primary : COMMON_THEME.black_primary
      }
    />
  );
}
