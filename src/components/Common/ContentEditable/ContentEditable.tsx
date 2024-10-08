import React from "react";
import * as S from "./ContentEditable.style";
import { COMMON_THEME } from "styles/Theme";

interface ContentEditableProps {
  placeholder?: string;
  maxLength?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  fontColor?: string;
  lineHeight?: number;
  placeholderColor?: string;
  cursorColor?: string;
  onChange?: (text: string) => void;
}

export default function ContentEditable({
  placeholder = "",
  maxLength = 50,
  fontSize = 16,
  fontWeight = 400,
  fontFamily = "Noto Sans",
  lineHeight = 19,
  onChange,
  fontColor = COMMON_THEME.black_primary,
  placeholderColor = COMMON_THEME.gray_primary,
  cursorColor = COMMON_THEME.black_primary,
}: ContentEditableProps) {
  const handleText = (e: React.ChangeEvent<HTMLDivElement>) => {
    const inputText = e.target.innerText || "";
    if (inputText.length <= maxLength) {
      if (onChange) {
        onChange(inputText);
      }
    }
  };

  return (
    <S.EditableDiv
      contentEditable
      onInput={handleText}
      placeholder={placeholder}
      $fontFamily={fontFamily}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $fontColor={fontColor}
      $lineHeight={lineHeight}
      $placeholderColor={placeholderColor}
      $cursorColor={cursorColor}
    />
  );
}
