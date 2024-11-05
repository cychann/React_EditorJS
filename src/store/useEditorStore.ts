import { create } from "zustand";

interface StoreProps {
  isModalOpen: boolean;
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";

  setActiveModal: (modalType: "place" | "emoji" | "line" | null) => void;
  toggleAlign: () => void;
}

const useEditorStore = create<StoreProps>((set) => ({
  isModalOpen: false,
  activeModal: null,
  align: "left",

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
