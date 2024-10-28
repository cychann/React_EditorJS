import React, { useState, useEffect } from "react";
import * as S from "./PlaceModal.style";
import useEditorStore from "store/useEditorStore";
import { fetchPlaceData } from "utils/fetchPlaceData";

export default function PlaceModal() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<
    { name: string; id: string; address: string; url: string }[]
  >([]);

  const { addBlock, setActiveModal } = useEditorStore();

  const handleSearch = async (query: string) => {
    const placeData = await fetchPlaceData(query);
    setResults(placeData);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <S.HighlightText key={index}>{part}</S.HighlightText>
      ) : (
        part
      )
    );
  };

  const handleItemClick = (item: {
    name: string;
    address: string;
    url: string;
  }) => {
    addBlock("place", item);
    setActiveModal(null);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <S.PlaceModalWrapper>
      <S.PlaceInputWrapper>
        <S.PlaceSearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="장소, 주소를 검색하세요"
        />
        <S.PlaceIconWrapper>
          <S.PlaceInputClearIcon onClick={handleClearSearch} />
          <S.PlaceSearchIcon onClick={() => handleSearch(searchTerm)} />
        </S.PlaceIconWrapper>
      </S.PlaceInputWrapper>
      {results.length === 0 ? (
        <S.NoResultsWrapper>
          <S.PlaceTextWrapper>
            <S.PlaceIcon />
            <S.PlaceHelpText>장소 첨부</S.PlaceHelpText>
          </S.PlaceTextWrapper>
        </S.NoResultsWrapper>
      ) : (
        <S.PlaceListWrapper>
          {results.map((result) => (
            <S.PlaceItemContainer>
              <S.PlaceItem
                key={result.id}
                onClick={() => handleItemClick(result)}
              >
                <S.PlaceName>{highlightMatch(result.name)}</S.PlaceName>
                <S.PlaceAddress>{result.address}</S.PlaceAddress>
              </S.PlaceItem>
            </S.PlaceItemContainer>
          ))}
        </S.PlaceListWrapper>
      )}
    </S.PlaceModalWrapper>
  );
}
