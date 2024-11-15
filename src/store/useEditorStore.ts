import { create } from "zustand";

interface StoreProps {
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";
  currentBlockIndex: number;

  // setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
  toggleModal: (modalType: "place" | "emoji" | "line") => void;
  closeModal: () => void;
  toggleAlign: () => void;
  setCurrentBlockIndex: (index: number) => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  activeModal: null,
  align: "left",
  currentBlockIndex: -1,

  toggleModal: (modalType) => {
    set((state) => ({
      activeModal: state.activeModal === modalType ? null : modalType,
    }));
  },
  closeModal: () => {
    set({ activeModal: null });
  },
  toggleAlign: () =>
    set((state) => ({
      align: state.align === "left" ? "center" : "left",
    })),
  setCurrentBlockIndex: (index) =>
    set({
      currentBlockIndex: index,
    }),
}));

export default useEditorStore;
