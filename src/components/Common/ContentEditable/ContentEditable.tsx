import React from "react";
import * as S from "./ContentEditable.style";
import { commonTheme } from "styles/Theme";

interface ContentEditableProps {
  placeholder?: string;
  maxLength?: number;
  fontSize?: number;
  fontColor?: string;
  placeholderColor?: string;
  cursorColor?: string;
  onChange?: (text: string) => void;
}

export default function ContentEditable({
  placeholder = "",
  maxLength = 50,
  fontSize = 16,
  onChange,
  fontColor = commonTheme.black_primary,
  placeholderColor = commonTheme.gray_primary,
  cursorColor = commonTheme.black_primary,
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
      fontSize={fontSize}
      fontColor={fontColor}
      placeholderColor={placeholderColor}
      cursorColor={cursorColor}
    />
  );
}
