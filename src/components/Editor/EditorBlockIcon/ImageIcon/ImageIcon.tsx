import React, { useRef } from "react";
import * as S from "./ImageIcon.style";

interface ImageIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

/**
 * 이미지 업로드를 위한 아이콘 컴포넌트
 * 클릭 시 파일 선택 다이얼로그를 열고, 선택된 이미지를 에디터에 블록으로 추가
 */

export default function ImageIcon({
  handleBlockIndex,
  addBlock,
}: ImageIconProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 파일 선택 시 실행되는 핸들러
   * 선택된 이미지의 정보를 추출하여 블록으로 추가
   *
   * TODO: 백엔드 연동 시, 실제 이미지 요청 보내고 받은 url로 데이터를 넘겨주도록 처리
   */
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const { width, height } = await getImageDimensions(imageUrl);

      const imageData = {
        url: imageUrl,
        size: file.size,
        name: file.name,
        type: file.type,
        width,
        height,
        ratio: width / height,
      };

      addBlock("unifiedImage", { images: [imageData] });
    }
  };

  /**
   * 이미지 크기를 가져오는 유틸리티 함수
   * 이미지 로드 완료 후 width와 height 반환
   */
  const getImageDimensions = (
    url: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = url;
    });
  };

  const handleIconClick = () => {
    handleBlockIndex();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <S.ImageIconWrapper>
      <S.ImageIcon onClick={handleIconClick} />
      <S.ImageFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </S.ImageIconWrapper>
  );
}
