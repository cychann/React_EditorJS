import React, { useState } from "react";
import * as S from "./LocationIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LocationIcon() {
  const { toggleModal, setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("place");
    toggleModal();
  };

  return <S.LocationIcon onClick={handleIconClick} />;
}
