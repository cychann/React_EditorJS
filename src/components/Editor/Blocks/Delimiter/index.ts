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

export default class Delimiter implements BlockTool {
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
    delimiter: string;
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    console.log(data, config, api);
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-delimiter",
      delimiter: "delimiter",
    };

    this.data = data;
    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const delimiter = document.createElement("hr");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    delimiter.classList.add(this._CSS.delimiter);

    if (this.data) {
      delimiter.style.backgroundImage = `url(${this.data.url})`;
      delimiter.style.backgroundPosition = this.data.imagePosition;
      wrapper.appendChild(delimiter);
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
      title: "delimiter",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["HR"] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}
