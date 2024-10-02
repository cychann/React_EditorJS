import React, { useState } from "react";
import * as S from "./ContentEditable.style";

export default function ContentEditable({ placeholder = "", maxLength = 50 }) {
  const [text, setText] = useState("");

  const handleText = (e: React.ChangeEvent<HTMLDivElement>) => {
    const inputText = e.target.innerText || "";
    if (inputText.length <= maxLength) {
      setText(inputText);
    }
  };

  return (
    <S.EditableDiv
      contentEditable
      onInput={handleText}
      style={{ color: text ? "black" : "gray" }}
      placeholder={placeholder}
    />
  );
}
