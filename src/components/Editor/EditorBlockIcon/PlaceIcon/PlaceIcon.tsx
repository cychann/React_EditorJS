import React from "react";
import * as S from "./PlaceIcon.style";
import useEditorStore from "store/useEditorStore";

interface PlaceIconProps {
  handleBlockIndex: () => void;
}

/**
 * 장소 선택을 위한 아이콘 컴포넌트
 * 클릭 시 장소 선택 모달을 열고 블록 인덱스를 업데이트
 */
export default function PlaceIcon({ handleBlockIndex }) {
  const { activeModal, toggleModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    toggleModal("place");
  };

  return (
    <S.PlaceIcon className="modal-active-icon" onClick={handleIconClick} />
  );
}
