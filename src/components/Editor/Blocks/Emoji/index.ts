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

export default class Emoji implements BlockTool {
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
    emoji: string;
    emojiIcon: string;
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-emoji",
      emoji: "emoji-wrapper",
      emojiIcon: "emoji-icon",
    };

    this.data = {
      ...data,
      align: data.align || "left",
    };

    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const emoji = document.createElement("div");
    const emojiIcon = document.createElement("div");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    emoji.classList.add(this._CSS.emoji);
    emojiIcon.classList.add(this._CSS.emojiIcon);

    if (this.data) {
      emojiIcon.innerText = this.data.emoji;
      emoji.appendChild(emojiIcon);
      wrapper.appendChild(emoji);
    }

    this.applyAlignment(emoji);

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
      emoji: this.data.emoji,
      align: this.data.align,
    };
  }

  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "emoji",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["EMOJI"] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}
