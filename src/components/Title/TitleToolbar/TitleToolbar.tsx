import React from "react";
import * as S from "./TitleToolbar.style";
import { ImTextColor } from "react-icons/im";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";
import TitleCoverImageTool from "../TitleTools/TitleCoverImageTool";

export default function TitleToolbar() {
  return (
    <S.TitleToolbarWrapper>
      <TitleCoverImageTool />
      <ImTextColor size={25} />
      <CiTextAlignLeft size={25} />
      {/* <CiTextAlignCenter /> */}
    </S.TitleToolbarWrapper>
  );
}
