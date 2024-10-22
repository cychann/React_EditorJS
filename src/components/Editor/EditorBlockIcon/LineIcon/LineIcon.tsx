import React from "react";
import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LineIcon() {
  const { setActiveModal } = useEditorStore();

  const handleIconClick = () => {
    setActiveModal("line");
  };

  return <S.LineIcon onClick={handleIconClick} />;
}
