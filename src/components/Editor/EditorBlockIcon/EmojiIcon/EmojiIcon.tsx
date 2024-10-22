import React from "react";
import * as S from "./EmojiIcon.style";
import useEditorStore from "store/useEditorStore";

export default function EmojiIcon() {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("emoji");
  };
  return <S.EmojiIcon onClick={handleIconClick} />;
}
