import React from "react";
import * as S from "./UnderLineButton.style";
import { textFormatting } from "utils/textFormatting";

interface Props {
  isUnderLine: boolean;
}

const UnderLineButton = ({ isUnderLine }: Props) => {
  const { applyTag, saveSelection } = textFormatting();

  const handleClick = () => {
    saveSelection();
    applyTag("u");
  };
  return (
    <S.UnderLineButtonConatiner
      onClick={handleClick}
      $isUnderLine={isUnderLine}
    >
      <S.UnderLineButton $isUnderLine={isUnderLine} />
    </S.UnderLineButtonConatiner>
  );
};

export default UnderLineButton;
