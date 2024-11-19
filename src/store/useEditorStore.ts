import { create } from "zustand";
import EditorJS from "@editorjs/editorjs";

interface StoreProps {
  editor: EditorJS | null;
  activeModal: "place" | "emoji" | "line" | null;
  align: "left" | "center";
  currentBlockIndex: number;

  setEditor: (editor: EditorJS) => void;
  toggleModal: (modalType: "place" | "emoji" | "line") => void;
  closeModal: () => void;
  toggleAlign: () => void;
  setCurrentBlockIndex: (index: number) => void;
}

/**
 * 에디터 관련 전역 상태를 관리하는 Zustand 스토어
 * 에디터 인스턴스, 모달 상태, 정렬 상태, 블록 인덱스 등을 관리
 */
const useEditorStore = create<StoreProps>((set) => ({
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
