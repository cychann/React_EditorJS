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

export default class Place implements BlockTool {
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
    place: string;
    placeContainer: string;
    placeIcon: string;
    placeTextWrapper: string;
    placeName: string;
    placeAddress: string;
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-place",
      place: "place-wrapper",
      placeContainer: "place-container",
      placeIcon: "place-icon",
      placeTextWrapper: "place-text-wrapper",
      placeName: "place-name",
      placeAddress: "place-address",
    };

    this.data = {
      ...data,
      align: data.align || "left",
    };

    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const place = document.createElement("div");
    const placeContainer = document.createElement("div");
    const placeIcon = document.createElement("div");
    const placeTextWrapper = document.createElement("div");
    const placeName = document.createElement("p");
    const placeAddress = document.createElement("p");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    place.classList.add(this._CSS.place);
    placeContainer.classList.add(this._CSS.placeContainer);
    placeIcon.classList.add(this._CSS.placeIcon);
    placeTextWrapper.classList.add(this._CSS.placeTextWrapper);
    placeName.classList.add(this._CSS.placeName);
    placeAddress.classList.add(this._CSS.placeAddress);

    if (this.data) {
      placeName.innerText = this.data.name;
      placeAddress.innerText = this.data.address;
      placeTextWrapper.appendChild(placeName);
      placeTextWrapper.appendChild(placeAddress);
      placeContainer.appendChild(placeIcon);
      placeContainer.appendChild(placeTextWrapper);
      place.appendChild(placeContainer);
      wrapper.appendChild(place);
    }

    this.applyAlignment(place);

    return wrapper;
  }

  applyAlignment(element: HTMLDivElement) {
    element.classList.remove("align-left", "align-center");

    if (this.data.align === "center") {
      element.classList.add("align-center");
    }

    if (this.data.align === "left") {
      element.classList.add("align-left");
    }
  }

  render(): HTMLDivElement {
    return this._element;
  }

  save(toolsContent: HTMLElement): BlockToolData {
    return {
      url: this.data.url,
      id: this.data.id,
      address: this.data.address,
      name: this.data.name,
      align: this.data.align,
    };
  }

  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "place",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["DIV"] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}