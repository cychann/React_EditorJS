import React from "react";
import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

interface LineIconProps {
  handleBlockIndex: () => void;
}

export default function LineIcon({ handleBlockIndex }) {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    setActiveModal("line");
  };

  return <S.LineIcon onClick={handleIconClick} />;
}
