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
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
      };
      addBlock("file", fileInfo);
      addBlock("text");
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
      <S.FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
    </>
  );
}
