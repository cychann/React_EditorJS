import React, { useEffect } from "react";
import * as S from "./BoldButton.style";
import { textFormatting } from "utils/textFormatting";

interface Props {
  isBold: boolean;
}

const BoldButton = ({ isBold }: Props) => {
  const { applyTag, saveSelection } = textFormatting();

  const handleClick = () => {
    saveSelection();
    applyTag("b");
  };

  return (
    <S.BoldButtonContainer onClick={handleClick} $isBold={isBold}>
      <S.BoldButton $isBold={isBold} />
    </S.BoldButtonContainer>
  );
};

export default BoldButton;
