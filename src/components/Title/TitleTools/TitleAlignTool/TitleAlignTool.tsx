import React from "react";
import * as S from "./TitleAlignTool.style";
import useTitleStore from "store/useTitleStore";

export default function TitleAlignTool() {
  const titleAlign = useTitleStore((state) => state.alignment);
  const setTitleAlign = useTitleStore((state) => state.setAlignment);

  const handleTitleAlign = (alignType: "left" | "center") => {
    setTitleAlign(alignType);
  };
  return (
    <>
      {titleAlign === "left" && (
        <S.AlignLeftIcon size={25} onClick={() => handleTitleAlign("center")} />
      )}
      {titleAlign === "center" && (
        <S.AlignCenterIcon size={25} onClick={() => handleTitleAlign("left")} />
      )}
    </>
  );
}
