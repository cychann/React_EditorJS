import React, { useEffect, useRef, useState } from "react";
import * as S from "./Image.style";
import useEditorStore from "store/useEditorStore";

type ImageData = {
  url: string;
};

interface Props {
  data: ImageData;
  active: boolean;
}

export default function Image({ data, active }: Props) {
  const [caption, setCaption] = useState<string>("");
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { setActiveBlock } = useEditorStore();

  const handleBlur = () => {
    setActiveBlock(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
      setActiveBlock(null);
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
      <S.ImageSrc src={data.url} alt="User uploaded" $clicked={active} />
      {(active || caption) && (
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
