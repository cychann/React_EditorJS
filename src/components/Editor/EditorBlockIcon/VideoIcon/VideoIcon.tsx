import React, { useRef } from "react";
import * as S from "./VideoIcon.style";
import useEditorStore from "store/useEditorStore";

export default function VideoIcon() {
  const { addBlock } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoUrl = reader.result as string;
        addBlock("video", videoUrl);
        addBlock("text");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <S.VideoIconWrapper>
      <S.VideoIcon onClick={handleIconClick} />
      <S.VideoFileInput
        type="file"
        accept="video/*" // 비디오 파일만 허용
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </S.VideoIconWrapper>
  );
}
