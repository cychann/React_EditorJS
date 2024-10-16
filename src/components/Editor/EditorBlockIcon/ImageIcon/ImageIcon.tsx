import React from "react";
import * as S from "./ImageIcon.style";
import useEditorStore from "store/useEditorStore";

export default function ImageIcon() {
  const { addBlock } = useEditorStore();
  return <S.ImageIcon onClick={() => addBlock("image")} />;
}
