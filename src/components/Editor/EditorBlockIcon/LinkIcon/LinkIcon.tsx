import React from "react";
import * as S from "./LinkIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LinkIcon() {
  const { addBlock } = useEditorStore();

  return <S.LinkIcon onClick={() => addBlock("link")} />;
}
