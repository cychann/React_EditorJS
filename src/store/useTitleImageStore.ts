import { create } from "zustand";

interface StoreProps {
  titleCoverImage: string | null;
  titleCoverColor: string | null;
  isExpanded: boolean;

  setTitleCoverImage: (image: string | null) => void;
  setTitleCoverColor: (color: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
}

const useTitleImageStore = create<StoreProps>((set) => ({
  titleCoverImage: null,
  titleCoverColor: null,
  isExpanded: false,
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
}));

export default useTitleImageStore;
