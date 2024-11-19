import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { EDITOR_JS_TOOLS } from "constants/editorTools";
import useEditorStore from "store/useEditorStore";

export default function EditorContent() {
  const { editor, setEditor } = useEditorStore();

  useEffect(() => {
    if (!editor) {
      const editorInstance = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        onReady: () => {
          new Undo({ editor: editorInstance });
          new DragDrop(editorInstance);
        },
      });

      setEditor(editorInstance);
    }

    return () => {
      if (editor?.destroy) {
        editor.destroy();
        setEditor(null);
      }
    };
  }, [editor, setEditor]);

  return <div id="editorjs" />;
}
