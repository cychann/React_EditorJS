import { useState } from "react";

export const useTextFormatting = () => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  // 선택한 텍스트의 Range 저장
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectionRange(selection.getRangeAt(0));
    }
  };

  // 특정 태그로 감싸기
  const applyTag = (tag: string) => {
    console.log("tag", tag);
    console.log("selectionRange", selectionRange);
    if (selectionRange) {
      const selectedText = selectionRange.toString();
      const newNode = document.createElement(tag);
      newNode.textContent = selectedText;
      selectionRange.deleteContents();
      selectionRange.insertNode(newNode);
    }
  };

  // 스타일 적용 (예: 색상)
  const applyStyle = (tag: string, style: Record<string, string>) => {
    if (selectionRange) {
      const selectedText = selectionRange.toString();
      const newNode = document.createElement(tag);

      Object.entries(style).forEach(([key, value]) => {
        newNode.style[key as any] = value;
      });

      newNode.textContent = selectedText;
      selectionRange.deleteContents();
      selectionRange.insertNode(newNode);
    }
  };

  // 특정 포맷이 적용되었는지 체크
  const isFormatted = (tag: string) => {
    if (selectionRange) {
      const parentElement =
        selectionRange.commonAncestorContainer.parentElement;
      return (
        parentElement &&
        parentElement.tagName.toLowerCase() === tag.toLowerCase()
      );
    }
    return false;
  };

  return { selectionRange, saveSelection, applyTag, applyStyle, isFormatted };
};
