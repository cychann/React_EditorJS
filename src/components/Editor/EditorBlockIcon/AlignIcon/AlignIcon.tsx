import React from "react";
import * as S from "./AlignIcon.style";
import useEditorStore from "store/useEditorStore";

export default function AlignIcon() {
  const { toggleAlign } = useEditorStore();

  return <S.AlignIcon onClick={toggleAlign} />;
}
