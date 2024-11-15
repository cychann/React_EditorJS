import React from "react";
import * as S from "./EditorToolModal.style";
import useEditorStore from "store/useEditorStore";
import { useClickOutside } from "hooks/useClickOutside";

interface Props {
  top: number;
  children: React.ReactNode;
}

export default function EditorToolModal({ top, children }: Props) {
  const { activeModal, closeModal } = useEditorStore();

  const { $ref } = useClickOutside<HTMLDivElement>(() => {
    closeModal();
  });

  return (
    <S.EditorToolModalContainer $top={top} ref={$ref}>
      {children}
    </S.EditorToolModalContainer>
  );
}
