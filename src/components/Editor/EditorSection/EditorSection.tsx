import { useRef } from "react";
import * as S from "./EditorSection.style";
import EditorToolbar from "@/components/Editor/EditorToolbar/EditorToolbar";
import EditorContent from "@/components/Editor/EditorContent/EditorContent";

/**
 * 에디터의 메인 섹션을 담당하는 컴포넌트
 * 에디터 컨텐츠와 툴바를 포함하며, 스크롤에 따른 툴바 위치 조정을 관리
 */
export default function EditorSection() {
  const editorSectionRef = useRef<HTMLDivElement>(null);

  return (
    <S.EditorSectionContainer ref={editorSectionRef}>
      <EditorContent />
      <EditorToolbar editorSectionRef={editorSectionRef} />
    </S.EditorSectionContainer>
  );
}
