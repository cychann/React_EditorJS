import * as S from "./TitleCoverColorSwiper.style";
import useTitleStore from "@/store/useTitleStore";
import { TITLE_COVER_COLORS } from "@/styles/Theme";

/**
 * 제목 섹션의 배경 색상을 선택할 수 있는 스와이퍼 컴포넌트
 * 색상 원형 버튼들을 나열하고 좌우 버튼으로 색상 변경 가능
 */
const TitleCoverColorSwiper = () => {
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const setTitleCoverColor = useTitleStore((state) => state.setTitleCoverColor);

  const colorKeys = Object.keys(TITLE_COVER_COLORS);
  const currentIndex = colorKeys.indexOf(
    Object.keys(TITLE_COVER_COLORS).find(
      (key) => TITLE_COVER_COLORS[key] === titleCoverColor
    ) || ""
  );

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % colorKeys.length;
    setTitleCoverColor(TITLE_COVER_COLORS[colorKeys[nextIndex]]);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + colorKeys.length) % colorKeys.length;
    setTitleCoverColor(TITLE_COVER_COLORS[colorKeys[prevIndex]]);
  };

  if (!titleCoverColor) return null;

  return (
    <S.SwiperContainer>
      <S.PrevButton onClick={prevSlide} />
      <S.ColorSelectContainer>
        {colorKeys.map((colorKey) => (
          <S.ColorCircleContainer
            key={colorKey}
            onClick={() => setTitleCoverColor(TITLE_COVER_COLORS[colorKey])}
          >
            <S.ColorCircle
              $isSelected={TITLE_COVER_COLORS[colorKey] === titleCoverColor}
              color={TITLE_COVER_COLORS[colorKey]}
            />
          </S.ColorCircleContainer>
        ))}
      </S.ColorSelectContainer>
      <S.NextButton onClick={nextSlide} />
    </S.SwiperContainer>
  );
};

export default TitleCoverColorSwiper;
