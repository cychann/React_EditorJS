import React, { useEffect, useState } from "react";
import * as S from "./FontFamilyButton.style";
import { textFormatting } from "utils/textFormatting";
import FontFamilyTooltip from "components/TextTooltip/FontFamilyTooltip/FontFamilyTooltip";
import { FontType } from "types/Font";

const FontFamilyButton = () => {
  const [titleFont, setTitleFont] = useState<FontType>("NotoSans");
  const { applyStyle } = textFormatting();

  useEffect(() => {
    applyStyle({ fontFamily: titleFont }); // 토글 값을 전달
  }, [titleFont]);

  return (
    <S.FontFamilyButtonContainer>
      <FontFamilyTooltip selectedFont={titleFont} onFontSelect={setTitleFont} />
    </S.FontFamilyButtonContainer>
  );
};

export default FontFamilyButton;
