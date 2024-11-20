export interface Emoji {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicode_version: string;
  ios_version: string;
  skin_tones?: boolean;
}

export interface EmojiModalProps {
  addBlock: (type: string, data: object) => void;
}
