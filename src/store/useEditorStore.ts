import { create } from "zustand";
import { EditorBlockType, EditorElement } from "types/Editor";
import { v4 as uuidv4 } from "uuid";

interface StoreProps {
  blokcs: EditorElement[];
  isModalOpen: boolean;
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";

  addBlock: (type: EditorBlockType, data?: object) => void;
  updateBlockData: (id: string, newData: object) => void;
  toggleModal: () => void;
  setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
  toggleAlign: () => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  blokcs: [{ id: uuidv4(), type: "text", data: {} }],
  isModalOpen: false,
  activeModal: null,
  align: "left",

  addBlock: (type, data) => {
    set((state) => {
      const lastBlock = state.blokcs[state.blokcs.length - 1];

      if (
        lastBlock &&
        lastBlock.type === "text" &&
        Object.keys(lastBlock.data).length === 0
      ) {
        return {
          blokcs: [
            ...state.blokcs.slice(0, -1),
            { id: uuidv4(), type, data: data || {} },
          ],
        };
      }

      return {
        blokcs: [...state.blokcs, { id: uuidv4(), type, data: data || {} }],
      };
    });
  },
  updateBlockData: (id, newData) => {
    set((state) => ({
      blokcs: state.blokcs.map((block) =>
        block.id === id
          ? { ...block, data: { ...block.data, ...newData } }
          : block
      ),
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
