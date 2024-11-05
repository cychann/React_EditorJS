import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { EDITOR_JS_TOOLS } from "constants/editorTools";

interface EditorContentProps {
  editorRef: React.MutableRefObject<EditorJS | undefined>;
}

export default function EditorContent({ editorRef }: EditorContentProps) {
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

      const saveBtn = document.querySelector("#save-btn");
      saveBtn?.addEventListener("click", () => {
        editor
          .save()
          .then((outputData) => console.log("Article data: ", outputData))
          .catch((error) => console.log("Saving failed: ", error));
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [editorRef]);

  return <div id="editorjs" />;
}
