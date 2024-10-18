import React from "react";
import * as S from "./EmojiIcon.style";
import useEditorStore from "store/useEditorStore";

export default function EmojiIcon() {
  const { toggleModal, setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("emoji");
    toggleModal();
  };
  return <S.EmojiIcon onClick={handleIconClick} />;
}
