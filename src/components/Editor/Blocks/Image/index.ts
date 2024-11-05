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

export default class Image implements BlockTool {
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
    image: string;
    caption: string;
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-image",
      image: "image-wrapper",
      caption: "image-caption",
    };

    this.data = data;
    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const image = document.createElement("img");
    const caption = document.createElement("input");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    image.classList.add(this._CSS.image);
    caption.classList.add(this._CSS.caption);

    if (this.data && this.data.url) {
      image.src = this.data.url;
      image.alt = "Image";
      caption.placeholder = "이미지를 설명해보세요";
      wrapper.appendChild(image);
      wrapper.appendChild(caption);
    }

    return wrapper;
  }

  render(): HTMLDivElement {
    return this._element;
  }

  save(toolsContent: HTMLElement): BlockToolData {
    return {
      url: this.data.url, //
    };
  }

  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "Image",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["IMG"] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}
