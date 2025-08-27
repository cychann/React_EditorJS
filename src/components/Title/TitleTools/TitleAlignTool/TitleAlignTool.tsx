import { TitleAlignment } from "@/types/store/title.types";
import * as S from "./TitleAlignTool.style";
import useTitleStore from "@/store/useTitleStore";

/**
 * 제목 섹션의 텍스트 정렬 도구 컴포넌트
 * 제목 텍스트의 수직 정렬(하단/중앙)을 토글하는 기능 제공
 */
export default function TitleAlignTool() {
  const hasTitleBackground = useTitleStore((state) => state.hasTitleBackground);

  const titleAlign = useTitleStore((state) => state.alignment);
  const setTitleAlign = useTitleStore((state) => state.setAlignment);

  const handleTitleAlign = (alignType: TitleAlignment) => {
    setTitleAlign(alignType);
  };
  return (
    <>
      {titleAlign === "bottom" && (
        <S.AlignBottomIcon
          onClick={() => handleTitleAlign("center")}
          $hasCoverBg={hasTitleBackground}
        />
      )}
      {titleAlign === "center" && (
        <S.AlignCenterIcon
          onClick={() => handleTitleAlign("bottom")}
          $hasCoverBg={hasTitleBackground}
        />
      )}
    </>
  );
}
