import { useState, useEffect } from "react";
import * as S from "./PlaceModal.style";
import useEditorStore from "@/store/useEditorStore";
import { fetchPlaceData } from "@/utils/fetchPlaceData";

interface PlaceIconProps {
  addBlock: (type: string, data: object) => void;
}

/**
 * 장소 검색 및 선택을 위한 모달 컴포넌트
 * 장소를 검색하고 결과를 표시하며, 선택한 장소를 에디터에 블록으로 추가
 */

export default function PlaceModal({ addBlock }: PlaceIconProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<
    { name: string; id: string; address: string; url: string }[]
  >([]);

  const activeModal = useEditorStore((state) => state.activeModal);
  const closeModal = useEditorStore((state) => state.closeModal);

  /**
   * 장소 검색 처리 함수
   * API를 통해 장소 데이터를 가져와 결과 업데이트
   */
  const handleSearch = async (query: string) => {
    const placeData = await fetchPlaceData(query);
    setResults(placeData);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  /**
   * 검색어와 일치하는 텍스트 하이라이트 처리 함수
   * 검색어와 일치하는 부분을 강조 표시
   */
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
    closeModal();
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  if (activeModal !== "place") return null;

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
            <S.PlaceItemContainer key={result.id}>
              <S.PlaceItem onClick={() => handleItemClick(result)}>
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
