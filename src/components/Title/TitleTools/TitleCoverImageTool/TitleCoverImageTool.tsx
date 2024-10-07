import React, { useRef, useState } from "react";
import * as S from "./TitleCoverImageTool.style";
import useTitleImageStore from "store/useTitleImageStore";

export default function TitleCoverImageTool() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setTitleImage = useTitleImageStore((state) => state.setTitleCoverImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTitleImage(imageUrl);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <S.ImageInputWrapper>
      <S.ImageFileInput
        id="file-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <S.ImageInputIcon size={25} onClick={handleIconClick} />
    </S.ImageInputWrapper>
  );
}
