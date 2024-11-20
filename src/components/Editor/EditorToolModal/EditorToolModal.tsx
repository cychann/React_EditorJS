import { ReactNode } from "react";
import * as S from "./EditorToolModal.style";
import useEditorStore from "@/store/useEditorStore";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  top: number;
  children: ReactNode;
}

/**
 * 에디터 툴바의 모달 컴포넌트
 * 이모지, 구분선, 장소 등의 추가 옵션을 제공하는 모달 창을 관리
 */
export default function EditorToolModal({ top, children }: Props) {
  const { activeModal, closeModal } = useEditorStore();

  /**
   * 모달 외부 클릭 감지 훅 사용
   * 모달 외부 클릭 시 모달을 닫되,
   * 모달을 활성화한 아이콘 클릭은 제외
   */
  const { $ref } = useClickOutside<HTMLDivElement>(
    () => {
      closeModal();
    },
    (element) => {
      return activeModal && element.classList.contains("modal-active-icon");
    }
  );

  return (
    <S.EditorToolModalContainer $top={top} ref={$ref}>
      {children}
    </S.EditorToolModalContainer>
  );
}
