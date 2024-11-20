import EditorJS from "@editorjs/editorjs";

export type ModalType = "place" | "emoji" | "line" | null;
export type AlignType = "left" | "center";

export interface EditorStore {
  editor: EditorJS | null;
  activeModal: ModalType;
  align: AlignType;
  currentBlockIndex: number;

  setEditor: (editor: EditorJS) => void;
  toggleModal: (modalType: Exclude<ModalType, null>) => void;
  closeModal: () => void;
  toggleAlign: () => void;
  setCurrentBlockIndex: (index: number) => void;
}
