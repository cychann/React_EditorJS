import React from "react";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

/**
 * 글의 소제목을 입력받는 컴포넌트
 * 배경 이미지나 색상에 따라 텍스트 색상이 자동으로 조정됨
 */
export default function SubtitleTextInput() {
  const setSubtitleText = useTitleStore((state) => state.setSubtitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);

  return (
    <ContentEditable
      placeholder="소제목을 입력하세요"
      maxLength={40}
      exceedMessage="소제목은 40자 이상 입력할 수 없습니다."
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
