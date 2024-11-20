export type FontType =
  | "NotoSans"
  | "NanumMyeongjo"
  | "NanumGothic"
  | "NanumBarunGothic"
  | "Helvetica"
  | "Georgia";

export interface FontOption {
  value: FontType;
  label: string;
}

// 상수도 여기에 함께 정의할 수 있습니다
export const FONT_OPTIONS: FontOption[] = [
  { value: "NotoSans", label: "본고딕" },
  { value: "NanumMyeongjo", label: "나눔명조" },
  { value: "NanumGothic", label: "나눔고딕" },
  { value: "NanumBarunGothic", label: "나눔바른고딕" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Georgia", label: "Georgia" },
];
