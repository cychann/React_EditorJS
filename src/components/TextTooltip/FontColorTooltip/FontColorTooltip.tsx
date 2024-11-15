import React, { useState } from "react";
import * as S from "./FontColorTooltip.style";
import { TITLE_TEXT_COLORS } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

interface FontColorTooltipProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FontColorTooltip({
  isOpen,
  onToggle,
}: FontColorTooltipProps) {
  const [selectedColor, setSelectedColor] = useState(
    TITLE_TEXT_COLORS["black"]
  );

  const setTitleColor = useTitleStore((state) => state.setTitleColor);

  const handleFontColor = (color: string) => {
    setSelectedColor(color);
    setTitleColor(color);
    onToggle();
  };

  return (
    <S.FontColorTooltipWrapper onClick={onToggle}>
      <S.ColorIcon $isDropdownOpen={isOpen} $fontColor={selectedColor} />

      {isOpen && (
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
