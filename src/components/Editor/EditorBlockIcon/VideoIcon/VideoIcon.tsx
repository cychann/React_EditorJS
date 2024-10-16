import React from "react";
import * as S from "./VideoIcon.style";
import useEditorStore from "store/useEditorStore";

export default function VideoIcon() {
  const { addBlock } = useEditorStore();
  return <S.VideoIcon onClick={() => addBlock("video")} />;
}
