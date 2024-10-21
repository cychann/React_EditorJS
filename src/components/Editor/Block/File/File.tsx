import React from "react";
import * as S from "./File.style";
import useEditorStore from "store/useEditorStore";

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
  const { align } = useEditorStore();

  const handleFileClick = () => {
    window.open(data.url, "_blank");
  };

  return (
    <S.FileWrapper $align={align}>
      <S.FileContainer onClick={handleFileClick}>
        <S.FileWrapperIcon />
        <S.FileName>{data.name}</S.FileName>
      </S.FileContainer>
    </S.FileWrapper>
  );
}
