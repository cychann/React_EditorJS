import { ChangeEvent, useRef } from "react";
import * as S from "./ContentEditable.style";
import { COMMON_THEME } from "styles/Theme";
import NotificationBar from "components/Common/NotificationBar/NotificationBar";
import { useNotification } from "hooks/useNotification";

/**
 * ContentEditable 컴포넌트의 Props 인터페이스
 */

interface ContentEditableProps {
  initialText?: string;
  placeholder?: string;
  maxLength?: number;
  exceedMessage?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  fontColor?: string;
  lineHeight?: number;
  placeholderColor?: string;
  cursorColor?: string;
  textAlign?: string;
  onChange?: (text: string) => void;
}

/**
 * 커스텀 ContentEditable 컴포넌트
 * div를 기반으로 한 편집 가능한 텍스트 영역을 제공
 * 최대 길이 제한, 스타일링, 커서 위치 보존 등의 기능 포함
 */
export default function ContentEditable({
  initialText = "",
  placeholder = "",
  maxLength = 2000,
  exceedMessage = "2000자 이상 입력할 수 없습니다.",
  fontSize = 16,
  fontWeight = 400,
  fontFamily = "Noto Sans",
  lineHeight = 19,
  onChange,
  fontColor = COMMON_THEME.black_primary,
  placeholderColor = COMMON_THEME.gray_primary,
  cursorColor = COMMON_THEME.black_primary,
  textAlign = "left",
}: ContentEditableProps) {
  const contentEditable = useRef<HTMLDivElement>(null);

  const { isVisible, showNotification } = useNotification(2000);

  /**
   * 텍스트 입력 핸들러
   * 최대 길이 제한 및 커서 위치 보존 로직 포함
   */
  const handleText = (e: ChangeEvent<HTMLDivElement>) => {
    const inputText = e.target.innerText || "";

    if (inputText.length > maxLength && contentEditable.current) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const cursorPosition = range?.startOffset;

      const trimmedText = inputText.slice(0, maxLength);
      contentEditable.current.textContent = trimmedText;

      if (selection && range && cursorPosition) {
        const newCursorPosition = Math.min(cursorPosition, trimmedText.length);

        const newRange = document.createRange();
        newRange.setStart(
          contentEditable.current.childNodes[0],
          newCursorPosition
        );
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      // 길이 초과 알림 표시
      showNotification();
    } else {
      if (onChange) {
        onChange(inputText);
      }
    }
  };

  return (
    <>
      <S.EditableDiv
        ref={contentEditable}
        contentEditable
        onInput={handleText}
        placeholder={placeholder}
        $fontFamily={fontFamily}
        $fontSize={fontSize}
        $fontWeight={fontWeight}
        $fontColor={fontColor}
        $lineHeight={lineHeight}
        $placeholderColor={placeholderColor}
        $cursorColor={cursorColor}
        $textAlign={textAlign}
        suppressContentEditableWarning
      >
        {initialText}
      </S.EditableDiv>

      <NotificationBar isVisible={isVisible}>{exceedMessage}</NotificationBar>
    </>
  );
}
