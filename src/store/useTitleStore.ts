import { create } from "zustand";

interface StoreProps {
  titleText: string;
  subtitleText: string;
  titleCoverImage: string | null;
  titleCoverColor: string | null;
  isExpanded: boolean;
  alignment: "left" | "center";
  titleFont:
    | "Noto Sans"
    | "Nanum Myeongjo"
    | "Nanum Gothic"
    | "Nanum Barun Gothic"
    | "Helvetica"
    | "Georgia";
  titleColor: string | null;

  setTitleText: (text: string) => void;
  setSubtitleText: (text: string) => void;
  setTitleCoverImage: (image: string | null) => void;
  setTitleCoverColor: (color: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
  setAlignment: (alignment: "left" | "center") => void;
  setTitleFont: (
    font:
      | "Noto Sans"
      | "Nanum Myeongjo"
      | "Nanum Gothic"
      | "Nanum Barun Gothic"
      | "Helvetica"
      | "Georgia"
  ) => void;
  setTitleColor: (color: string | null) => void;
}

const useTitleStore = create<StoreProps>((set) => ({
  titleText: "",
  subtitleText: "",
  titleCoverImage: null,
  titleCoverColor: null,
  isExpanded: false,
  alignment: "left",
  titleFont: "Noto Sans",
  titleColor: null,
  setTitleText: (text) =>
    set({
      titleText: text,
    }),
  setSubtitleText: (text) =>
    set({
      titleText: text,
    }),
  setTitleCoverImage: (image) =>
    set({
      titleCoverImage: image,
      titleCoverColor: null,
    }),
  setTitleCoverColor: (color) =>
    set({
      titleCoverColor: color,
      titleCoverImage: null,
    }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  setAlignment: (alignment) => set({ alignment }),
  setTitleFont: (font) =>
    set({
      titleFont: font,
    }),
  setTitleColor: (color) => set({ titleColor: color }),
}));

export default useTitleStore;
