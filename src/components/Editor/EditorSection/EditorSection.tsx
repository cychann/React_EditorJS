import React, { useEffect, useRef, useState } from "react";
import * as S from "./EditorSection.style";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import EditorContent from "../EditorContent/EditorContent";
import { EditorBlockType, EditorElement } from "types/Editor";

const ELEMENTS: EditorElement[] = [{ id: 0, type: "text", data: "" }];

export default function EditorSection() {
  const editorSectionRef = useRef<HTMLDivElement>(null);
  const [toolbarTop, setToolbarTop] = useState(487);

  const [elements, setElements] = useState<EditorElement[]>(ELEMENTS);

  const addElement = (type: EditorBlockType) => {
    const newElement = { id: elements.length, type, data: "" };
    setElements([...elements, newElement]);
  };

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
      <EditorContent elements={elements} />
      <EditorToolbar toolbarTop={toolbarTop} onAddElement={addElement} />
    </S.EditorSectionContainer>
  );
}
