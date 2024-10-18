// store/editorStore.ts
import { create } from "zustand";
import { EditorBlockType, EditorElement } from "types/Editor";

interface StoreProps {
  blokcs: EditorElement[];
  isModalOpen: boolean;
  activeModal: "place" | "emoji" | "line" | null;

  addBlock: (type: EditorBlockType, data?: object) => void;
  toggleModal: () => void;
  setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  blokcs: [{ id: 0, type: "text", data: {} }],
  isModalOpen: false,
  activeModal: null,

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
}));

export default useEditorStore;
