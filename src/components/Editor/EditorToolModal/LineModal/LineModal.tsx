import React from "react";
import * as S from "./LineModal.style";
import useEditorStore from "store/useEditorStore";
import { LineData, Line } from "./LineData";

export default function LineModal() {
  const { addBlock, setActiveModal } = useEditorStore();

  const handleLineClick = (line: Line) => {
    const lineData = {
      url: line.inBlockImageURL,
      imagePosition: line.inBlockImagePosition,
    };
    addBlock("line", lineData);
    addBlock("text");
    setActiveModal(null);
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
}
