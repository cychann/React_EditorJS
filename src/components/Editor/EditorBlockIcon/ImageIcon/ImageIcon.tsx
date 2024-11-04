import React, { useRef } from "react";
import * as S from "./ImageIcon.style";

interface ImageIconProps {
  addBlock: (type: string, data: object) => void;
}

const ImageIcon: React.FC<ImageIconProps> = ({ addBlock }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      addBlock("image", { url: imageUrl });
    }
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
