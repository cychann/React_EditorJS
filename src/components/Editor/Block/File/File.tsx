import React from "react";
import * as S from "./File.style";

type FileData = {
  url: string;
  name: string;
  type: string;
  size: number;
};

interface Props {
  data: FileData;
}

export default function File({ data }: Props) {
  const handleFileClick = () => {
    window.open(data.url, "_blank");
  };

  return (
    <S.FileWrapper onClick={handleFileClick}>
      <S.FileWrapperIcon />
      <S.FileName>{data.name}</S.FileName>
    </S.FileWrapper>
  );
}
