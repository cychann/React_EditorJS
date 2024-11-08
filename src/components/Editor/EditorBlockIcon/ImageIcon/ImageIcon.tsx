import React, { useRef } from "react";
import * as S from "./ImageIcon.style";

interface ImageIconProps {
  addBlock: (type: string, data: object) => void;
}

const ImageIcon: React.FC<ImageIconProps> = ({ addBlock }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
};

export default ImageIcon;
