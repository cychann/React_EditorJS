import React from "react";
import * as S from "./PlaceIcon.style";
import useEditorStore from "store/useEditorStore";

interface PlaceIconProps {
  handleBlockIndex: () => void;
}

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
