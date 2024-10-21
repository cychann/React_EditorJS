import React from "react";
import * as S from "./Place.style";
import useEditorStore from "store/useEditorStore";

type placeData = {
  name: string;
  address: string;
  url: string;
};

interface Props {
  data: placeData;
}

export default function Place({ data }: Props) {
  const { align } = useEditorStore();

  const handlePlaceClick = () => {
    window.open(data.url, "_blank");
  };
  return (
    <S.PlaceWrapper $align={align}>
      <S.PlaceContainer onClick={handlePlaceClick}>
        <S.PlaceContainerIcon />
        <S.PlaceTextWrapper>
          <S.PlaceName>{data.name}</S.PlaceName>
          <S.PlaceAddress>{data.address}</S.PlaceAddress>
        </S.PlaceTextWrapper>
      </S.PlaceContainer>
    </S.PlaceWrapper>
  );
}
