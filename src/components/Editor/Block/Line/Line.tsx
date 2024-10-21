import React from "react";
import * as S from "./Line.style";
import useEditorStore from "store/useEditorStore";

type lineData = {
  url: string;
  imagePosition: string;
};

interface Props {
  data: lineData;
}

export default function Line({ data }: Props) {
  const { align } = useEditorStore();

  return (
    <S.Hr
      $imageUrl={data.url}
      $imagePosition={data.imagePosition}
      $align={align}
    />
  );
}
