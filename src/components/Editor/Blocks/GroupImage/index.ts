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

        imagesArray.forEach((imageData) => {
          const imageWrapper = document.createElement("div");
          const image = document.createElement("img");
          image.classList.add(this._CSS.imageItem);

          imageWrapper.classList.add(this._CSS.groupImage);
          image.classList.add(this._CSS.imageItem);
          image.src = imageData.url;
          image.alt = imageData.name;
          image.draggable = true;

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
    return this.data.images;
  }

  updateView() {
    const newElement = this.drawView();
    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  onDragStart(e: DragEvent, index: number): void {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("imgIndex", String(index));
  }

  onDragOver(e: DragEvent, index: number): void {
    e.preventDefault();
    e.stopPropagation();
    this.dragOverIndex = index;
  }

  onDrop(e: DragEvent, index: number): void {
    e.preventDefault();

    const sourceIndex = Number(e.dataTransfer?.getData("imgIndex"));

    if (sourceIndex === index) return;

    const updatedImages = [...this.data.images];
    console.log("updatedImages", updatedImages);
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(index, 0, movedImage);

    this.data.images = updatedImages;

    this.dragOverIndex = null;
    this.droppedIndex = index;
    setTimeout(() => {
      this.droppedIndex = null;
    }, 300);

    console.log("this.data", this.data);
    this.updateView();
    console.log("this.data", this.data);
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
