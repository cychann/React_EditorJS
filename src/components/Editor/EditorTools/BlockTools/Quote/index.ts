import "./index.css";

import { IconAlignLeft, IconAlignCenter, IconQuote } from "@codexteam/icons";
import { make } from "@editorjs/dom";
import type { API, BlockAPI, BlockTool, ToolConfig } from "@editorjs/editorjs";
import { MenuConfig } from "@editorjs/editorjs/types/tools";

export interface QuoteConfig extends ToolConfig {
  defaultType: QuoteType;
}

export interface QuoteData {
  text: string;
  type: QuoteType;
}

interface QuoteParams {
  data: QuoteData;
  config: QuoteConfig;
  api: API;
  readOnly: boolean;
  block: BlockAPI;
}

interface QuoteCSS {
  baseClass: string;
  wrapper: string;
  input: string;
  text: string;
}

enum QuoteType {
  Type1 = "type1",
  Type2 = "type2",
  Type3 = "type3",
}

export default class Quote implements BlockTool {
  api: API;
  readOnly: boolean;

  private _block: BlockAPI;
  private _data: QuoteData;
  private _CSS: QuoteCSS;
  private _quoteElement: HTMLElement; // 인용구 블록을 참조할 수 있도록 인스턴스 변수 추가

  constructor({ data, config, api, readOnly, block }: QuoteParams) {
    const { DEFAULT_TYPE } = Quote;

    this.api = api;
    this.readOnly = readOnly;

    this._data = {
      text: data.text || "",
      type:
        (Object.values(QuoteType).includes(data.type as QuoteType) &&
          data.type) ||
        config.defaultType ||
        DEFAULT_TYPE,
    };
    this._CSS = {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
    };
    this._block = block;
  }

  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get toolbox() {
    return {
      icon: IconQuote,
      title: "인용구",
    };
  }

  static get contentless(): boolean {
    return true;
  }

  static get enableLineBreaks(): boolean {
    return true;
  }

  static get DEFAULT_TYPE(): QuoteType {
    return QuoteType.Type1;
  }

  static get conversionConfig() {
    return {
      import: "text",

      export: function (quoteData: QuoteData): string {
        return quoteData.text;
      },
    };
  }

  get CSS(): QuoteCSS {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
    };
  }

  get settings(): { name: QuoteType; label: string }[] {
    return [
      {
        name: QuoteType.Type1,
        label: "인용구1",
      },
      {
        name: QuoteType.Type2,
        label: "인용구2",
      },
      {
        name: QuoteType.Type3,
        label: "인용구3",
      },
    ];
  }

  render(): HTMLElement {
    const container = make("div", [this._CSS.baseClass, this._CSS.wrapper]);
    this._quoteElement = make(
      "blockquote",
      [this._CSS.input, this._CSS.text, this.getTypeClass(this._data.type)],
      {
        contentEditable: !this.readOnly,
        innerHTML: this._data.text,
      }
    );

    this._quoteElement.addEventListener("keydown", (event: KeyboardEvent) =>
      this.handleKeydown(event)
    );

    container.appendChild(this._quoteElement);
    return container;
  }

  get currentItem(): HTMLElement {
    let currentNode = window.getSelection()!.anchorNode;

    if (currentNode!.nodeType !== Node.ELEMENT_NODE) {
      currentNode = currentNode!.parentNode;
    }

    return (currentNode as Element).closest(`.${this.CSS.text}`) as HTMLElement;
  }

  handleKeydown(event: KeyboardEvent) {
    const currentItem = this._quoteElement;

    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        this.getOutOfQuote();
      }
    }

    if (
      event.key === "Backspace" &&
      currentItem.textContent?.trim().length === 0
    ) {
      event.preventDefault();

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      this.api.blocks.delete(currentBlockIndex);
      this.api.blocks.insert("paragraph", { text: "" });
      this.api.caret.setToBlock(currentBlockIndex);

      return;
    }
  }

  getOutOfQuote() {
    this.api.blocks.insert();
    this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex());
  }

  getTypeClass(type: QuoteType): string {
    switch (type) {
      case QuoteType.Type1:
        return "blockquote_type1";
      case QuoteType.Type2:
        return "blockquote_type2";
      case QuoteType.Type3:
        return "blockquote_type3";
      default:
        return "blockquote_type1";
    }
  }

  save(quoteElement: HTMLDivElement): QuoteData {
    const text = quoteElement.querySelector(`.${this._CSS.text}`);

    return Object.assign(this._data, {
      text: text?.innerHTML ?? "",
    });
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      },
    };
  }

  renderSettings(): HTMLElement | MenuConfig {
    return this.settings.map((item) => ({
      icon: null, // 아이콘이 필요 없으므로 null로 설정
      label: this.api.i18n.t(item.label),
      onActivate: () => this._toggleTune(item.name),
      isActive: this._data.type === item.name,
      closeOnActivate: true,
    }));
  }

  _toggleTune(tune: QuoteType) {
    this._data.type = tune;

    // 타입 변경에 따라 클래스 업데이트
    if (this._quoteElement) {
      // 기존 타입 클래스 제거
      this._quoteElement.classList.remove(
        "blockquote_type1",
        "blockquote_type2",
        "blockquote_type3"
      );

      // 새 타입 클래스 추가
      this._quoteElement.classList.add(this.getTypeClass(tune));
    }

    // 업데이트된 스타일을 반영하기 위해 블록을 갱신
    this._block.dispatchChange();
  }
}
