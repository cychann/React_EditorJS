import { create } from "zustand";

interface StoreProps {
  titleCoverImage: string | null;
  setTitleCoverImage: (image: string | null) => void;
}

const useTitleImageStore = create<StoreProps>((set) => ({
  titleCoverImage: null,
  setTitleCoverImage: (image) => set({ titleCoverImage: image }),
}));

export default useTitleImageStore;
