import React from "react";
import * as S from "./EmojiIcon.style";
import useEditorStore from "store/useEditorStore";

interface EmojiIconProps {
  handleBlockIndex: () => void;
}

export default function EmojiIcon({ handleBlockIndex }: EmojiIconProps) {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    setActiveModal("emoji");
  };
  return <S.EmojiIcon onClick={handleIconClick} />;
}
