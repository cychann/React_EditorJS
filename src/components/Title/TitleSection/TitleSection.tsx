import * as S from "./TitleSection.style";
import TitleToolbar from "@/components/Title/TitleToolbar/TitleToolbar";
import TitleInputWrapper from "@/components/Title/TitleInput/TitleInputWrapper/TitleInputWrapper";
import TitleCoverColorSwiper from "@/components/Title/TitleTools/TitleCoverColor/TitleCoverColorSwiper/TitleCoverColorSwiper";

import useTitleStore from "@/store/useTitleStore";
import useEditorStore from "@/store/useEditorStore";
import TitleBackground from "@/components/Title/TitleSection/TitleBackground/TitleBackground";

/**
 * 글의 제목 섹션을 담당하는 컴포넌트
 * 제목, 부제목, 커버 이미지/컬러 등을 관리
 */
function TitleSection() {
  /**
   * 저장 버튼 클릭 핸들러
   * Editor.js의 데이터와 제목 섹션의 데이터를 통합하여 저장
   */
  const onClickSave = () => {
    const titleState = useTitleStore.getState();
    const editor = useEditorStore.getState().editor;

    const titleData = {
      titleText: titleState.titleText,
      subtitleText: titleState.subtitleText,
      titleCoverImage: titleState.titleCoverImage,
      imageExpanded: titleState.isExpanded,
      titleCoverColor: titleState.titleCoverColor,
      titleAlignment: titleState.alignment,
      titleFont: titleState.titleFont,
      titleColor: titleState.titleColor,
    };

    // Editor.js의 save 메서드를 호출하여 에디터 데이터와 제목 데이터를 통합
    editor
      ?.save()
      .then((outputData) =>
        console.log("Article data: ", { ...outputData, titleData })
      )
      .catch((error) => console.log("Saving failed: ", error));
  };

  return (
    <TitleBackground>
      {/* 상단 메뉴바 및 저장 버튼 */}
      <S.TitleTopWrapper>
        <S.TitleMenuWrapper> </S.TitleMenuWrapper>
        <S.TitleSaveWrapper id="save-btn" onClick={onClickSave}>
          저장
        </S.TitleSaveWrapper>
      </S.TitleTopWrapper>

      {/* 제목 섹션 도구 모음 */}
      <TitleToolbar />

      {/* 제목 입력 및 커버 이미지/컬러 선택 영역 */}
      <S.TitleBottomWrapper>
        <TitleInputWrapper />
        <TitleCoverColorSwiper />
      </S.TitleBottomWrapper>
    </TitleBackground>
  );
}

export default TitleSection;
