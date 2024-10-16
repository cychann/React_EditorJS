// store/editorStore.ts
import { create } from "zustand";
import { EditorBlockType, EditorElement } from "types/Editor";

interface StoreProps {
  blokcs: EditorElement[];
  addBlock: (type: EditorBlockType, data?: string) => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  blokcs: [{ id: 0, type: "text", data: "" }],
  addBlock: (type, data = "") => {
    set((state) => ({
      blokcs: [...state.blokcs, { id: state.blokcs.length, type, data }],
    }));
  },
}));

export default useEditorStore;
