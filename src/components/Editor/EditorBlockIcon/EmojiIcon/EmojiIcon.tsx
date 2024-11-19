import React from "react";
import * as S from "./EmojiIcon.style";
import useEditorStore from "store/useEditorStore";

interface EmojiIconProps {
  handleBlockIndex: () => void;
}

/**
 * 이모지 선택을 위한 아이콘 컴포넌트
 * 클릭 시 이모지 선택 모달을 열고 블록 인덱스를 업데이트
 */
export default function EmojiIcon({ handleBlockIndex }: EmojiIconProps) {
  const { toggleModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    toggleModal("emoji");
  };
  return (
    <S.EmojiIcon className="modal-active-icon" onClick={handleIconClick} />
  );
}
