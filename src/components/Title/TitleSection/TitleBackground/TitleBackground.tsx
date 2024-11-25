import * as S from "./TitleBackground.style";
import useTitleStore from "@/store/useTitleStore";

function TitleBackground({ children }: { children: React.ReactNode }) {
  const titleCoverImage = useTitleStore((state) => state.titleCoverImage);
  const isExpanded = useTitleStore((state) => state.isExpanded);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);

  return (
    <S.TitleSectionWrapper
      $bgImage={titleCoverImage}
      $expanded={isExpanded}
      $bgColor={titleCoverColor}
    >
      {children}
    </S.TitleSectionWrapper>
  );
}

export default TitleBackground;
