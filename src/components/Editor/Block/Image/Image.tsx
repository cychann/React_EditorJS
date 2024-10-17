import React, { useEffect, useRef, useState } from "react";
import * as S from "./Image.style";

interface Props {
  data: string;
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
    // 클릭한 요소가 imageRef에 해당되지 않는 경우
    if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
      setImageClicked(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <S.ImageContainer ref={imageRef}>
      <S.ImageSrc
        src={data}
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
