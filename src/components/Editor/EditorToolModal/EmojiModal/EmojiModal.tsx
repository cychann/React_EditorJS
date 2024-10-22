import * as S from "./EmojiModal.style";
import useEditorStore from "store/useEditorStore";
import EmojiPicker from "emoji-picker-react";

export default function EmojiModal() {
  const { addBlock, setActiveModal } = useEditorStore();

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    addBlock("emoji", {
      emoji: emojiData.emoji,
    });
    addBlock("text");
    setActiveModal(null);
  };

  return (
    <S.EmojiModalWrapper>
      <EmojiPicker
        width="100%"
        style={{ borderRadius: "0" }}
        onEmojiClick={handleEmojiClick}
      />
    </S.EmojiModalWrapper>
  );
}
