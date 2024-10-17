import React from "react";
import * as S from "./AlignIcon.style";
import useEditorStore from "store/useEditorStore";

export default function AlignIcon() {
  const { addBlock } = useEditorStore();

  return <S.AlignIcon onClick={() => addBlock("align")} />;
}
