import React from "react";
import * as S from "./CancelLineButton.style";
import { textFormatting } from "utils/textFormatting";

interface Props {
  isCancleLine: boolean;
}

const CancelLineButton = ({ isCancleLine }: Props) => {
  const { applyTag, saveSelection } = textFormatting();

  const handleClick = () => {
    saveSelection();
    applyTag("s");
  };

  return (
    <S.UnderLineButtonConatiner
      onClick={handleClick}
      $isCancleLine={isCancleLine}
    >
      <S.UnderLineButton $isCancleLine={isCancleLine} />
    </S.UnderLineButtonConatiner>
  );
};

export default CancelLineButton;
