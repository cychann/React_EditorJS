import React from "react";
import * as S from "./TitleAlignTool.style";
import useTitleImageStore from "store/useTitleImageStore";

export default function TitleAlignTool() {
  const titleAlign = useTitleImageStore((state) => state.alignment);
  const setTitleAlign = useTitleImageStore((state) => state.setAlignment);

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
