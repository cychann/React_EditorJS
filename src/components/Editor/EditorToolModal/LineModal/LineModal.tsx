import React from "react";
import * as S from "./LineModal.style";
import useEditorStore from "store/useEditorStore";
import { LineData, Line } from "./LineData";

interface LineIconProps {
  addBlock: (type: string, data: object) => void;
}

const LineModal: React.FC<LineIconProps> = ({ addBlock }) => {
  const { closeModal } = useEditorStore();

  const handleLineClick = (line: Line) => {
    const lineData = {
      url: line.inBlockImageURL,
      imagePosition: line.inBlockImagePosition,
    };
    addBlock("delimiter", lineData);
    closeModal();
  };

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
};

export default LineModal;
