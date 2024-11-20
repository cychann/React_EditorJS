import "./index.css";
import {
  API,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
  ToolboxConfig,
  PasteConfig,
} from "@editorjs/editorjs";

export default class UnifiedImage implements BlockTool {
  // Static Properties
  static draggedImage: any = null;
  static sourceInstance: UnifiedImage | null = null;
  static sourceIndex: number | null = null;
  static activeImageBlock: UnifiedImage | null = null;

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
    imageWrapper: string;
    wrapper: string;
    groupImage: string;
    imageItem: string;
    caption: string;
  };
  private data: BlockToolData;
  private _element: HTMLDivElement;
  private activateCaption: boolean;

  constructor({ data, api }: BlockToolConstructorOptions) {
    this.api = api;
    this.data = data || { images: [], caption: "" };
    this._CSS = this.initializeCSS();
    this._element = this.drawView();
    this.activateCaption = !!this.data.caption;
  }

  private initializeCSS() {
    return {
      block: this.api.styles.block,
      imageWrapper: "ce-unified-image-wrapper",
      wrapper: "ce-unified-image",
      groupImage: "unified-image-wrapper",
      imageItem: "unified-image-item",
      caption: "unified-image-caption",
    };
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);

    wrapper.addEventListener("dragover", this.onDragOverBlock.bind(this));
    wrapper.addEventListener("drop", this.onDropBlock.bind(this));

    const blockWrapper = document.createElement("div");
    blockWrapper.classList.add(this._CSS.imageWrapper);
    this.renderImages(blockWrapper);

    const caption = document.createElement("input");
    caption.classList.add(this._CSS.caption);
    caption.placeholder = "이미지를 설명해보세요";
    caption.value = this.data.caption || "";

    caption.addEventListener("input", (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.data.caption = input.value;
    });

    this.updateCaptionVisibility(caption);

    blockWrapper.addEventListener("click", () => {
      this.handleBlockClick(caption);
    });

    document.addEventListener(
      "click",
      (e: Event) => {
        if (!this._element.contains(e.target as Node)) {
          wrapper.classList.remove("active");

          caption.value === ""
            ? this.hideCaption(caption)
            : this.showCaption(caption);
        }
      },
      true
    );

    wrapper.appendChild(blockWrapper);
    wrapper.appendChild(caption);

    return wrapper;
  }

  private updateCaptionVisibility(caption: HTMLInputElement) {
    const shouldShowCaption =
      this.data.caption ||
      (UnifiedImage.activeImageBlock === this && this.activateCaption);

    shouldShowCaption ? this.showCaption(caption) : this.hideCaption(caption);
  }

  private handleBlockClick(caption: HTMLInputElement) {
    if (
      UnifiedImage.activeImageBlock &&
      UnifiedImage.activeImageBlock !== this
    ) {
      UnifiedImage.activeImageBlock.deactivate();
    }

    UnifiedImage.activeImageBlock = this;
    this.activateCaption = true;
    this._element.classList.add("active");
    this.updateCaptionVisibility(caption);
  }

  private deactivate() {
    this.activateCaption = false;
    if (this._element) {
      this._element.classList.remove("active");
    }
    // this.updateView();
  }

  private showCaption(caption: HTMLElement): void {
    this.activateCaption = true;
    caption.style.display = "block";
  }

  private hideCaption(caption: HTMLElement): void {
    this.activateCaption = false;
    caption.style.display = "none";
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

    if (UnifiedImage.activeImageBlock) {
      UnifiedImage.activeImageBlock.deactivate();
      UnifiedImage.activeImageBlock = null;
    }
  }

  onDragOver(e: DragEvent, index: number): void {
    e.preventDefault();
    e.stopPropagation();

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

  async onDrop(e: DragEvent, targetIndex: number): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
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
    const droppedBlockIndex =
      dropType === "bottom"
        ? this.api.blocks.getCurrentBlockIndex() + 1
        : this.api.blocks.getCurrentBlockIndex();

    if (dropType === "top" || dropType === "bottom") {
      this.onDropNewBlock(dropType, blockIndex, targetIndex, droppedBlockIndex);
    } else {
      const dropPosition = this.getDropPosition(e, targetItem);

      if (UnifiedImage.sourceInstance === this) {
        this.handleInternalDrop(sourceIndex, dropPosition);
      } else if (UnifiedImage.sourceInstance && UnifiedImage.draggedImage) {
        await this.handleExternalDrop(sourceBlock, blockIndex, dropPosition);
      }
    }

    this.clearDragOverEffects();
    this.updateView();

    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;
  }

  private onDropNewBlock(
    position: "top" | "bottom",
    blockIndex: number,
    droppedTargetIndex: number,
    droppedBlockIndex: number
  ): void {
    // Step 1: 이미지 이동 여부 및 필수 데이터 체크

    // 1-1: 기존 드래그 요소가 있는지 확인
    if (!UnifiedImage.draggedImage || !UnifiedImage.sourceInstance) return;
    // 1-2: 같은 이미지에 드래그 앤 드롭을 했을 때
    if (
      blockIndex === droppedBlockIndex &&
      UnifiedImage.sourceIndex === droppedTargetIndex
    )
      return;
    // 1-3: 한줄에 이미지 한개인 요소를, 위 혹은 아래로 드래그 했는데, 위치 변동이 없어야할 때
    if (
      UnifiedImage.sourceInstance.data.images.length === 1 &&
      position === "top" &&
      blockIndex === droppedBlockIndex - 1
    )
      return;
    if (
      UnifiedImage.sourceInstance.data.images.length === 1 &&
      position === "bottom" &&
      blockIndex === droppedBlockIndex + 1
    )
      return;

    // Step 2: 드래그된 이미지를 새로운 데이터로 준비
    const draggedImageData = {
      url: UnifiedImage.draggedImage.url,
      name: UnifiedImage.draggedImage.name,
      ratio: UnifiedImage.draggedImage.ratio,
      width: UnifiedImage.draggedImage.width,
    };

    // Step 3: 원본 블록에서 이미지 제거 (불변성 유지)
    const updatedImages = [...UnifiedImage.sourceInstance.data.images];
    updatedImages.splice(UnifiedImage.sourceIndex!, 1);
    UnifiedImage.sourceInstance.data.images = updatedImages;

    // Step 4: 새로운 블록 생성 및 삽입
    const newBlockData = { images: [draggedImageData] };
    this.api.blocks.insert(
      "unifiedImage",
      newBlockData,
      {},
      droppedBlockIndex,
      true
    );

    // Step 5: 원본 블록이 비었으면 삭제, 비어있지 않으면 업데이트
    if (updatedImages.length === 0) {
      const blockToDeleteIndex =
        blockIndex > droppedBlockIndex ? blockIndex + 1 : blockIndex;
      this.api.blocks.delete(blockToDeleteIndex);
    } else if (UnifiedImage.sourceInstance) {
      // 원본 블록이 남아 있는 경우 업데이트
      UnifiedImage.sourceInstance.updateView();
    }

    // Step 6: 드래그 관련 상태 초기화 (가장 마지막에 수행)
    UnifiedImage.draggedImage = null;
    UnifiedImage.sourceInstance = null;
    UnifiedImage.sourceIndex = null;

    this.updateView();
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

    this.updateView();
  }

  private async handleExternalDrop(
    sourceBlock: any,
    blockIndex: number,
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

      if (sourceImages.length === 0) {
        this.api.blocks.delete(blockIndex);
      }
    }

    this.updateView();
  }

  onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
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
    e.stopPropagation();

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

    this.updateView();
  }

  onDropBlock(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

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
    this.updateView();
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

  save(): BlockToolData {
    return this.data;
  }

  onPaste(): void {
    this.data = {};
  }

  render(): HTMLDivElement {
    return this._element;
  }
}
