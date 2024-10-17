import React, { useEffect, useRef, useState } from "react";
import * as S from "./EditorSection.style";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import EditorContent from "../EditorContent/EditorContent";

export default function EditorSection() {
  const editorSectionRef = useRef<HTMLDivElement>(null);
  const [toolbarTop, setToolbarTop] = useState(487);

  useEffect(() => {
    const handleScroll = () => {
      if (editorSectionRef.current) {
        const rect = editorSectionRef.current.getBoundingClientRect();

        if (rect.top > 0) {
          setToolbarTop(rect.top + 40);
        }

        if (rect.top <= 0) {
          setToolbarTop(40);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <S.EditorSectionContainer ref={editorSectionRef}>
      <EditorContent />
      <EditorToolbar toolbarTop={toolbarTop} />
    </S.EditorSectionContainer>
  );
}
