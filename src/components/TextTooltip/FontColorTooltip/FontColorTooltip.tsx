import { useState } from "react";
import * as S from "./FontColorTooltip.style";
import { TITLE_TEXT_COLORS } from "styles/Theme";
import useTitleStore from "store/useTitleStore";

interface FontColorTooltipProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * 폰트 색상을 선택할 수 있는 툴팁 컴포넌트
 * 현재 선택된 색상을 아이콘으로 표시하고, 클릭 시 색상 선택 팔레트를 제공
 */
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
