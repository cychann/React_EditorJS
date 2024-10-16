import React from "react";
import * as S from "./GroupImageIcon.style";
import useEditorStore from "store/useEditorStore";

export default function GroupImageIcon() {
  const { addBlock } = useEditorStore();

  return <S.GroupImageIcon onClick={() => addBlock("groupImage")} />;
}
