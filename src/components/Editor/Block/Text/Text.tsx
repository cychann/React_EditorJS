import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import * as S from "./Text.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import InlineTooltip from "components/Common/InlineTooltip/InlineTooltip";
import BoldButton from "components/Editor/Block/Text/Tooltip/BoldButton/BoldButton";
import CancelLineButton from "components/Editor/Block/Text/Tooltip/CancelLineButton/CancelLineButton";
import UnderLineButton from "components/Editor/Block/Text/Tooltip/UnderLineButton/UnderLineButton";
import useEditorStore from "store/useEditorStore";
import { useContentEditable } from "hooks/useContentEditable";
import { setCursorToElement } from "utils/setCursorToElement";

type textData = {
  text: string;
};

interface Props {
  data: textData;
  id: string;
}

export default function Text({ data, id }: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [formattedTags, setFormattedTags] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { align, updateBlockData, addBlock, deleteBlock } = useEditorStore();
  const { content, setContent, onInput, $contentEditable } = useContentEditable(
    data.text || ""
  );

  const handleInput = (e: ChangeEvent<HTMLDivElement>) => {
    const currerntText = e.target.innerText;

    updateBlockData(id, { text: currerntText });
    // setContent(currerntText);
    onInput(e);

    if (!$contentEditable.current) return;
    focusContentEditableTextToEnd($contentEditable.current);
  };

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        const newBlockId = addBlock("text");
        console.log("newBlockId", newBlockId);
        setTimeout(() => {
          setFocusToBlock(newBlockId);
        }, 0);
      }
    }

    // if (e.key === "Backspace") {
    //   if (content === "") {
    //     deleteBlock(id);
    //     const lastBlock = document.querySelectorAll(
    //       "[contenteditable='true']"
    //     ) as NodeListOf<HTMLDivElement>;
    //     const lastEditableBlock = lastBlock[lastBlock.length - 1];

    //     setTimeout(() => {
    //       if (lastBlock.length > 0) {
    //         setCursorToElement(lastEditableBlock);
    //       }
    //     }, 0);
    //   }
    // }
  };

  const setFocusToBlock = (blockId: string) => {
    const blockElement = document.getElementById(blockId);

    if (blockElement) {
      const contentEditableElement = blockElement.querySelector(
        "[contenteditable='true']"
      ) as HTMLElement;

      if (contentEditableElement) {
        setCursorToElement(contentEditableElement);
      }
    }
  };

  const focusContentEditableTextToEnd = (element: HTMLElement) => {
    if (element.innerText.length === 0) {
      element.focus();

      return;
    }

    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(element);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  };

  return (
    <S.TextContainer
      id={id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {/* <ContentEditable
        initialText={content}
        textAlign={align}
        onChange={handleTextChange}
      /> */}

      <S.TextContentEditable
        ref={$contentEditable}
        contentEditable
        onInput={handleInput}
        $textAlign={align}
      />

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
