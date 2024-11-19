import React, { useRef } from "react";
import * as S from "./VideoIcon.style";

interface VideoIconProps {
  addBlock: (type: string, data: object) => void;
  handleBlockIndex: () => void;
}

/**
 * 비디오 업로드를 위한 아이콘 컴포넌트
 * 클릭 시 파일 선택 다이얼로그를 열고, 선택된 비디오를 에디터에 블록으로 추가
 */
const VideoIcon: React.FC<VideoIconProps> = ({
  handleBlockIndex,
  addBlock,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 파일 선택 시 실행되는 핸들러
   * 선택된 비디오 파일을 Data URL로 변환하여 블록으로 추가
   *
   * TODO: 백엔드 연동 시, 실제 비디오 요청 보내고 받은 url로 데이터를 넘겨주도록 처리
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoUrl = reader.result as string;
        addBlock("video", { url: videoUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    handleBlockIndex();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <S.VideoIconWrapper>
      <S.VideoIcon onClick={handleIconClick} />
      <S.VideoFileInput
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </S.VideoIconWrapper>
  );
};

export default VideoIcon;
