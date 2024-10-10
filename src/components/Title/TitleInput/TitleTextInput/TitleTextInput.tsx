import React, { useRef, useState } from "react";
import * as S from "./TitleTextInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";
import InlineTooltip from "components/Common/InlineTooltip/InlineTooltip";
import FontTooltip from "components/TextTooltip/FontTooltip/FontTooltip";

export default function TitleTextInput() {
  const setTitleText = useTitleStore((state) => state.setTitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const titleFont = useTitleStore((state) => state.titleFont);

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tooltipRef?.current?.contains(e.target as Node)) {
      return;
    }

    if (wrapperRef.current) {
      const selection = window.getSelection();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const mouseX = e.clientX;

      if (selection && selection.toString().length > 0) {
        setTooltipPosition({
          left: mouseX - wrapperRect.left - 60,
          top: 60,
        });

        setTooltipVisible(true);
      } else {
        setTooltipVisible(false);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tooltipRef?.current?.contains(e.target as Node)) {
      e.preventDefault();

      return;
    } else {
      setTooltipVisible(false);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTooltipVisible(false);
  };

  return (
    <S.TitleTextInputContainer
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      style={{ position: "relative" }}
    >
      <ContentEditable
        placeholder="제목을 입력하세요"
        fontSize={45}
        fontWeight={400}
        fontFamily={titleFont}
        lineHeight={53}
        onChange={setTitleText}
        fontColor={
          titleImage || titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.black_primary
        }
        placeholderColor={
          titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.gray_primary
        }
        cursorColor={
          titleImage || titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.black_primary
        }
      />
      <InlineTooltip
        ref={tooltipRef}
        visible={isTooltipVisible}
        position={tooltipPosition}
      >
        <FontTooltip />
      </InlineTooltip>
    </S.TitleTextInputContainer>
  );
}
