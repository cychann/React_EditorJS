import React, { useRef } from "react";
import * as S from "./FileIcon.style";

interface FileIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

/**
 * 파일 업로드를 위한 아이콘 컴포넌트
 * 클릭 시 파일 선택 다이얼로그를 열고, 선택된 파일을 에디터에 블록으로 추가
 */
export default function FileIcon({
  handleBlockIndex,
  addBlock,
}: FileIconProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 파일 선택 시 실행되는 핸들러
   * 선택된 파일의 정보를 추출하여 블록으로 추가
   *
   * TODO: 백엔드 연동 시, 실제 파일 요청 보내고 받은 url로 데이터를 넘겨주도록 처리
   */
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
}
