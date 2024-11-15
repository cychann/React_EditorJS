import React from "react";
import * as S from "./AlignIcon.style";
import EditorJS from "@editorjs/editorjs";
import useEditorStore from "store/useEditorStore";

interface Props {
  editor: React.MutableRefObject<EditorJS | null | undefined>;
}

export default function AlignIcon({ editor }: Props) {
  const { align, toggleAlign } = useEditorStore();

  const handleToggleAlign = async () => {
    toggleAlign();
    if (editor.current) {
      try {
        const savedData = await editor.current.save();

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

        await editor.current.render({ blocks: updatedBlocks });
      } catch (error) {
        console.error("Error while updating alignment:", error);
      }
    }
  };

  return <S.AlignIcon $align={align} onClick={handleToggleAlign} />;
}
