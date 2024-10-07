import styled from "styled-components";
import React from "react";
import { FONT_WEIGHT } from "styles/Theme";

interface EditableDivProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  fontSize: number;
  fontWeight?: "regular" | "medium" | "semiBold" | "bold" | "extraBold";
  $placeholderColor?: string;
  $fontColor?: string;
  $cursorColor?: string;
}

export const EditableDiv = styled.div<EditableDivProps>`
  width: 100%;
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${({ fontWeight }) =>
    fontWeight ? FONT_WEIGHT[fontWeight] : FONT_WEIGHT.regular};
  border: none;
  outline: none;
  cursor: text;

  &:focus {
    caret-color: ${(props) => props.$cursorColor};
  }

  /* placeholder 스타일 */
  &:empty:before {
    content: attr(placeholder);
    color: ${(props) => props.$placeholderColor};
    display: inline-block;
  }

  /* 입력된 텍스트가 있을 때 색상 조정 */
  &[contenteditable="true"]:not(:empty) {
    color: ${(props) => props.$fontColor};
  }
`;
