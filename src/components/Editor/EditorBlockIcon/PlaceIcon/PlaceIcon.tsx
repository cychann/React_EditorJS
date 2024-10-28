import React from "react";
import * as S from "./PlaceIcon.style";
import useEditorStore from "store/useEditorStore";

export default function PlaceIcon() {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("place");
  };

  return <S.PlaceIcon onClick={handleIconClick} />;
}
