import React, { useState } from "react";
import * as S from "./Video.style";
import { useClickOutside } from "hooks/useClickOutside";

type VideoData = {
  url: string;
};

interface Props {
  data: VideoData;
}

export default function Video({ data }: Props) {
  const [caption, setCaption] = useState<string>("");
  const [isVideoClicked, setVideoClicked] = useState(false);
  const { $ref } = useClickOutside<HTMLDivElement>(() => {
    setVideoClicked(false);
  });

  const handleVideoClick = () => {
    setVideoClicked(true);
  };

  const handleBlur = () => {
    setVideoClicked(false);
  };

  return (
    <S.VideoContainer ref={$ref}>
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
