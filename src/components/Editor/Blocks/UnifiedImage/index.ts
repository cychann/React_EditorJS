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
  // Static Properties
  static draggedImage: any = null;
  static sourceInstance: UnifiedImage | null = null;
  static sourceIndex: number | null = null;

  // Static Getters
  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get contentless(): boolean {
    return true;
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

  // Instance Properties
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
    this._CSS = this.initializeCSS();
    this._element = this.drawView();
  }

  private initializeCSS() {
    return {
      block: this.api.styles.block,
      wrapper: "ce-unified-image",
      groupImage: "unified-image-wrapper",
      imageItem: "unified-image-item",
      caption: "unified-image-caption",
    };
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    this.renderImages(wrapper);
    wrapper.addEventListener("dragover", this.onDragOverBlock.bind(this));
    wrapper.addEventListener("drop", this.onDropBlock.bind(this));

    return wrapper;
  }

  private renderImages(wrapper: HTMLDivElement): void {
    const images = this.data.images || [];
    const totalAspectRatio = images.reduce(
      (sum: number, img: any) => sum + img.ratio,
      0
    );

    images.forEach((imageData: any, index: number) => {
      const imageWrapper = this.createImageWrapper(
        imageData,
        index,
        totalAspectRatio,
        images.length
      );
      wrapper.appendChild(imageWrapper);
    });
  }

  private createImageWrapper(
    imageData: any,
    index: number,
    totalAspectRatio: number,
    totalImages: number
  ): HTMLDivElement {
    const imageWrapper = document.createElement("div");
    const image = document.createElement("img");

    imageWrapper.classList.add(this._CSS.groupImage);
    imageWrapper.dataset.index = String(index);

    image.classList.add(this._CSS.imageItem);
    image.src = imageData.url;
    image.alt = imageData.name;
    image.draggable = true;

    this.addImageEventListeners(imageWrapper, imageData, index);

    const widthPercentage =
      totalAspectRatio > 0
        ? `${(imageData.ratio / totalAspectRatio) * 100}%`
        : "100%";

    imageWrapper.style.width =
      totalImages === 1 && imageData.width < 800
        ? `${imageData.width}px`
        : widthPercentage;

    imageWrapper.appendChild(image);

    return imageWrapper;
  }

  private addImageEventListeners(
    imageWrapper: HTMLDivElement,
    imageData: any,
    index: number
  ): void {
    imageWrapper.addEventListener("dragstart", (e) =>
      this.onDragStart(e, imageData, index)
    );
    imageWrapper.addEventListener("dragover", (e) => this.onDragOver(e, index));
    imageWrapper.addEventListener("drop", (e) => this.onDrop(e, index));
    imageWrapper.addEventListener("dragleave", this.onDragLeave.bind(this));
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
    if (!targetItem) return;

    if (
      UnifiedImage.sourceInstance &&
      UnifiedImage.sourceInstance === this &&
      UnifiedImage.sourceIndex === index
    ) {
      return;
    }

    const dropType = this.getDropType(e, targetItem);
    let targetElement: HTMLElement | null = targetItem;

    if (dropType === "top" || dropType === "bottom") {
      targetElement = targetItem.parentElement || targetItem;
    }

    if (!targetElement) return;

    switch (dropType) {
      case "top":
        targetElement.classList.add("drag-over-top");
        break;
      case "bottom":
        targetElement.classList.add("drag-over-bottom");
        break;
      case "left":
        targetElement.classList.add("drag-over-left");
        break;
      case "right":
        targetElement.classList.add("drag-over-right");
        break;
    }

    targetItem.dataset.dropType = dropType;
  }

  private getDropType(
    e: DragEvent,
    targetItem: HTMLElement
  ): "top" | "bottom" | "left" | "right" | null {
    const rect = targetItem.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 요소의 중앙 좌표 계산
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // X축과 Y축 거리 계산
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // 절대값으로 더 가까운 방향을 판단
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // 위쪽 또는 아래쪽이 더 가까운 경우
      return deltaY < 0 ? "top" : "bottom";
    } else {
      // 왼쪽 또는 오른쪽이 더 가까운 경우
      return deltaX < 0 ? "left" : "right";
    }
  }

  // onDrop 함수
  async onDrop(e: DragEvent, targetIndex: number): Promise<void> {
    e.preventDefault();
    if (!e.dataTransfer) return;

    const transferData = e.dataTransfer.getData("application/json");
    if (!transferData) return;

    const { sourceIndex, blockIndex } = JSON.parse(transferData);
    const sourceBlock = this.api.blocks.getBlockByIndex(blockIndex);
    const targetItem = e.currentTarget as HTMLElement;

    // 동일한 블록과 동일한 위치에 드롭된 경우 작업 취소
    if (
      UnifiedImage.sourceInstance &&
      UnifiedImage.sourceInstance === this &&
      sourceIndex === targetIndex
    ) {
      return;
    }

    // onDragOver에서 저장한 dropType을 가져옵니다.
    const dropType = targetItem.dataset.dropType as
      | "top"
      | "bottom"
      | "left"
      | "right";

    if (dropType === "top" || dropType === "bottom") {
      // 위나 아래에 드롭된 경우, 새로운 블록을 생성
      await this.onDropNewBlock(dropType);
    } else {
      // 왼쪽/오른쪽으로 드롭된 경우 블록 내 이미지 순서 변경 처리
      const dropPosition = this.getDropPosition(e, targetItem);

      if (UnifiedImage.sourceInstance === this) {
        this.handleInternalDrop(sourceIndex, dropPosition);
      } else if (UnifiedImage.sourceInstance && UnifiedImage.draggedImage) {
        await this.handleExternalDrop(sourceBlock, dropPosition);
      }
    }

    this.clearDragOverEffects();
    this.updateView();

    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;
  }

  private async onDropNewBlock(position: "top" | "bottom"): Promise<void> {
    if (!UnifiedImage.draggedImage || !UnifiedImage.sourceInstance) return;

    const draggedImageData = {
      url: UnifiedImage.draggedImage.url,
      name: UnifiedImage.draggedImage.name,
      ratio: UnifiedImage.draggedImage.ratio,
      width: UnifiedImage.draggedImage.width,
    };

    const newBlockData = { images: [draggedImageData] };

    const currentIndex = this.api.blocks.getCurrentBlockIndex();
    const newBlockIndex = position === "top" ? currentIndex : currentIndex + 1;

    const sourceImages = [...UnifiedImage.sourceInstance.data.images];
    sourceImages.splice(UnifiedImage.sourceIndex!, 1);
    UnifiedImage.sourceInstance.data.images = sourceImages;

    if (sourceImages.length === 0) {
      const sourceBlockIndex = this.api.blocks.getCurrentBlockIndex();
      await this.api.blocks.delete(sourceBlockIndex);
    } else {
      UnifiedImage.sourceInstance.updateView();
    }

    this.api.blocks.insert(
      "unifiedImage",
      newBlockData,
      {},
      newBlockIndex,
      true
    );
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

  private handleInternalDrop(sourceIndex: number, dropPosition: number): void {
    const images = [...this.data.images];
    const [movedImage] = images.splice(sourceIndex, 1);
    images.splice(dropPosition, 0, movedImage);
    this.data.images = images;
  }

  private async handleExternalDrop(
    sourceBlock: any,
    dropPosition: number
  ): Promise<void> {
    const sourceImages = [...UnifiedImage.sourceInstance.data.images];
    const targetImages = [...this.data.images];

    if (targetImages.length < 3) {
      sourceImages.splice(UnifiedImage.sourceIndex!, 1);
      UnifiedImage.sourceInstance.data.images = sourceImages;

      targetImages.splice(dropPosition, 0, UnifiedImage.draggedImage);
      this.data.images = targetImages;

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

  onDragLeave(e: DragEvent): void {
    this.dragOverIndex = null;
    this.clearDragOverEffects();
  }

  clearDragOverEffects(): void {
    // 모든 drag-over-* 클래스를 가진 요소 선택
    const allItems = document.querySelectorAll(
      ".drag-over-left, .drag-over-right, .drag-over-top, .drag-over-bottom"
    );

    allItems.forEach((el) => {
      el.classList.remove(
        "drag-over-left",
        "drag-over-right",
        "drag-over-top",
        "drag-over-bottom"
      );
    });
  }

  onDragOverBlock(e: DragEvent): void {
    e.preventDefault();

    // 만약 드래그된 이미지가 현재 블록에 드롭되려고 한다면, 동작을 무시합니다.
    if (UnifiedImage.sourceInstance && UnifiedImage.sourceInstance === this) {
      return;
    }

    if (this.data.images && this.data.images.length >= 3) {
      e.dataTransfer!.dropEffect = "none";
      return;
    }

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

    // 드래그된 이미지가 동일한 블록에 드롭되려고 한다면 작업을 무시합니다.
    if (UnifiedImage.sourceInstance && UnifiedImage.sourceInstance === this) {
      return;
    }

    if (!UnifiedImage.draggedImage || !UnifiedImage.sourceInstance) return;

    // 다른 블록으로의 드롭만 처리
    this.handleBlockDrop(e);

    this._element.classList.remove("drag-over-empty");

    // 드래그된 이미지 상태 초기화
    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;
  }

  private handleBlockDrop(e: DragEvent): void {
    const images = [...(this.data.images || [])];
    if (images.length < 3) {
      let dropIndex = images.length;

      const items = this._element.querySelectorAll(`.${this._CSS.groupImage}`);
      if (items.length > 0) {
        dropIndex = this.determineDropIndex(e, items);
      }

      images.splice(dropIndex, 0, UnifiedImage.draggedImage);
      this.data.images = images;

      const sourceImages = [...UnifiedImage.sourceInstance.data.images];
      sourceImages.splice(UnifiedImage.sourceIndex!, 1);
      UnifiedImage.sourceInstance.data.images = sourceImages;

      this.updateBlocks();
      UnifiedImage.sourceInstance.updateView();
      this.updateView();
    }
  }

  private determineDropIndex(e: DragEvent, items: NodeListOf<Element>): number {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const rect = item.getBoundingClientRect();
      if (e.clientX < rect.left + rect.width / 2) {
        return i;
      }
    }
    return items.length;
  }

  private updateBlocks(): void {
    const sourceBlock = this.api.blocks.getBlockByIndex(
      this.api.blocks.getCurrentBlockIndex() - 1
    );
    this.api.blocks.update(sourceBlock.id, UnifiedImage.sourceInstance.data);

    const currentBlock = this.api.blocks.getBlockByIndex(
      this.api.blocks.getCurrentBlockIndex()
    );
    this.api.blocks.update(currentBlock.id, this.data);
  }

  updateView(): void {
    const newElement = this.drawView();
    this._element.replaceWith(newElement);
    this._element = newElement;
  }

  save(toolsContent: HTMLElement): BlockToolData {
    return this.data;
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }

  render(): HTMLDivElement {
    return this._element;
  }
}
