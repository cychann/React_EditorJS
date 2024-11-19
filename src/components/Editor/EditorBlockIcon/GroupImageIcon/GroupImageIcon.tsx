import React, { useRef } from "react";
import * as S from "./GroupImageIcon.style";

interface GruopImageIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

/**
 * 다중 이미지 업로드를 위한 아이콘 컴포넌트
 * 여러 이미지를 선택하여 컬럼 형태로 에디터에 추가
 */
const GroupImageIcon: React.FC<GruopImageIconProps> = ({
  handleBlockIndex,
  addBlock,
}) => {
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
    const files = event.target.files;
    if (files) {
      const imagesData = await Promise.all(
        Array.from(files).map(async (file) => {
          const imageUrl = URL.createObjectURL(file);
          const { width, height } = await getImageDimensions(imageUrl);

          return {
            url: imageUrl,
            size: file.size,
            name: file.name,
            type: file.type,
            width,
            height,
            ratio: width / height,
          };
        })
      );

      const columnCount = Math.ceil(imagesData.length / 3);
      const columns: Array<typeof imagesData> = Array.from(
        { length: columnCount },
        () => []
      );

      imagesData.forEach((imageData, index) => {
        const colIndex = index % columnCount;
        columns[colIndex].push(imageData);
      });

      columns.forEach((columnImages) => {
        addBlock("unifiedImage", { images: columnImages });
      });
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
    <S.GroupImageIconWrapper>
      <S.GroupImageIcon onClick={handleIconClick} />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
      />
    </S.GroupImageIconWrapper>
  );
};

export default GroupImageIcon;
