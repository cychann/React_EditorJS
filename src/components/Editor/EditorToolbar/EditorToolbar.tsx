import React from "react";
import * as S from "./EditorToolbar.style";
import FixedToolbar from "components/Common/FixedToolbar/FixedToolbar";

interface Props {
  toolbarTop: number;
}

export default function EditorToolbar({ toolbarTop }: Props) {
  return (
    <FixedToolbar position={{ top: toolbarTop, right: 15 }}>
      <p>Tool1</p>
      <p>Tool2</p>
      <p>Tool3</p>
    </FixedToolbar>
  );
}
