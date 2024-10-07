import { create } from "zustand";

interface StoreProps {
  titleText: string;
  subtitleText: string;
  titleCoverImage: string | null;
  titleCoverColor: string | null;
  isExpanded: boolean;
  alignment: "left" | "center";

  setTitleText: (text: string) => void;
  setSubtitleText: (text: string) => void;
  setTitleCoverImage: (image: string | null) => void;
  setTitleCoverColor: (color: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
  setAlignment: (alignment: "left" | "center") => void;
}

const useTitleStore = create<StoreProps>((set) => ({
  titleText: "",
  subtitleText: "",
  titleCoverImage: null,
  titleCoverColor: null,
  isExpanded: false,
  alignment: "left",
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
}));

export default useTitleStore;
