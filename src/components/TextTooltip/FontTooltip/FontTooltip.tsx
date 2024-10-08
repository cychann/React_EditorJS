import { useState } from "react";
import * as S from "./FontTooltip.style";
import useTitleStore from "store/useTitleStore";

type TitleFont =
  | "Noto Sans"
  | "Nanum Myeongjo"
  | "Nanum Gothic"
  | "Nanum Barun Gothic"
  | "Helvetica"
  | "Georgia";

const FONT_OPTIONS: { value: TitleFont; label: string }[] = [
  { value: "Noto Sans", label: "본고딕" },
  { value: "Nanum Myeongjo", label: "나눔명조" },
  { value: "Nanum Gothic", label: "나눔고딕" },
  { value: "Nanum Barun Gothic", label: "나눔바른고딕" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Georgia", label: "Georgia" },
];

export default function FontTooltip() {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].label);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const setTitleFont = useTitleStore((state) => state.setTitleFont);

  const handleFontSelect = (font: TitleFont) => {
    setSelectedFont(
      FONT_OPTIONS.find((option) => option.value === font)?.label ||
        FONT_OPTIONS[0].label
    );
    setTitleFont(font);
    setDropdownOpen(false);
  };

  return (
    <S.DropdownWrapper>
      <S.DropdownHeader
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        $isDropdownOpen={isDropdownOpen}
      >
        {selectedFont}
        <S.DropdownIcon $isDropdownOpen={isDropdownOpen} />
      </S.DropdownHeader>
      {isDropdownOpen && (
        <S.DropdownList>
          {FONT_OPTIONS.map((font) => (
            <S.DropdownItem
              key={font.value}
              onClick={() => handleFontSelect(font.value)}
              fontFamily={font.value}
            >
              {font.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownWrapper>
  );
}
