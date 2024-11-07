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

export default class UnifiedImage implements BlockTool {
  static draggedImage: any = null;
  static sourceInstance: UnifiedImage | null = null;
  static sourceIndex: number | null = null;

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
    groupImage: string;
    imageItem: string;
    caption: string;
  };
  private data: BlockToolData;
  private _element: HTMLDivElement;
  private dragOverIndex: number | null = null;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;
    this.data = data || { images: [] };
    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-unified-image",
      groupImage: "unified-image-wrapper",
      imageItem: "unified-image-item",
      caption: "unified-image-caption",
    };

    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);

    const images = this.data.images || [];
    const totalAspectRatio = images.reduce((sum, img) => sum + img.ratio, 0);

    images.forEach((imageData: any, index: number) => {
      const imageWrapper = document.createElement("div");
      const image = document.createElement("img");

      imageWrapper.classList.add(this._CSS.groupImage);
      imageWrapper.dataset.index = String(index);

      image.classList.add(this._CSS.imageItem);
      image.src = imageData.url;
      image.alt = imageData.name;
      image.draggable = true;

      imageWrapper.addEventListener("dragstart", (e) =>
        this.onDragStart(e, imageData, index)
      );
      imageWrapper.addEventListener("dragover", (e) =>
        this.onDragOver(e, index)
      );
      imageWrapper.addEventListener("drop", (e) => this.onDrop(e, index));
      imageWrapper.addEventListener("dragleave", this.onDragLeave.bind(this));

      const widthPercentage =
        totalAspectRatio > 0
          ? `${(imageData.ratio / totalAspectRatio) * 100}%`
          : "100%";

      imageWrapper.style.width =
        images.length === 1 && imageData.width < 800
          ? `${imageData.width}px`
          : widthPercentage;

      imageWrapper.appendChild(image);
      wrapper.appendChild(imageWrapper);
    });

    wrapper.addEventListener("dragover", this.onDragOverBlock.bind(this));
    wrapper.addEventListener("drop", this.onDropBlock.bind(this));

    return wrapper;
  }

  private getDropPosition(e: DragEvent, element: HTMLElement): number {
    const rect = element.getBoundingClientRect();
    const mouseX = e.clientX;
    const elementX = rect.left;
    const elementWidth = rect.width;

    if (mouseX < elementX + elementWidth / 2) {
      const index = parseInt(element.dataset.index || "0");
      return index;
    }
    return parseInt(element.dataset.index || "0") + 1;
  }

  onDragStart(e: DragEvent, imageData: any, index: number): void {
    if (!e.dataTransfer) return;

    e.dataTransfer.effectAllowed = "move";
    UnifiedImage.draggedImage = imageData;
    UnifiedImage.sourceInstance = this;
    UnifiedImage.sourceIndex = index;

    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        imageData,
        sourceIndex: index,
        blockIndex: this.api.blocks.getCurrentBlockIndex(),
      })
    );
  }

  onDragOver(e: DragEvent, index: number): void {
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

  async onDrop(e: DragEvent, targetIndex: number): Promise<void> {
    e.preventDefault();
    if (!e.dataTransfer) return;

    const transferData = e.dataTransfer.getData("application/json");
    if (!transferData) return;

    const { sourceIndex, blockIndex } = JSON.parse(transferData);
    const sourceBlock = this.api.blocks.getBlockByIndex(blockIndex);
    const targetItem = e.currentTarget as HTMLElement;
    const dropPosition = this.getDropPosition(e, targetItem);

    if (UnifiedImage.sourceInstance === this) {
      // Same block drag and drop
      const images = [...this.data.images];
      const [movedImage] = images.splice(sourceIndex, 1);
      images.splice(dropPosition, 0, movedImage);
      this.data.images = images;
    } else if (UnifiedImage.sourceInstance && UnifiedImage.draggedImage) {
      // Different block drag and drop
      const sourceImages = [...UnifiedImage.sourceInstance.data.images];
      const targetImages = [...this.data.images];

      if (targetImages.length < 3) {
        // Remove from source
        sourceImages.splice(UnifiedImage.sourceIndex!, 1);
        UnifiedImage.sourceInstance.data.images = sourceImages;

        // Add to target at the correct position
        targetImages.splice(dropPosition, 0, UnifiedImage.draggedImage);
        this.data.images = targetImages;

        // Update both blocks
        await this.api.blocks.update(sourceBlock.id, {
          ...UnifiedImage.sourceInstance.data,
        });

        const currentBlock = this.api.blocks.getBlockByIndex(
          this.api.blocks.getCurrentBlockIndex()
        );
        await this.api.blocks.update(currentBlock.id, this.data);

        UnifiedImage.sourceInstance.updateView();
      }
    }

    this.clearDragOverEffects();
    this.updateView();

    // Reset static variables
    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;
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

  onDragOverBlock(e: DragEvent): void {
    e.preventDefault();
    if (this.data.images && this.data.images.length >= 3) {
      e.dataTransfer!.dropEffect = "none";
      return;
    }

    // 빈 블록이거나 마지막 이미지 뒤에 드래그하는 경우의 시각적 표시
    const items = this._element.querySelectorAll(`.${this._CSS.groupImage}`);
    this.clearDragOverEffects();

    if (items.length === 0) {
      this._element.classList.add("drag-over-empty");
    } else {
      const lastItem = items[items.length - 1];
      const lastItemRect = lastItem.getBoundingClientRect();
      if (e.clientX > lastItemRect.right) {
        lastItem.classList.add("drag-over-right");
      }
    }
  }

  onDropBlock(e: DragEvent): void {
    e.preventDefault();
    if (!UnifiedImage.draggedImage || !UnifiedImage.sourceInstance) return;

    const images = [...(this.data.images || [])];
    if (images.length < 3) {
      // 드롭 위치 결정
      let dropIndex = images.length; // 기본값은 끝에 추가

      const items = this._element.querySelectorAll(`.${this._CSS.groupImage}`);
      if (items.length > 0) {
        // 기존 이미지들과 비교하여 적절한 위치 찾기
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const rect = item.getBoundingClientRect();
          if (e.clientX < rect.left + rect.width / 2) {
            dropIndex = i;
            break;
          }
        }
      }

      // 선택된 위치에 이미지 삽입
      images.splice(dropIndex, 0, UnifiedImage.draggedImage);
      this.data.images = images;

      // Update source block
      const sourceImages = [...UnifiedImage.sourceInstance.data.images];
      sourceImages.splice(UnifiedImage.sourceIndex!, 1);
      UnifiedImage.sourceInstance.data.images = sourceImages;

      // Update both blocks
      const sourceBlock = this.api.blocks.getBlockByIndex(
        this.api.blocks.getCurrentBlockIndex() - 1
      );
      this.api.blocks.update(sourceBlock.id, UnifiedImage.sourceInstance.data);

      const currentBlock = this.api.blocks.getBlockByIndex(
        this.api.blocks.getCurrentBlockIndex()
      );
      this.api.blocks.update(currentBlock.id, this.data);

      UnifiedImage.sourceInstance.updateView();
      this.updateView();
    }

    this._element.classList.remove("drag-over-empty");
    // Reset static variables
    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;
  }

  updateView(): void {
    const newElement = this.drawView();
    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  save(toolsContent: HTMLElement): BlockToolData {
    return this.data;
  }

  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "Unified Image",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: [] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }

  render(): HTMLDivElement {
    return this._element;
  }
}
