import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useContentEditable = (initialContent: string) => {
  const $contentEditable = useRef<HTMLDivElement | null>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = (event: ChangeEvent<HTMLDivElement>) => {
    _setContent(event.target.innerText);
  };

  const setContent = (newContent: string) => {
    _setContent(newContent);
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return { content, setContent, onInput, $contentEditable };
};
