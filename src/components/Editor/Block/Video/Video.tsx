import React, { useEffect, useRef, useState } from "react";
import * as S from "./Video.style";

type VideoData = {
  url: string;
};

interface Props {
  data: VideoData;
}

export default function Video({ data }: Props) {
  const [caption, setCaption] = useState<string>("");
  const [isVideoClicked, setVideoClicked] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);

  const handleVideoClick = () => {
    setVideoClicked(true);
  };

  const handleBlur = () => {
    setVideoClicked(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (videoRef.current && !videoRef.current.contains(event.target as Node)) {
      setVideoClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.VideoContainer ref={videoRef}>
      <S.VideoSrc
        controls
        src={data.url}
        onClick={handleVideoClick}
        $clicked={isVideoClicked}
      />
      {(isVideoClicked || caption) && (
        <S.CaptionInput
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onBlur={handleBlur}
          placeholder="동영상을 설명해보세요"
        />
      )}
    </S.VideoContainer>
  );
}
