import React from "react";
import { useTextFormatting } from "hooks/useTextFormatting";

const BoldButton: React.FC<{ saveSelection: () => void }> = ({
  saveSelection,
}) => {
  const { applyTag, isFormatted } = useTextFormatting();
  const isBold = isFormatted("b");

  const handleClick = () => {
    saveSelection(); // 선택된 텍스트 범위를 저장
    applyTag("b"); // 볼드 적용
  };

  return (
    <button onClick={handleClick} style={{ color: isBold ? "red" : "black" }}>
      Bold
    </button>
  );
};

export default BoldButton;
