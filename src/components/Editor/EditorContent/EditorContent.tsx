import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { EDITOR_JS_TOOLS } from "constants/editorTools";
import useEditorStore from "store/useEditorStore";

const EditorContent = React.memo(() => {
  const { setEditor } = useEditorStore();
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      const editorInstance = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        onReady: () => {
          new Undo({ editor: editorInstance });
          new DragDrop(editorInstance);
          setEditor(editorInstance);
        },
      });

      editorInstanceRef.current = editorInstance;
    }

    return () => {
      if (editorInstanceRef.current?.destroy) {
        editorInstanceRef.current.destroy();
        setEditor(null);
        editorInstanceRef.current = null;
      }
    };
  }, []); // 마운트/언마운트 시에만 실행

  return <div id="editorjs" />;
});

export default EditorContent;
