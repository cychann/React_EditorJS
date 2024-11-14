import "./index.css";
import {
  type API,
  type InlineTool,
  type SanitizerConfig,
} from "@editorjs/editorjs";
import { type InlineToolConstructorOptions } from "@editorjs/editorjs/types/tools/inline-tool";

export default class ColorPicker implements InlineTool {
  static get CSS(): string {
    return "cdx-color-picker";
  }

  static range: Range;

  private button: HTMLButtonElement | undefined;
  private colorPreview: HTMLSpanElement | undefined;
  private tag: string = "SPAN";
  private api: API;
  private iconClasses: { base: string; active: string };
  private colors: string[] = [];
  private range: Range | null = null;
  private currentColor: string | "transparent";

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
    this.button.classList.add(this.iconClasses.base, "color-picker-btn");

    this.colorPreview = document.createElement("span");
    this.colorPreview.classList.add("color-preview");

    this.button.appendChild(document.createTextNode(this.toolboxIcon));
    this.button.appendChild(this.colorPreview);

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
        this.updateToolboxIcon();
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
  }

  private customSurround(color: string) {
    const termWrapper = this.api.selection.findParentTag(
      this.tag,
      ColorPicker.CSS
    );

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(color);
    }

    this.currentColor = color;
  }

  public wrap(color?: string) {
    const span = document.createElement(this.tag);
    span.classList.add(ColorPicker.CSS);

    if (color) {
      span.style.color = color;
      this.currentColor = color;
    }

    if (this.range) {
      const content = this.range.extractContents();

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
      const spans = node.querySelectorAll("span.cdx-color-picker");
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
    const termTag = this.api.selection.findParentTag(this.tag, ColorPicker.CSS);

    if (termTag) {
      const color = termTag.style.color;
      this.currentColor = color;
      this.updateToolboxIcon();
    }

    return false;
  }

  private updateToolboxIcon() {
    if (this.colorPreview) {
      this.colorPreview.style.backgroundColor = this.currentColor;
    }
  }

  public get toolboxIcon(): string {
    return "A";
  }

  public static get sanitize(): SanitizerConfig {
    return {
      span: {
        class: ColorPicker.CSS,
        style: true,
      },
    };
  }
}
