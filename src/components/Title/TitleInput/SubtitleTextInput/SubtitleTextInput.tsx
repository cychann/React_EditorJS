import React from "react";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

export default function SubtitleTextInput() {
  const setSubtitleText = useTitleStore((state) => state.setSubtitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);

  return (
    <ContentEditable
      placeholder="소제목을 입력하세요"
      fontSize={16}
      fontWeight={300}
      onChange={setSubtitleText}
      fontColor={
        titleImage || titleCoverColor
          ? COMMON_THEME.white_primary
          : COMMON_THEME.black_primary
      }
      placeholderColor={
        titleCoverColor ? COMMON_THEME.white_primary : COMMON_THEME.gray_primary
      }
      cursorColor={
        titleImage || titleCoverColor
          ? COMMON_THEME.white_primary
          : COMMON_THEME.black_primary
      }
    />
  );
}
