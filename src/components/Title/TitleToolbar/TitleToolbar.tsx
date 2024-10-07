import React from "react";
import * as S from "./TitleToolbar.style";
import TitleCoverImageTool from "../TitleTools/TitleCoverImageTool/TitleCoverImageTool";
import useTitleStore from "store/useTitleStore";
import TitleCoverImageActiveTool from "../TitleTools/TitleCoverImageActiveTool/TitleCoverImageActiveTool";
import TitleCoverColorIcon from "../TitleTools/TitleCoverColor/TitleCoverColorIcon/TitleCoverColorIcon";
import TitleAlignTool from "../TitleTools/TitleAlignTool/TitleAlignTool";

export default function TitleToolbar() {
  const titleImage = useTitleStore((state) => state.titleCoverImage);

  return (
    <S.TitleToolbarWrapper>
      <TitleCoverImageTool />
      {!titleImage && <TitleCoverColorIcon />}
      <TitleAlignTool />
      {titleImage && <TitleCoverImageActiveTool />}
    </S.TitleToolbarWrapper>
  );
}
