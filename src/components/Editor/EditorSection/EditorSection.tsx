import { useEffect, useRef, useState } from "react";
import * as S from "./EditorSection.style";
import EditorToolbar from "@/components/Editor/EditorToolbar/EditorToolbar";
import EditorContent from "@/components/Editor/EditorContent/EditorContent";

/**
 * 에디터의 메인 섹션을 담당하는 컴포넌트
 * 에디터 컨텐츠와 툴바를 포함하며, 스크롤에 따른 툴바 위치 조정을 관리
 */
export default function EditorSection() {
  const editorSectionRef = useRef<HTMLDivElement>(null);
  const [toolbarTop, setToolbarTop] = useState(487);

  useEffect(() => {
    /**
     * 스크롤 이벤트 핸들러
     * 에디터 섹션의 위치에 따라 툴바의 위치를 동적으로 조정
     */
    const handleScroll = () => {
      if (editorSectionRef.current) {
        const rect = editorSectionRef.current.getBoundingClientRect();

        if (rect.top > 0) {
          setToolbarTop(rect.top + 40);
        }

        if (rect.top <= 0) {
          setToolbarTop(40);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.EditorSectionContainer ref={editorSectionRef}>
      <EditorContent />
      <EditorToolbar toolbarTop={toolbarTop} />
    </S.EditorSectionContainer>
  );
}
