import * as S from "./LineIcon.style";
import useEditorStore from "store/useEditorStore";

interface LineIconProps {
  handleBlockIndex: () => void;
}

/**
 * 선 그리기를 위한 아이콘 컴포넌트
 * 클릭 시 선 그리기 모달을 열고 블록 인덱스를 업데이트
 */
export default function LineIcon({ handleBlockIndex }: LineIconProps) {
  const { toggleModal } = useEditorStore();

  const handleIconClick = () => {
    handleBlockIndex();
    toggleModal("line");
  };

  return <S.LineIcon className="modal-active-icon" onClick={handleIconClick} />;
}
