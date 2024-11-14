import React, { useRef } from "react";
import * as S from "./GroupImageIcon.style";

interface GruopImageIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

const GroupImageIcon: React.FC<GruopImageIconProps> = ({
  handleBlockIndex,
  addBlock,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
