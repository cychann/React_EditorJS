import React from "react";
import * as S from "./AlignIcon.style";
import EditorJS from "@editorjs/editorjs";
import useEditorStore from "store/useEditorStore";

export default function AlignIcon() {
  const { editor, align, toggleAlign } = useEditorStore();

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
