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

          if (imagesArray.length === 1) {
            const widthPercentage =
              imageData.width < 800 ? `${imageData.width}px` : "100%";
            imageWrapper.style.width = widthPercentage;
          }

          if (imagesArray.length > 1) {
            const widthPercentage = `${
              (imageData.ratio / totalAspectRatio) * 100
            }%`;
            imageWrapper.style.width = widthPercentage;
          }

          imageWrapper.appendChild(image);
          columnWrapper.appendChild(imageWrapper);
        });
      }

      wrapper.appendChild(columnWrapper);
    });

    return wrapper;
  }

  updateView(): void {
    const newElement = this.drawView();
    this._element.replaceWith(newElement);
    this._element = newElement;

    this._element.classList.add("group-image-animate");

    setTimeout(() => {
      this._element.classList.remove("group-image-animate");
    }, 500);
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

    this.clearDragOverEffects();

    const targetItem = e.currentTarget as HTMLElement;
    if (targetItem) {
      const rect = targetItem.getBoundingClientRect();
      const mouseX = e.clientX;

      if (mouseX < rect.left + rect.width / 2) {
        targetItem.classList.add("drag-over-left");
      } else {
        targetItem.classList.add("drag-over-right");
      }
    }
  }

  onDrop(e: DragEvent, targetColumn: string, index: number): void {
    e.preventDefault();

    const sourceIndex = Number(e.dataTransfer?.getData("imgIndex"));
    const sourceColumn = e.dataTransfer?.getData("sourceColumn");

    // 기본 유효성 검사
    if (sourceColumn === null || sourceIndex === null) return;
    if (sourceColumn === targetColumn && sourceIndex === index) return;

    const sourceImages = [...this.data.images[sourceColumn]];
    const targetImages =
      sourceColumn === targetColumn
        ? sourceImages
        : [...this.data.images[targetColumn]];

    // 이동할 이미지를 sourceImages에서 제거
    const [movedImage] = sourceImages.splice(sourceIndex, 1);

    // 드롭 위치에 따라 adjustedIndex 계산
    const isInsertBefore = (e.currentTarget as HTMLElement).classList.contains(
      "drag-over-left"
    );
    let adjustedIndex = isInsertBefore ? index : index + 1;

    // 같은 컬럼 내에서 이동 시 인덱스 보정
    if (sourceColumn === targetColumn) {
      if (adjustedIndex > sourceIndex) {
        adjustedIndex -= 1; // 이동할 위치가 뒤쪽일 때 보정
      }
      sourceImages.splice(adjustedIndex, 0, movedImage);
    } else {
      // 다른 컬럼으로 이동 시: 대상 컬럼의 최대 요소 수 체크
      if (targetImages.length >= 3) {
        this.clearDragOverEffects();
        return;
      }
      targetImages.splice(adjustedIndex, 0, movedImage);
    }

    // 데이터 갱신
    this.data.images = {
      ...this.data.images,
      [sourceColumn]: sourceImages,
      ...(sourceColumn !== targetColumn && { [targetColumn]: targetImages }),
    };

    this.clearDragOverEffects();
    this.updateView();
  }

  onDragLeave(e: DragEvent): void {
    this.dragOverIndex = null;

    this.clearDragOverEffects();
  }

  clearDragOverEffects(): void {
    const allItems = this._element.querySelectorAll(`.${this._CSS.groupImage}`);
    allItems.forEach((el) => {
      el.classList.remove("drag-over-left", "drag-over-right");
    });
  }

  render(): HTMLDivElement {
    return this._element;
  }

  save(toolsContent: HTMLElement) {
    return this.data;
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
