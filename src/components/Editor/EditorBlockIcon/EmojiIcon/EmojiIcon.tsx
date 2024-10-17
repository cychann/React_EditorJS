import React from "react";
import * as S from "./EmojiIcon.style";
import useEditorStore from "store/useEditorStore";

export default function EmojiIcon() {
  const { addBlock } = useEditorStore();

  return <S.EmojiIcon onClick={() => addBlock("emoji")} />;
}
