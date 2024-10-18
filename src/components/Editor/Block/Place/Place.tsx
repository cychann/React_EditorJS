import React from "react";
import * as S from "./Place.style";

type placeData = {
  name: string;
  address: string;
  url: string;
};

interface Props {
  data: placeData;
}

export default function Place({ data }: Props) {
  const handlePlaceClick = () => {
    window.open(data.url, "_blank");
  };
  return (
    <S.PlaceWrapper onClick={handlePlaceClick}>
      <S.PlaceWrapperIcon />
      <S.PlaceTextWrapper>
        <S.PlaceName>{data.name}</S.PlaceName>
        <S.PlaceAddress>{data.address}</S.PlaceAddress>
      </S.PlaceTextWrapper>
    </S.PlaceWrapper>
  );
}
