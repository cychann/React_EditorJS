import React from "react";
import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LineIcon() {
  const { toggleModal, setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("line");
    toggleModal();
  };

  return <S.LineIcon onClick={handleIconClick} />;
}
