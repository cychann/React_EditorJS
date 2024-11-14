import "./index.css";
import {
  type API,
  type InlineTool,
  type SanitizerConfig,
} from "@editorjs/editorjs";
import { type InlineToolConstructorOptions } from "@editorjs/editorjs/types/tools/inline-tool";

export default class BackgroundColorPicker implements InlineTool {
  static get CSS(): string {
    return "cdx-background-color-picker";
  }

  static range: Range;

  private button: HTMLButtonElement | undefined;
  private tag: string = "SPAN";
  private api: API;
  private iconClasses: { base: string; active: string };
  private colors: string[] = [];
  private range: Range | null = null;
  private currentColor: string | null = null;
  private termWrapper: HTMLElement | null = null;

  public constructor(options: InlineToolConstructorOptions) {
    this.api = options.api;

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };

    if (options.config && options.config.colorCollections) {
      this.colors = options.config.colorCollections;
    }
  }

  public static isInline = true;

  public render(): HTMLElement {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base);
    this.updateToolboxIcon();

    return this.button;
  }

  public renderActions(): HTMLElement {
    const colorPickerContainer = document.createElement("div");
    colorPickerContainer.classList.add("color-picker-container");

    this.colors.forEach((color) => {
      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color;

      colorBox.addEventListener("click", () => {
        this.customSurround(color);
        this.updateToolboxIcon(); // 색상이 변경될 때 아이콘 업데이트
      });

      colorPickerContainer.appendChild(colorBox);
    });

    return colorPickerContainer;
  }

  public surround(range: Range): void {
    if (!range) {
      return;
    }

    this.range = range;
    this.termWrapper = this.api.selection.findParentTag(
      this.tag,
      BackgroundColorPicker.CSS
    );
  }

  private customSurround(color: string) {
    const termWrapper = this.api.selection.findParentTag(
      this.tag,
      BackgroundColorPicker.CSS
    );

    console.log("termWrapper", termWrapper);
    console.log("this.termWrapper", this.termWrapper);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(color);
    }

    // 현재 색상 업데이트
    this.currentColor = color;
  }

  public wrap(color?: string) {
    console.log("wrap range", this.range);
    const span = document.createElement(this.tag);
    span.classList.add(BackgroundColorPicker.CSS);

    if (color) {
      span.style.backgroundColor = color;
      this.currentColor = color;
    }

    if (this.range) {
      const content = this.range.extractContents();
      console.log("extract content", content);

      this.flattenSpans(content);

      span.appendChild(content);
      this.range.deleteContents();
      this.range.insertNode(span);

      this.api.selection.expandToTag(span);
    }
  }

  // 중첩된 <span> 요소를 텍스트 노드로 변환하는 메서드
  private flattenSpans(node: Node) {
    if (node instanceof DocumentFragment || node instanceof Element) {
      const spans = node.querySelectorAll("span.cdx-background-color-picker");
      spans.forEach((span) => {
        if (span.parentNode) {
          const textNode = document.createTextNode(span.textContent || "");
          span.parentNode.replaceChild(textNode, span);
        }
      });
    }
  }

  public unwrap(termWrapper: HTMLElement): void {
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    if (!sel) {
      return;
    }

    const range = sel.getRangeAt(0);
    if (!range) {
      return;
    }

    const unwrappedContent = range.extractContents();
    termWrapper.parentNode?.removeChild(termWrapper);
    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  public checkState(): boolean {
    // const termTag = this.api.selection.findParentTag(this.tag, ColorPicker.CSS);
    // this.button?.classList.toggle(this.iconClasses.active, !!termTag);

    // if (termTag) {
    //   this.currentColor = termTag.style.color; // 현재 선택된 요소의 색상을 저장
    //   this.updateToolboxIcon(); // 색상에 맞게 아이콘 업데이트
    // } else {
    //   this.currentColor = null; // 선택된 색상이 없을 때
    //   this.updateToolboxIcon(); // 기본 상태로 아이콘 업데이트
    // }

    // return !!termTag;

    return false;
  }

  private updateToolboxIcon() {
    if (this.button) {
      // 배경 색상을 사용하여 아이콘의 현재 색상을 나타냅니다.
      if (this.currentColor) {
        this.button.style.backgroundColor = this.currentColor;
      } else {
        // 기본 상태로 설정 (색상 없음)
        this.button.style.backgroundColor = "transparent";
      }

      this.button.innerHTML = this.toolboxIcon; // 기본 아이콘을 유지
    }
  }

  public get toolboxIcon(): string {
    // 기본 아이콘 (여기서 필요한 경우 이모지나 SVG로 변경 가능)
    return "A";
  }

  public static get sanitize(): SanitizerConfig {
    return {
      span: {
        class: BackgroundColorPicker.CSS,
        style: true,
      },
    };
  }
}
