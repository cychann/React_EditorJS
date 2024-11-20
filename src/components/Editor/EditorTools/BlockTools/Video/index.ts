import "./index.css";
import {
  API,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
  ToolboxConfig,
  PasteConfig,
} from "@editorjs/editorjs";

export default class Video implements BlockTool {
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
    video: string;
    caption: string;
    active: string;
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, api }: BlockToolConstructorOptions) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-video",
      video: "video-wrapper",
      caption: "video-caption",
      active: "ce-video--active",
    };

    this.data = data || { url: "", caption: "" };
    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const video = document.createElement("video");
    const caption = document.createElement("input");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    video.classList.add(this._CSS.video);
    caption.classList.add(this._CSS.caption);

    video.addEventListener("click", (e: Event) => {
      wrapper.classList.add(this._CSS.active);
      this.showCaption(caption);
      document.addEventListener("keydown", this.handleKeyDown);
    });

    document.addEventListener(
      "click",
      (e: Event) => {
        if (!this._element.contains(e.target as Node)) {
          wrapper.classList.remove(this._CSS.active);
          this.hideCaption(caption);
          document.removeEventListener("keydown", this.handleKeyDown);
        }
      },
      true
    );

    caption.addEventListener("input", (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.data.caption = input.value;
    });

    if (this.data && this.data.url) {
      video.src = this.data.url;
      video.controls = true;
      caption.placeholder = "비디오를 설명해보세요";

      if (this.data.caption) {
        caption.value = this.data.caption;
        caption.style.display = "block";
      } else {
        caption.style.display = "none";
      }

      wrapper.appendChild(video);
      wrapper.appendChild(caption);
    }

    return wrapper;
  }

  private showCaption(caption: HTMLInputElement): void {
    caption.style.display = "block";
  }

  private hideCaption(caption: HTMLInputElement): void {
    if (!this.data.caption) {
      caption.style.display = "none";
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const isCaption = e.target instanceof HTMLInputElement;

    if (e.key === "Backspace" && !isCaption) {
      e.preventDefault();
      this.api.blocks.delete();
    }
  };

  render(): HTMLDivElement {
    return this._element;
  }

  save(): BlockToolData {
    return this.data;
  }

  static get toolbox(): ToolboxConfig {
    return {
      icon: "🖼️",
      title: "Video",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["VIDEO"] };
  }

  onPaste(): void {
    this.data = {};
  }
}
