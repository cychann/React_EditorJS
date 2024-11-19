import { MouseEvent, useRef, useState } from "react";
import * as S from "./TitleTextInput.style";
import ContentEditable from "components/Common/ContentEditable/ContentEditable";
import { COMMON_THEME } from "styles/Theme";
import useTitleStore from "store/useTitleStore";
import InlineTooltip from "components/Common/InlineTooltip/InlineTooltip";
import FontFamilyTooltip from "components/TextTooltip/FontFamilyTooltip/FontFamilyTooltip";
import FontColorTooltip from "components/TextTooltip/FontColorTooltip/FontColorTooltip";
import { FontType } from "types/Font";

/**
 * 제목 텍스트 입력 컴포넌트
 * 텍스트 입력과 함께 폰트 패밀리, 폰트 컬러 변경 기능 제공
 */
export default function TitleTextInput() {
  const setTitleText = useTitleStore((state) => state.setTitleText);
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const titleColor = useTitleStore((state) => state.titleColor);

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [titleFont, setTitleFont] = useState<FontType>("NotoSans");

  const [isFontFamilyOpen, setFontFamilyOpen] = useState(false);
  const [isFontColorOpen, setFontColorOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  /**
   * 마우스 업 이벤트 핸들러
   * 텍스트 선택 시 툴팁 표시 위치 계산 및 표시
   */
  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (tooltipRef?.current?.contains(e.target as Node)) {
      return;
    }

    if (wrapperRef.current) {
      const selection = window.getSelection();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const mouseX = e.clientX;

      if (selection && selection.toString().length > 0) {
        setTooltipPosition({
          left: mouseX - wrapperRect.left - 60,
          top: 60,
        });

        setTooltipVisible(true);
      } else {
        setTooltipVisible(false);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (tooltipRef?.current?.contains(e.target as Node)) {
      e.preventDefault();

      return;
    } else {
      setTooltipVisible(false);
      resetFontTooltipActive();
    }
  };

  const handleBlur = () => {
    setTooltipVisible(false);
    resetFontTooltipActive();
  };

  const toggleFontFamilyTooltip = () => {
    setFontFamilyOpen((prev) => !prev);
    setFontColorOpen(false);
  };

  const toggleFontColorTooltip = () => {
    setFontColorOpen((prev) => !prev);
    setFontFamilyOpen(false);
  };

  const resetFontTooltipActive = () => {
    setFontColorOpen(false);
    setFontFamilyOpen(false);
  };

  return (
    <S.TitleTextInputContainer
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onBlur={handleBlur}
      style={{ position: "relative" }}
    >
      <ContentEditable
        placeholder="제목을 입력하세요"
        maxLength={30}
        exceedMessage="제목은 30자 이상 입력할 수 없습니다."
        fontSize={45}
        fontWeight={400}
        fontFamily={titleFont}
        lineHeight={53}
        onChange={setTitleText}
        fontColor={
          titleColor
            ? titleColor
            : titleImage || titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.black_primary
        }
        placeholderColor={
          titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.gray_primary
        }
        cursorColor={
          titleImage || titleCoverColor
            ? COMMON_THEME.white_primary
            : COMMON_THEME.black_primary
        }
      />
      <InlineTooltip
        ref={tooltipRef}
        visible={isTooltipVisible}
        position={tooltipPosition}
      >
        <FontFamilyTooltip
          selectedFont={titleFont}
          onFontSelect={setTitleFont}
          isOpen={isFontFamilyOpen}
          onToggle={toggleFontFamilyTooltip}
        />
        {!titleImage && !titleCoverColor && (
          <FontColorTooltip
            isOpen={isFontColorOpen}
            onToggle={toggleFontColorTooltip}
          />
        )}
      </InlineTooltip>
    </S.TitleTextInputContainer>
  );
}
