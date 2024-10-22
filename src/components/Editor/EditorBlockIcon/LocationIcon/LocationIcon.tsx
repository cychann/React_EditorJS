import React from "react";
import * as S from "./LocationIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LocationIcon() {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("place");
  };

  return <S.LocationIcon onClick={handleIconClick} />;
}
