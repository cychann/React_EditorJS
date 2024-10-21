// store/editorStore.ts
import { create } from "zustand";
import { EditorBlockType, EditorElement } from "types/Editor";

interface StoreProps {
  blokcs: EditorElement[];
  isModalOpen: boolean;
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";

  addBlock: (type: EditorBlockType, data?: object) => void;
  toggleModal: () => void;
  setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
  toggleAlign: () => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  blokcs: [{ id: 0, type: "text", data: {} }],
  isModalOpen: false,
  activeModal: null,
  align: "left",

  addBlock: (type, data) => {
    set((state) => ({
      blokcs: [
        ...state.blokcs,
        { id: state.blokcs.length, type, data: data || {} },
      ],
    }));
  },
  toggleModal: () =>
    set((state) => ({
      isModalOpen: !state.isModalOpen,
      activeModal: !state.isModalOpen ? state.activeModal : null,
    })),
  setActiveModal: (modalType) => set({ activeModal: modalType }),
  toggleAlign: () =>
    set((state) => ({
      align: state.align === "left" ? "center" : "left",
    })),
}));

export default useEditorStore;
