import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { EDITOR_JS_TOOLS } from "constants/editorTools";
import useEditorStore from "store/useEditorStore";

/**
 * Editor.js를 초기화하고 관리하는 컴포넌트
 * 드래그&드롭, 실행취소 기능을 포함한 에디터 인스턴스를 생성
 */
const EditorContent = memo(() => {
  const { setEditor } = useEditorStore();
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstanceRef.current) {
      // Editor.js 인스턴스 생성
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
  }, []);

  return <div id="editorjs" />;
});

export default EditorContent;
