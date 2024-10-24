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
  active: boolean;
}

export default function File({ data, active }: Props) {
  const { align } = useEditorStore();

  return (
    <S.FileWrapper $align={align} $active={active}>
      <S.FileContainer>
        <S.FileWrapperIcon />
        <S.FileName>{data.name}</S.FileName>
      </S.FileContainer>
    </S.FileWrapper>
  );
}
