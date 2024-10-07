import React from "react";
import * as S from "./TitleToolbar.style";
import { ImTextColor } from "react-icons/im";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import TitleCoverImageTool from "../TitleTools/TitleCoverImageTool/TitleCoverImageTool";
import useTitleImageStore from "store/useTitleImageStore";
import TitleCoverImageActiveTool from "../TitleTools/TitleCoverImageActiveTool/TitleCoverImageActiveTool";

export default function TitleToolbar() {
  const titleImage = useTitleImageStore((state) => state.titleCoverImage);

  return (
    <S.TitleToolbarWrapper>
      <TitleCoverImageTool />
      {!titleImage && <ImTextColor size={25} />}
      <CiTextAlignLeft size={25} />
      {/* <CiTextAlignCenter /> */}
      {titleImage && <TitleCoverImageActiveTool />}
    </S.TitleToolbarWrapper>
  );
}
