import "./index.css";
import {
  API,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
  ToolboxConfig,
  PasteConfig,
  PasteEvent,
} from "@editorjs/editorjs";

export default class GroupImage implements BlockTool {
  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get contentless(): boolean {
    return true;
  }

  private api: API;

  private _CSS: {
    block: string;
    wrapper: string;
    columnWrapper: string;
    groupImage: string;
    imageItem: string;
    caption: string;
  };

  private data: BlockToolData;
  private _element: HTMLDivElement;
  private dragOverIndex: number | null = null;
  private droppedIndex: number | null = null;
  private sourceColumn: string | null = null;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-group-image",
      columnWrapper: "group-image-column",
      groupImage: "group-image-wrapper",
      imageItem: "group-image-item",
      caption: "group-image-caption",
    };

    this.data = data;

    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);

    Object.keys(this.data.images).forEach((colKey) => {
      const columnWrapper = document.createElement("div");
      columnWrapper.classList.add(this._CSS.columnWrapper);

      const imagesArray = this.data.images[colKey];
      if (Array.isArray(imagesArray)) {
        const totalAspectRatio = imagesArray.reduce(
          (sum, img) => sum + img.ratio,
          0
        );

        imagesArray.forEach((imageData, index) => {
          const imageWrapper = document.createElement("div");
          const image = document.createElement("img");

          imageWrapper.classList.add(this._CSS.groupImage);
          image.classList.add(this._CSS.imageItem);
          image.src = imageData.url;
          image.alt = imageData.name;
          image.draggable = true;

          imageWrapper.addEventListener("dragstart", (e) =>
            this.onDragStart(e, colKey, index)
          );
          imageWrapper.addEventListener("dragover", (e) =>
            this.onDragOver(e, colKey, index)
          );
          imageWrapper.addEventListener("drop", (e) =>
            this.onDrop(e, colKey, index)
          );
          imageWrapper.addEventListener(
            "dragleave",
            this.onDragLeave.bind(this)
          );

          const widthPercentage = (imageData.ratio / totalAspectRatio) * 100;
          imageWrapper.style.flexBasis = `${widthPercentage}%`;

          imageWrapper.appendChild(image);
          columnWrapper.appendChild(imageWrapper);
        });
      }

      wrapper.appendChild(columnWrapper);
    });

    return wrapper;
  }

  render(): HTMLDivElement {
    return this._element;
  }

  save(toolsContent: HTMLElement) {
    return this.data;
  }

  updateView() {
    const newElement = this.drawView();
    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  onDragStart(e: DragEvent, colKey: string, index: number): void {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("imgIndex", String(index));
    e.dataTransfer.setData("sourceColumn", colKey);
    this.sourceColumn = colKey;
  }

  onDragOver(e: DragEvent, targetColumn: string, index: number): void {
    e.preventDefault();
    e.stopPropagation();
    this.dragOverIndex = index;
  }

  onDrop(e: DragEvent, targetColumn: string, index: number): void {
    e.preventDefault();

    const sourceIndex = Number(e.dataTransfer?.getData("imgIndex"));
    const sourceColumn = e.dataTransfer?.getData("sourceColumn");

    console.log("sourceIndex", sourceIndex, sourceColumn);

    if (sourceColumn === null || sourceIndex === null) return;

    if (sourceColumn === targetColumn && sourceIndex === index) return;

    const targetImages = [...this.data.images[targetColumn]];
    if (targetImages.length >= 3) {
      return;
    }

    // 원본 컬럼과 대상 컬럼이 다를 때 이미지 이동 처리
    const sourceImages = [...this.data.images[sourceColumn]];
    const [movedImage] = sourceImages.splice(sourceIndex, 1);

    console.log("sourceImages", sourceImages);
    console.log("movedImage", movedImage);

    // 대상 컬럼에 이미지 삽입
    targetImages.splice(index, 0, movedImage);

    console.log("targetImages: ", targetImages);

    // 변경된 컬럼 데이터를 다시 할당
    this.data.images = {
      ...this.data.images,
      [sourceColumn]: sourceImages,
      [targetColumn]: targetImages,
    };

    console.log("this.data.images", this.data.images);

    // 상태 초기화 및 뷰 업데이트
    this.dragOverIndex = null;
    this.droppedIndex = null;

    this.updateView();
  }

  onDragLeave(): void {
    this.dragOverIndex = null;
  }
  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "Group Image",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: [] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}
