import React, { useEffect, useRef, useState } from "react";
import * as S from "./EditorSection.style";
import EditorToolbar from "components/Editor/EditorToolbar/EditorToolbar";
import EditorContent from "components/Editor/EditorContent/EditorContent";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../EditorContent/Tools";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";

export default function EditorSection() {
  const editorSectionRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | undefined>();

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

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        onReady: () => {
          new Undo({ editor });
          new DragDrop(editor);
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <S.EditorSectionContainer ref={editorSectionRef}>
      <div id="editorjs" />
      <EditorToolbar toolbarTop={toolbarTop} editor={editorRef} />
    </S.EditorSectionContainer>
  );
}
