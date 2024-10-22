import React, { useEffect, useRef } from "react";
import * as S from "./EditorToolModal.style";
import useEditorStore from "store/useEditorStore";

interface Props {
  top: number;
  children: React.ReactNode;
}

export default function EditorToolModal({ top, children }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { setActiveModal } = useEditorStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveModal]);
  return (
    <S.EditorToolModalContainer $top={top} ref={modalRef}>
      {children}
    </S.EditorToolModalContainer>
  );
}
