import { create } from "zustand";

interface StoreProps {
  titleCoverImage: string | null;
  titleCoverColor: string | null;
  isExpanded: boolean;
  alignment: "left" | "center";

  setTitleCoverImage: (image: string | null) => void;
  setTitleCoverColor: (color: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
  setAlignment: (alignment: "left" | "center") => void;
}

const useTitleImageStore = create<StoreProps>((set) => ({
  titleCoverImage: null,
  titleCoverColor: null,
  isExpanded: false,
  alignment: "left",
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

export default useTitleImageStore;
