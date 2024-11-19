import * as S from "./TitleSection.style";
import TitleToolbar from "components/Title/TitleToolbar/TitleToolbar";
import TitleInputWrapper from "components/Title/TitleInput/TitleInputWrapper/TitleInputWrapper";
import useTitleStore from "store/useTitleStore";
import TitleCoverColorSwiper from "components/Title/TitleTools/TitleCoverColor/TitleCoverColorSwiper/TitleCoverColorSwiper";
import useEditorStore from "store/useEditorStore";

export default function TitleSection() {
  const {
    titleText,
    subtitleText,
    titleCoverImage,
    titleCoverColor,
    isExpanded,
    alignment,
    titleFont,
    titleColor,
  } = useTitleStore();
  const { editor } = useEditorStore();

  const onClickSave = () => {
    const titleData = {
      titleText: titleText,
      subtitleText: subtitleText,
      titleCoverImage: titleCoverImage,
      imageExpanded: isExpanded,
      titleCoverColor: titleCoverColor,
      titleAlignment: alignment,
      titleFont: titleFont,
      titleColor: titleColor,
    };

    editor
      ?.save()
      .then((outputData) =>
        console.log("Article data: ", { ...outputData, titleData })
      )
      .catch((error) => console.log("Saving failed: ", error));
  };

  return (
    <S.TitleSectionWrapper
      $bgImage={titleCoverImage}
      $expanded={isExpanded}
      $bgColor={titleCoverColor}
    >
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper>메뉴바</S.TitleMenuWrapper>
        <S.TitleSaveWrapper id="save-btn" onClick={onClickSave}>
          저장
        </S.TitleSaveWrapper>
      </S.TitleTopWrapper>
      <TitleToolbar />
      <S.TitleBottomWrapper>
        <TitleInputWrapper />
        {titleCoverColor && <TitleCoverColorSwiper />}
      </S.TitleBottomWrapper>
    </S.TitleSectionWrapper>
  );
}
