import React from "react";
import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

interface LineIconProps {
  handleBlockIndex: () => void;
}

export default function LineIcon({ handleBlockIndex }) {
  const { toggleModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    toggleModal("line");
  };

  return <S.LineIcon onClick={handleIconClick} />;
}
