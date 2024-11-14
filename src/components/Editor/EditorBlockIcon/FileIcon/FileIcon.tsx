import React, { useRef } from "react";
import * as S from "./FileIcon.style";

interface FileIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

const FileIcon: React.FC<FileIconProps> = ({ handleBlockIndex, addBlock }) => {
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
    }
  };

  const handleIconClick = () => {
    handleBlockIndex();
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
};

export default FileIcon;
