import React from "react";
import * as S from "./Line.style";

type lineData = {
  url: string;
  imagePosition: string;
};

interface Props {
  data: lineData;
}

export default function Line({ data }: Props) {
  return <S.Hr $imageUrl={data.url} $imagePosition={data.imagePosition} />;
}
