import * as S from "./AlignIcon.style";
import useEditorStore from "store/useEditorStore";

/**
 * 텍스트 정렬을 위한 아이콘 컴포넌트
 * 클릭 시 왼쪽 정렬과 가운데 정렬을 토글
 */
export default function AlignIcon() {
  const { editor, align, toggleAlign } = useEditorStore();

  /**
   * 텍스트 정렬 상태를 토글하고 에디터의 블록들을 업데이트하는 함수
   * 1. 전역 정렬 상태를 토글
   * 2. 에디터의 현재 데이터를 저장
   * 3. 정렬 가능한 블록들(paragraph, file, place, emoji, delimiter)의 정렬 상태를 업데이트
   * 4. 변경된 데이터로 에디터를 다시 렌더링
   */
  const handleToggleAlign = async () => {
    toggleAlign();
    if (editor) {
      try {
        const savedData = await editor.save();

        const updatedBlocks = savedData.blocks.map((block) => {
          if (
            ["paragraph", "file", "place", "emoji", "delimiter"].includes(
              block.type
            )
          ) {
            return {
              ...block,
              data: {
                ...block.data,
                align: align === "left" ? "center" : "left", // Toggle alignment
              },
            };
          }
          return block;
        });

        await editor.render({ blocks: updatedBlocks });
      } catch (error) {
        console.error("Error while updating alignment:", error);
      }
    }
  };

  return <S.AlignIcon $align={align} onClick={handleToggleAlign} />;
}
