import React, { useRef } from "react";
import * as S from "./GroupImageIcon.style";

interface GruopImageIconProps {
  addBlock: (type: string, data: object) => void;
}

const GroupImageIcon: React.FC<GruopImageIconProps> = ({ addBlock }) => {
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
            ratio: width / height,
          };
        })
      );

      const columnCount = Math.ceil(imagesData.length / 3);
      const columns: { [key: string]: typeof imagesData } = {};

      for (let i = 1; i <= columnCount; i++) {
        columns[`col${i}`] = [];
      }

      imagesData.forEach((imageData, index) => {
        const colKey = `col${(index % columnCount) + 1}`;
        columns[colKey].push(imageData);
      });

      addBlock("groupImage", { images: columns });
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
