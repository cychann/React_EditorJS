import React, { useRef, useState } from "react";
import * as S from "./Text.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import InlineTooltip from "components/Common/InlineTooltip/InlineTooltip";
import { useTextFormatting } from "hooks/useTextFormatting";
import BoldButton from "./Tooltip/BoldButton/BoldButton";

export default function Text() {
  const { saveSelection, applyTag } = useTextFormatting(); // 커스텀 훅 사용
  const [tooltipVisible, setTooltipVisible] = useState(false);
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
      const mouseY = e.clientY;

      if (selection && selection.toString().length > 0) {
        // 커스텀 훅에서 텍스트의 Range 저장
        saveSelection();

        setTooltipPosition({
          left: mouseX - wrapperRect.left - 60,
          top: mouseY - wrapperRect.top + 20,
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
    <S.TextContainer
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
    >
      <ContentEditable />
      <InlineTooltip
        ref={tooltipRef}
        visible={tooltipVisible}
        position={tooltipPosition}
      >
        <button onClick={() => applyTag("b")}>Bold</button>
        <button onClick={() => applyTag("u")}>Underline</button>
        <button onClick={() => applyTag("s")}>CancelLine</button>
      </InlineTooltip>
    </S.TextContainer>
  );
}
