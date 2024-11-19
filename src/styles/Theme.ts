/**
 * 프로젝트의 테마 상수 정의
 * 반응형 디바이스 크기, 공통 색상, 제목 커버 색상, 제목 텍스트 색상 등을 포함
 */

export const COMMON_THEME = {
  primary: "#00c6be",
  black_primary: "#333333",
  white_primary: "#FFF",
  off_white: "#FAFAFA",
  gray_primary: "#ccc",
  light_gray: "#eee",
  medium_gray: "#909090",
  dark_gray: "#666",
  red: "#FF7C60",
  green: "#67CF56",
  text_active: "#00b8b2",
  modal_border_color: "#d9d9d9",
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

export const TITLE_TEXT_COLORS = {
  black: "#333333",
  gray: "#959595",
  steel_blue: "#536b82",
  light_bluePurple: "#6c7ce0",
  medium_bluePurple: "#5c5cb2",
  dark_blueGray: "#384654",
  bright_blue: "#2e84b6",
  green: "#16b06d",
  olive_green: "#769650",
  teal: "#029d98",
  orange: "#f37b06",
  golden_brown: "#c4890d",
  bright_orange: "#f6665b",
  accent_red: "#ec4c6a",
  brown: "#aa724c",
};
