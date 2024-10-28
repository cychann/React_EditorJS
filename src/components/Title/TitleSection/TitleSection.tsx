import * as S from "./TitleSection.style";
import TitleToolbar from "components/Title/TitleToolbar/TitleToolbar";
import TitleInputWrapper from "components/Title/TitleInput/TitleInputWrapper/TitleInputWrapper";
import useTitleStore from "store/useTitleStore";
import TitleCoverColorSwiper from "components/Title/TitleTools/TitleCoverColor/TitleCoverColorSwiper/TitleCoverColorSwiper";
import useEditorStore from "store/useEditorStore";

export default function TitleSection() {
  const titleImage = useTitleStore((state) => state.titleCoverImage);
  const titleCoverColor = useTitleStore((state) => state.titleCoverColor);
  const isTitleImageExpanded = useTitleStore((state) => state.isExpanded);

  const { blokcs } = useEditorStore();

  const checkBlock = () => {
    console.log("blocks", blokcs);
  };

  return (
    <S.TitleSectionWrapper
      $bgImage={titleImage}
      $expanded={isTitleImageExpanded}
      $bgColor={titleCoverColor}
    >
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper>메뉴바</S.TitleMenuWrapper>
        <S.TitleSaveWrapper onClick={checkBlock}>저장</S.TitleSaveWrapper>
      </S.TitleTopWrapper>
      <TitleToolbar />
      <S.TitleBottomWrapper>
        <TitleInputWrapper />
        {titleCoverColor && <TitleCoverColorSwiper />}
      </S.TitleBottomWrapper>
    </S.TitleSectionWrapper>
  );
}
