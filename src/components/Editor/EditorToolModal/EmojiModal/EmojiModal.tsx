import * as S from "./EmojiModal.style";
import useEditorStore from "store/useEditorStore";
import emojiData from "assets/data/emoji.json";
import { useEffect, useState } from "react";

type Emoji = {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicode_version: string;
  ios_version: string;
  skin_tones?: boolean;
};

interface EmojiIconProps {
  addBlock: (type: string, data: object) => void;
}

const EmojiModal: React.FC<EmojiIconProps> = ({ addBlock }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 150;

  const { closeModal } = useEditorStore();

  const handleEmojiClick = (emojiData: Emoji) => {
    addBlock("emoji", {
      emoji: emojiData.emoji,
    });
    closeModal();
  };

  useEffect(() => {
    setEmojis(emojiData as Emoji[]);
  }, []);

  const paginatedEmojis = emojis.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  return (
    <S.EmojiModalWrapper>
      <S.EmojiListWrapper>
        {paginatedEmojis.map((emoji, index) => (
          <S.EmojiItem key={index} onClick={() => handleEmojiClick(emoji)}>
            <span>{emoji.emoji}</span>
          </S.EmojiItem>
        ))}
      </S.EmojiListWrapper>

      <S.PaginationWrapper>
        <S.PaginationButton
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          이전
        </S.PaginationButton>
        <S.PaginationButton
          disabled={(page + 1) * ITEMS_PER_PAGE >= emojis.length}
          onClick={() => setPage(page + 1)}
        >
          다음
        </S.PaginationButton>
      </S.PaginationWrapper>
    </S.EmojiModalWrapper>
  );
};

export default EmojiModal;
