import { useEffect, useState } from "react";
import * as S from "./EmojiModal.style";
import useEditorStore from "@/store/useEditorStore";
import emojiData from "@/assets/data/emoji.json";
import { Emoji } from "@/types/components/emoji.types";

interface EmojiIconProps {
  addBlock: (type: string, data: object) => void;
}

/**
 * 이모지 선택을 위한 모달 컴포넌트
 * 페이지네이션이 적용된 이모지 목록을 제공하고 선택한 이모지를 에디터에 추가
 */

export default function EmojiModal({ addBlock }: EmojiIconProps) {
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
}
