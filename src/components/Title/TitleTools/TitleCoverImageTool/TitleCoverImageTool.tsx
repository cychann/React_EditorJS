import React, { useRef } from "react";
import * as S from "./TitleCoverImageTool.style";
import useTitleStore from "store/useTitleStore";

export default function TitleCoverImageTool() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const titleCoverImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleImage = useTitleStore((state) => state.setTitleCoverImage);

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
      <S.ImageInputIcon
        onClick={handleIconClick}
        hasCoverBg={!!titleCoverImage || !!titleCoverColor}
      />
    </S.ImageInputWrapper>
  );
}
