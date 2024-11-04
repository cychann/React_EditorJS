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
  };

  private data: BlockToolData;

  private _element: HTMLDivElement;

  constructor({ data, config, api }: BlockToolConstructorOptions) {
    console.log(data, config, api);
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-video",
      video: "video-wrapper",
      caption: "video-caption",
    };

    this.data = data;
    this._element = this.drawView();
  }

  drawView(): HTMLDivElement {
    const wrapper = document.createElement("div");
    const video = document.createElement("video");
    const caption = document.createElement("input");

    wrapper.classList.add(this._CSS.wrapper, this._CSS.block);
    video.classList.add(this._CSS.video);
    caption.classList.add(this._CSS.caption);

    if (this.data && this.data.url) {
      video.src = this.data.url;
      video.controls = true;
      caption.placeholder = "비디오를 설명해보세요";
      wrapper.appendChild(video);
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
      title: "Video",
    };
  }

  static get pasteConfig(): PasteConfig {
    return { tags: ["VIDEO"] };
  }

  onPaste(event: PasteEvent): void {
    this.data = {};
  }
}
