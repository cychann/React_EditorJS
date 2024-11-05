import React, { useRef } from "react";
import * as S from "./GroupImageIcon.style";

export default function GroupImageIcon() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imagesData = Array.from(files).map((file) => {
        const imageUrl = URL.createObjectURL(file);
        return {
          url: imageUrl,
          size: file.size,
          name: file.name,
          type: file.type,
        };
      });

      // addBlock("groupImage", { images: imagesData });
    }
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
}
