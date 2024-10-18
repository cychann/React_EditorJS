import React from "react";
import * as S from "./Emoji.style";

type EmojiType = {
  emoji: string;
};

interface Props {
  data: EmojiType;
}

export default function Emoji({ data }: Props) {
  return (
    <S.EmojiContainer>
      <S.Emoji contentEditable={false}>{data.emoji}</S.Emoji>
    </S.EmojiContainer>
  );
}
