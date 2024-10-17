import React, { useEffect, useRef, useState } from "react";
import * as S from "./Image.style";

type ImageData = {
  url: string;
};

interface Props {
  data: ImageData;
}

export default function Image({ data }: Props) {
  const [caption, setCaption] = useState<string>("");
  const [isImageClicked, setImageClicked] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null); // ref 생성

  const handleImageClick = () => {
    setImageClicked(true);
  };

  const handleBlur = () => {
    setImageClicked(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
      setImageClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.ImageContainer ref={imageRef}>
      <S.ImageSrc
        src={data.url}
        onClick={handleImageClick}
        alt="User uploaded"
        $clicked={isImageClicked}
      />
      {(isImageClicked || caption) && (
        <S.CaptionInput
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onBlur={handleBlur}
          placeholder="이미지를 설명해보세요"
        />
      )}
    </S.ImageContainer>
  );
}
