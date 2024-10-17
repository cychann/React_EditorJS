export type EditorBlockType =
  | "text"
  | "image"
  | "groupImage"
  | "video"
  | "file"
  | "place"
  | "emoji"
  | "line"
  | "align";

export type EditorElement = {
  id: number;
  type: EditorBlockType;
  data: object;
};
