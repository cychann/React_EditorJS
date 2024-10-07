import React from "react";
import * as S from "./TitleToolbar.style";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import TitleCoverImageTool from "../TitleTools/TitleCoverImageTool/TitleCoverImageTool";
import useTitleImageStore from "store/useTitleImageStore";
import TitleCoverImageActiveTool from "../TitleTools/TitleCoverImageActiveTool/TitleCoverImageActiveTool";
import TitleCoverColorIcon from "../TitleTools/TitleCoverColor/TitleCoverColorIcon/TitleCoverColorIcon";

export default function TitleToolbar() {
  const titleImage = useTitleImageStore((state) => state.titleCoverImage);

  return (
    <S.TitleToolbarWrapper>
      <TitleCoverImageTool />
      {!titleImage && <TitleCoverColorIcon />}
      <CiTextAlignLeft size={25} />
      {/* <CiTextAlignCenter /> */}
      {titleImage && <TitleCoverImageActiveTool />}
    </S.TitleToolbarWrapper>
  );
}
