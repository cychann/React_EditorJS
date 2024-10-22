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
  id: string;
  type: EditorBlockType;
  data: object;
};
