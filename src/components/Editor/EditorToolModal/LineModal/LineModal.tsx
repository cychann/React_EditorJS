import * as S from "./LineModal.style";
import useEditorStore from "@/store/useEditorStore";
import { LineData } from "./LineData";
import { Line } from "@/types/components/line.types";

interface LineIconProps {
  addBlock: (type: string, data: object) => void;
}

/**
 * 구분선 선택을 위한 모달 컴포넌트
 * 다양한 스타일의 구분선을 제공하고 선택한 구분선을 에디터에 추가
 */
export default function LineModal({ addBlock }: LineIconProps) {
  const activeModal = useEditorStore((state) => state.activeModal);
  const closeModal = useEditorStore((state) => state.closeModal);

  const handleLineClick = (line: Line) => {
    const lineData = {
      url: line.inBlockImageURL,
      imagePosition: line.inBlockImagePosition,
    };
    addBlock("delimiter", lineData);
    closeModal();
  };

  if (activeModal !== "line") return null;

  return (
    <S.LineModalWrapper>
      {LineData.map((line, index) => (
        <S.HrLine
          key={index}
          $imagePosition={line.modalImagePosition}
          onClick={() => handleLineClick(line)}
        />
      ))}
    </S.LineModalWrapper>
  );
}
