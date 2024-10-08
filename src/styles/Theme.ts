export const DEVICE = {
  tablet: `(max-width: 768px)`,
  laptop: `(max-width: 1024px)`,
};

export const COMMON_THEME = {
  black_primary: "#333333",
  white_primary: "#FFF",
  off_white: "#FAFAFA",
  gray_primary: "#ccc",
  light_gray: "#eee",
  dark_gray: "#666",
  red: "#FF7C60",
  green: "#67CF56",
  text_active: "#00b8b2",
};

type TitleCoverColors = {
  [key: string]: string;
};

export const TITLE_COVER_COLORS: TitleCoverColors = {
  red: "rgb(246, 112, 102)",
  orange: "rgb(248, 151, 46)",
  yellow: "rgb(250, 187, 17)",
  green: "rgb(35, 184, 119)",
  turquoise: "rgb(0, 198, 190)",
  blue: "rgb(80, 161, 195)",
  purple: "rgb(120, 120, 188)",
  mutedBlue: "rgb(83, 107, 130)",
  brown: "rgb(169, 120, 87)",
  black: "rgb(85, 85, 85)",
};
