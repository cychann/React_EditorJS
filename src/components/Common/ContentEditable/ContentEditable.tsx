import React from "react";
import * as S from "./ContentEditable.style";

interface ContentEditableProps {
  placeholder?: string;
  maxLength?: number;
  fontSize?: number;
  onChange?: (text: string) => void;
}

export default function ContentEditable({
  placeholder = "",
  maxLength = 50,
  fontSize = 16,
  onChange,
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
    />
  );
}
