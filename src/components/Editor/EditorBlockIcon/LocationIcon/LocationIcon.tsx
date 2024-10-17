import React from "react";
import * as S from "./LocationIcon.style";
import useEditorStore from "store/useEditorStore";

export default function LocationIcon() {
  const { addBlock } = useEditorStore();

  return <S.LocationIcon onClick={() => addBlock("place")} />;
}
