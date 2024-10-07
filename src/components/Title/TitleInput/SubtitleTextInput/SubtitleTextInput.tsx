import React from "react";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

export default function SubtitleTextInput() {
  const setSubtitleText = useTitleStore((state) => state.setSubtitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);

  return (
    <ContentEditable
      placeholder="소제목을 입력하세요"
      fontSize={16}
      fontWeight={300}
      onChange={setSubtitleText}
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
