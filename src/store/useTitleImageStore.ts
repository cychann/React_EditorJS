import { create } from "zustand";

interface StoreProps {
  titleCoverImage: string | null;
  isExpanded: boolean;

  setTitleCoverImage: (image: string | null) => void;
  setIsExpanded: (expanded: boolean) => void;
}

const useTitleImageStore = create<StoreProps>((set) => ({
  titleCoverImage: null,
  isExpanded: false,
  setTitleCoverImage: (image) => set({ titleCoverImage: image }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
}));

export default useTitleImageStore;
