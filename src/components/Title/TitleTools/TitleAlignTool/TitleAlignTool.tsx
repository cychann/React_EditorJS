import React from "react";
import * as S from "./TitleAlignTool.style";
import useTitleStore from "store/useTitleStore";

export default function TitleAlignTool() {
  const titleCoverImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);

  const titleAlign = useTitleStore((state) => state.alignment);
  const setTitleAlign = useTitleStore((state) => state.setAlignment);

  const handleTitleAlign = (alignType: "left" | "center") => {
    setTitleAlign(alignType);
  };
  return (
    <>
      {titleAlign === "left" && (
        <S.AlignLeftIcon
          onClick={() => handleTitleAlign("center")}
          hasCoverBg={!!titleCoverImage || !!titleCoverColor}
        />
      )}
      {titleAlign === "center" && (
        <S.AlignCenterIcon
          onClick={() => handleTitleAlign("left")}
          hasCoverBg={!!titleCoverImage || !!titleCoverColor}
        />
      )}
    </>
  );
}
