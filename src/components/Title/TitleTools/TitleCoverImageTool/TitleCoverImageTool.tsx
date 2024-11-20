import { ChangeEvent, useRef } from "react";
import * as S from "./TitleCoverImageTool.style";
import useTitleStore from "@/store/useTitleStore";

/**
 * 제목 섹션의 커버 이미지 업로드 도구 컴포넌트
 * 이미지 파일 선택 및 업로드 기능 제공
 */
export default function TitleCoverImageTool() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const titleCoverImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleImage = useTitleStore((state) => state.setTitleCoverImage);
  const setTitleColor = useTitleStore((state) => state.setTitleColor);

  /**
   * 파일 선택 시 호출되는 핸들러
   * 선택된 이미지를 URL로 변환하여 커버 이미지로 설정
   * 이미지 설정 시 커버 컬러는 제거됨
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTitleImage(imageUrl);
      setTitleColor(null);
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
        $hasCoverBg={!!titleCoverImage || !!titleCoverColor}
      />
    </S.ImageInputWrapper>
  );
}
