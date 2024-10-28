import { create } from "zustand";
import { EditorBlockType, EditorElement } from "types/Editor";
import { v4 as uuidv4 } from "uuid";

interface StoreProps {
  blokcs: EditorElement[];
  activeBlockId: string | null;
  isModalOpen: boolean;
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";

  addBlock: (type: EditorBlockType, data?: object) => string;
  setActiveBlock: (id: string | null) => void;
  deleteBlock: (id: string) => void;
  updateBlockData: (id: string, newData: object) => void;

  setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
  toggleAlign: () => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  blokcs: [{ id: uuidv4(), type: "text", data: {} }],
  activeBlockId: null,
  isModalOpen: false,
  activeModal: null,
  align: "left",

  addBlock: (type, data) => {
    const newBlockId = uuidv4();
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
            { id: newBlockId, type, data: data || {} },
          ],
        };
      }

      if (type !== "text") {
        return {
          blokcs: [
            ...state.blokcs,
            { id: newBlockId, type, data: data || {} },
            { id: uuidv4(), type: "text", data: {} },
          ],
        };
      }

      return {
        blokcs: [...state.blokcs, { id: newBlockId, type, data: data || {} }],
      };
    });

    return newBlockId;
  },
  setActiveBlock: (id) => {
    set(() => ({
      activeBlockId: id,
    }));
  },
  deleteBlock: (id) => {
    set((state) => ({
      blokcs: state.blokcs.filter((block) => block.id !== id),
    }));
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

  setActiveModal: (modalType) => {
    set((state) => ({
      isModalOpen: state.activeModal !== modalType,
      activeModal: state.activeModal === modalType ? null : modalType,
    }));
  },
  toggleAlign: () =>
    set((state) => ({
      align: state.align === "left" ? "center" : "left",
    })),
}));

export default useEditorStore;
