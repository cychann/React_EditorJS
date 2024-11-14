/**
 * Build styles
 */
import "./index.css";

import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
} from "@codexteam/icons";
import { API, BlockTune, PasteEvent } from "@editorjs/editorjs";

export interface HeaderData {
  text: string;
  level: number;
}

export interface HeaderConfig {
  placeholder?: string;
  levels?: number[];
  defaultLevel?: number;
}

interface Level {
  number: number;
  tag: string;
  svg: string;
}

interface ConstructorArgs {
  data: HeaderData | {};
  config: HeaderConfig;
  api: API;
  readOnly: boolean;
}

export default class Header {
  private api: API;
  private readOnly: boolean;
  private _settings: HeaderConfig;
  private _data: HeaderData;
  private _element: HTMLHeadingElement;

  constructor({ data, config, api, readOnly }: ConstructorArgs) {
    this.api = api;
    this.readOnly = readOnly;
    this._settings = config;
    this._data = this.normalizeData(data);
    this._element = this.getTag();
  }

  private get _CSS() {
    return {
      block: this.api.styles.block,
      wrapper: "ce-header",
    };
  }

  isHeaderData(data: any): data is HeaderData {
    return (data as HeaderData).text !== undefined;
  }

  normalizeData(data: HeaderData | {}): HeaderData {
    const newData: HeaderData = { text: "", level: this.defaultLevel.number };

    if (this.isHeaderData(data)) {
      newData.text = data.text || "";

      if (data.level !== undefined && !isNaN(parseInt(data.level.toString()))) {
        newData.level = parseInt(data.level.toString());
      }
    }

    return newData;
  }

  render(): HTMLHeadingElement {
    return this._element;
  }

  renderSettings(): BlockTune[] {
    return this.levels.map((level) => ({
      icon: level.svg,
      label: this.api.i18n.t(`제목 ${level.number}`),
      onActivate: () => this.setLevel(level.number),
      closeOnActivate: true,
      isActive: this.currentLevel.number === level.number,
      render: () => document.createElement("div"),
    }));
  }

  setLevel(level: number): void {
    this.data = {
      level: level,
      text: this.data.text,
    };
  }

  merge(data: HeaderData): void {
    this._element.insertAdjacentHTML("beforeend", data.text);
  }

  validate(blockData: HeaderData): boolean {
    return blockData.text.trim() !== "";
  }

  save(toolsContent: HTMLHeadingElement): HeaderData {
    return {
      text: toolsContent.innerHTML,
      level: this.currentLevel.number,
    };
  }

  static get conversionConfig() {
    return {
      export: "text",
      import: "text",
    };
  }

  static get sanitize() {
    return {
      level: false,
      text: {},
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  get data(): HeaderData {
    this._data.text = this._element.innerHTML;
    this._data.level = this.currentLevel.number;

    return this._data;
  }

  set data(data: HeaderData) {
    this._data = this.normalizeData(data);

    if (data.level !== undefined && this._element.parentNode) {
      const newHeader = this.getTag();

      newHeader.innerHTML = this._element.innerHTML;
      this._element.parentNode.replaceChild(newHeader, this._element);

      this._element = newHeader;
    }

    if (data.text !== undefined) {
      this._element.innerHTML = this._data.text || "";
    }
  }

  getTag(): HTMLHeadingElement {
    const tag = document.createElement(
      this.currentLevel.tag
    ) as HTMLHeadingElement;

    tag.innerHTML = this._data.text || "";
    tag.classList.add(this._CSS.wrapper);
    tag.contentEditable = this.readOnly ? "false" : "true";
    tag.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || "");

    return tag;
  }

  get currentLevel(): Level {
    let level = this.levels.find(
      (levelItem) => levelItem.number === this._data.level
    );

    if (!level) {
      level = this.defaultLevel;
    }

    return level;
  }

  get defaultLevel(): Level {
    if (this._settings.defaultLevel) {
      const userSpecified = this.levels.find((levelItem) => {
        return levelItem.number === this._settings.defaultLevel;
      });

      if (userSpecified) {
        return userSpecified;
      } else {
        console.warn(
          "(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels"
        );
      }
    }

    return this.levels[1];
  }

  get levels(): Level[] {
    const availableLevels = [
      {
        number: 1,
        tag: "H1",
        svg: IconH1,
      },
      {
        number: 2,
        tag: "H2",
        svg: IconH2,
      },
      {
        number: 3,
        tag: "H3",
        svg: IconH3,
      },
      {
        number: 4,
        tag: "H4",
        svg: IconH4,
      },
      {
        number: 5,
        tag: "H5",
        svg: IconH5,
      },
      {
        number: 6,
        tag: "H6",
        svg: IconH6,
      },
    ];

    return this._settings.levels
      ? availableLevels.filter((l) => this._settings.levels!.includes(l.number))
      : availableLevels;
  }

  onPaste(event: PasteEvent): void {
    const detail = event.detail;

    if ("data" in detail) {
      const content = detail.data as HTMLElement;

      let level = this.defaultLevel.number;

      switch (content.tagName) {
        case "H1":
          level = 1;
          break;
        case "H2":
          level = 2;
          break;
        case "H3":
          level = 3;
          break;
        case "H4":
          level = 4;
          break;
        case "H5":
          level = 5;
          break;
        case "H6":
          level = 6;
          break;
      }

      if (this._settings.levels) {
        level = this._settings.levels.reduce((prevLevel, currLevel) => {
          return Math.abs(currLevel - level) < Math.abs(prevLevel - level)
            ? currLevel
            : prevLevel;
        });
      }

      this.data = {
        level,
        text: content.innerHTML,
      };
    }
  }

  static get pasteConfig() {
    return {
      tags: ["H1", "H2", "H3", "H4", "H5", "H6"],
    };
  }

  static get toolbox() {
    return {
      icon: IconHeading,
      title: "제목",
    };
  }
}
