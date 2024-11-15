import { useState } from "react";
import * as S from "./FontFamilyTooltip.style";
import { FontType } from "types/Font";

const FONT_OPTIONS: { value: FontType; label: string }[] = [
  { value: "NotoSans", label: "본고딕" },
  { value: "NanumMyeongjo", label: "나눔명조" },
  { value: "NanumGothic", label: "나눔고딕" },
  { value: "NanumBarunGothic", label: "나눔바른고딕" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Georgia", label: "Georgia" },
];

interface FontFamilyTooltipProps {
  selectedFont: FontType;
  onFontSelect: (font: FontType) => void;
}

export default function FontFamilyTooltip({
  selectedFont,
  onFontSelect,
}: FontFamilyTooltipProps) {
  const [activeFont, setActiveFont] = useState(
    FONT_OPTIONS.find((option) => option.value === selectedFont)?.label
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleFontSelect = (font: FontType) => {
    onFontSelect(font);
    setActiveFont(
      FONT_OPTIONS.find((option) => option.value === font)?.label ||
        FONT_OPTIONS[0].label
    );
    setDropdownOpen(false);
  };

  return (
    <S.DropdownWrapper>
      <S.DropdownHeader
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        $isDropdownOpen={isDropdownOpen}
      >
        {activeFont}
        <S.DropdownIcon $isDropdownOpen={isDropdownOpen} />
      </S.DropdownHeader>
      {isDropdownOpen && (
        <S.DropdownList>
          {FONT_OPTIONS.map((font) => (
            <S.DropdownItem
              key={font.value}
              onClick={() => handleFontSelect(font.value)}
              fontFamily={font.value}
              $isSelected={font.label === activeFont} // 선택된 항목인지 확인
            >
              {font.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
}
