import React from "react";
import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LineIcon() {
  const { addBlock } = useEditorStore();

  return <S.LineIcon onClick={() => addBlock("line")} />;
}
