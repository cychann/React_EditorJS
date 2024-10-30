export const textFormatting = () => {
  const saveSelection = (): Range | null => {
    const selection = window.getSelection();
    return selection && selection.toString().length > 0
      ? selection.getRangeAt(0)
      : null;
  };

  // 특정 태그로 감싸기
  const applyTag = (tag: string) => {
    const selectionRange = saveSelection();

    if (selectionRange) {
      const selectedText = selectionRange.extractContents();
      // const parentElement =
      //   selectionRange.commonAncestorContainer.parentElement;
      const newNode = document.createElement(tag);
      newNode.appendChild(selectedText);

      selectionRange.insertNode(newNode);
    }
  };

  const applyStyle = (style: Record<string, string>) => {
    const selectionRange = saveSelection();

    if (selectionRange) {
      const selectedText = selectionRange.toString();
      const parentElement = selectionRange.startContainer.parentElement;

      console.log("selectedText", selectedText);
      console.log("parentElement", parentElement);
      if (parentElement && parentElement.tagName.toLowerCase() === "span") {
        // 이미 span 태그로 감싸져 있는 경우, 스타일을 덮어씌움
        Object.entries(style).forEach(([key, value]) => {
          parentElement.style[key as any] = value;
        });
      } else {
        // span 태그로 감싸지지 않은 경우, 새로운 span 태그 생성
        const newNode = document.createElement("span");
        Object.entries(style).forEach(([key, value]) => {
          newNode.style[key as any] = value;
        });
        newNode.textContent = selectedText;
        selectionRange.deleteContents();
        selectionRange.insertNode(newNode);
      }
    }
  };

  const isFormatted = (tag: string): boolean => {
    const selectionRange = saveSelection();
    console.log(selectionRange);
    if (selectionRange) {
      const selectedText = selectionRange.toString();
      console.log("Selected Text:", selectedText); // 선택된 텍스트 출력
      let currentElement = selectionRange.commonAncestorContainer.parentElement;

      const tags: string[] = [];

      while (currentElement) {
        const tagName = currentElement.tagName.toLowerCase();
        console.log("currentElement", currentElement);

        if (currentElement.getAttribute("contenteditable") === "true") {
          break;
        }

        tags.push(tagName);
        currentElement = currentElement.parentElement;
      }
      console.log(tags);

      return tags.includes(tag);
    }

    return false;
  };

  return { saveSelection, applyTag, applyStyle, isFormatted };
};
