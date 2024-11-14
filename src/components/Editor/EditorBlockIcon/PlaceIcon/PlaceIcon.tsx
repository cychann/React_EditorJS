import React from "react";
import * as S from "./PlaceIcon.style";
import useEditorStore from "store/useEditorStore";

interface PlaceIconProps {
  handleBlockIndex: () => void;
}

export default function PlaceIcon({ handleBlockIndex }) {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    setActiveModal("place");
  };

  return <S.PlaceIcon onClick={handleIconClick} />;
}
