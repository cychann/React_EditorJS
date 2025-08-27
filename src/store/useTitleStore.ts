import { TitleStore } from "@/types/store/title.types";
import { create } from "zustand";

/**
 * 글의 제목 섹션과 관련된 전역 상태를 관리하는 스토어
 * 제목, 부제목, 커버 이미지/컬러, 폰트 등의 상태와 관련 설정 함수들을 포함
 */
const useTitleStore = create<TitleStore>((set) => ({
  titleText: "",
  subtitleText: "",
  titleCoverImage: null,
  titleCoverColor: null,
  hasTitleBackground: false,
  isExpanded: false,
  alignment: "bottom",
  titleFont: "Noto Sans",
  titleColor: null,
  setTitleText: (text) =>
    set({
      titleText: text,
    }),
  setSubtitleText: (text) =>
    set({
      subtitleText: text,
    }),
  setTitleCoverImage: (image) =>
    set({
      titleCoverImage: image,
      titleCoverColor: null,
      hasTitleBackground: !!image,
    }),
  setTitleCoverColor: (color) =>
    set({
      titleCoverColor: color,
      titleCoverImage: null,
      hasTitleBackground: !!color,
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
