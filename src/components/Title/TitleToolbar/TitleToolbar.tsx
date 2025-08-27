import * as S from "./TitleToolbar.style";
import TitleCoverImageTool from "@/components/Title/TitleTools/TitleCoverImageTool/TitleCoverImageTool";
import TitleCoverImageActiveTool from "@/components/Title/TitleTools/TitleCoverImageActiveTool/TitleCoverImageActiveTool";
import TitleCoverColorIcon from "components/Title/TitleTools/TitleCoverColor/TitleCoverColorIcon/TitleCoverColorIcon";
import TitleAlignTool from "components/Title/TitleTools/TitleAlignTool/TitleAlignTool";

/**
 * 제목 섹션의 도구 모음 컴포넌트
 * 커버 이미지, 커버 컬러, 정렬 등의 도구들을 포함
 */
export default function TitleToolbar() {
  return (
    <S.TitleToolbarWrapper>
      {/* 커버 이미지 업로드 도구 */}
      <TitleCoverImageTool />

      {/* 커버 이미지가 없을 때만 커버 컬러 선택 도구 표시 */}
      <TitleCoverColorIcon />

      {/* 제목 텍스트 정렬 도구 */}
      <TitleAlignTool />

      {/* 커버 이미지가 있을 때만 이미지 관련 추가 도구 표시 */}
      <TitleCoverImageActiveTool />
    </S.TitleToolbarWrapper>
  );
}
