import React, { useRef, useState } from "react";
import * as S from "./Text.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import InlineTooltip from "components/Common/InlineTooltip/InlineTooltip";
import BoldButton from "components/Editor/Block/Text/Tooltip/BoldButton/BoldButton";
import CancelLineButton from "components/Editor/Block/Text/Tooltip/CancelLineButton/CancelLineButton";
import UnderLineButton from "components/Editor/Block/Text/Tooltip/UnderLineButton/UnderLineButton";
import useEditorStore from "store/useEditorStore";

export default function Text() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [formattedTags, setFormattedTags] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { align } = useEditorStore();

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
        setTooltipPosition({
          left: mouseX - wrapperRect.left - 60,
          top: mouseY - wrapperRect.top + 20,
        });

        const selectionRange = selection.getRangeAt(0);
        if (selectionRange) {
          let currentElement =
            selectionRange.commonAncestorContainer.parentElement;

          const tags: string[] = [];

          while (currentElement) {
            const tagName = currentElement.tagName.toLowerCase();

            if (currentElement.getAttribute("contenteditable") === "true") {
              break;
            }

            tags.push(tagName);
            currentElement = currentElement.parentElement;
          }

          setFormattedTags(tags);
        }

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

  const checkFormattedTag = (tag: string) => {
    return formattedTags.includes(tag);
  };

  return (
    <S.TextContainer
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
    >
      <ContentEditable textAlign={align} />
      <InlineTooltip
        ref={tooltipRef}
        visible={tooltipVisible}
        position={tooltipPosition}
      >
        <BoldButton isBold={checkFormattedTag("b")} />
        <UnderLineButton isUnderLine={checkFormattedTag("u")} />
        <CancelLineButton isCancleLine={checkFormattedTag("s")} />
      </InlineTooltip>
    </S.TextContainer>
  );
}
