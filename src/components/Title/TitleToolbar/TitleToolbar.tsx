import React from "react";
import * as S from "./TitleToolbar.style";
import { PiImageThin } from "react-icons/pi";
import { ImTextColor } from "react-icons/im";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";

export default function TitleToolbar() {
  return (
    <S.TitleToolbarWrapper>
      <PiImageThin size={25} />
      <ImTextColor size={25} />
      <CiTextAlignLeft size={25} />
      {/* <CiTextAlignCenter /> */}
    </S.TitleToolbarWrapper>
  );
}
