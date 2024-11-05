import React from "react";
import * as S from "./AlignIcon.style";
import EditorJS from "@editorjs/editorjs";

interface Props {
  editor: React.MutableRefObject<EditorJS | null | undefined>;
}

export default function AlignIcon({ editor }: Props) {
  const handleToggleAlign = async () => {
    if (editor.current) {
      try {
        const savedData = await editor.current.save();

        const updatedBlocks = savedData.blocks.map((block) => {
          if (
            ["paragraph", "file", "place", "emoji", "delimiter"].includes(
              block.type
            )
          ) {
            const currentAlignment = block.data?.align || "left";
            let newAlignment;

            switch (currentAlignment) {
              case "left":
                newAlignment = "center";
                break;
              case "center":
                newAlignment = "left";
                break;
              default:
                newAlignment = "left";
                break;
            }

            return {
              ...block,
              data: {
                ...block.data,
                align: newAlignment,
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

  return <S.AlignIcon onClick={handleToggleAlign} />;
}
