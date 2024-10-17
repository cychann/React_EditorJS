import React, { useRef } from "react";
import * as S from "./FileIcon.style";
import useEditorStore from "store/useEditorStore";

export default function FileIcon() {
  const { addBlock } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        // 필요에 따라 다른 파일 속성 추가
      };
      addBlock("file", fileInfo); // 파일 정보를 addBlock에 전달
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <S.FileIcon onClick={handleIconClick} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // 파일 입력 숨김
      />
    </>
  );
}
