import React, { useState } from "react";
import * as S from "./FontColorTooltip.style";
import { TITLE_TEXT_COLORS } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

export default function FontColorTooltip() {
  const [selectedColor, setSelectedColor] = useState(
    TITLE_TEXT_COLORS["black"]
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const setTitleColor = useTitleStore((state) => state.setTitleColor);

  const handleFontColor = (color: string) => {
    setSelectedColor(color);
    setDropdownOpen(false);
    setTitleColor(color);
  };

  return (
    <S.FontColorTooltipWrapper onClick={() => setDropdownOpen(!isDropdownOpen)}>
      <S.ColorIcon
        $isDropdownOpen={isDropdownOpen}
        $fontColor={selectedColor}
      />

      {isDropdownOpen && (
        <S.TitleColorList>
          {Object.entries(TITLE_TEXT_COLORS).map(([key, color]) => (
            <S.TitleColorItem
              key={key}
              $colorItemColor={color}
              $isSelected={color === selectedColor}
              onClick={() => handleFontColor(color)}
            />
          ))}
        </S.TitleColorList>
      )}
    </S.FontColorTooltipWrapper>
  );
}
