import { create } from "zustand";
import { EditorStore } from "@/types/editor.types";

/**
 * 에디터 관련 전역 상태를 관리하는 Zustand 스토어
 * 에디터 인스턴스, 모달 상태, 정렬 상태, 블록 인덱스 등을 관리
 */
const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  activeModal: null,
  align: "left",
  currentBlockIndex: -1,

  setEditor: (editor) => set({ editor }),
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
