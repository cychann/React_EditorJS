export type TitleAlignment = "bottom" | "center";

export type TitleFont =
  | "Noto Sans"
  | "Nanum Myeongjo"
  | "Nanum Gothic"
  | "Nanum Barun Gothic"
  | "Helvetica"
  | "Georgia";

export interface TitleStore {
  titleText: string;
  subtitleText: string;
  titleCoverImage: string | null;
  titleCoverColor: string | null;
  hasTitleBackground: boolean;
  isExpanded: boolean;
  alignment: TitleAlignment;
  titleFont: TitleFont;
  titleColor: string | null;

  setTitleText: (text: string) => void;
  setSubtitleText: (text: string) => void;
  setTitleCoverImage: (image: string | null) => void;
  setTitleCoverColor: (color: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
  setAlignment: (alignment: TitleAlignment) => void;
  setTitleFont: (font: TitleFont) => void;
  setTitleColor: (color: string | null) => void;
}
