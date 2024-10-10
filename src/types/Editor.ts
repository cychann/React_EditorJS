export type EditorBlockType =
  | "text"
  | "image"
  | "groupImage"
  | "video"
  | "link"
  | "place"
  | "emoji"
  | "line"
  | "align";

export type EditorElement = {
  id: number;
  type: EditorBlockType;
  data: string;
};
