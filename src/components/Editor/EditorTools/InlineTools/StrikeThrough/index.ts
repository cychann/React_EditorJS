import "./index.css";
import { IconStrikethrough } from "@codexteam/icons";
import {
  type API,
  type InlineTool,
  type SanitizerConfig,
} from "@editorjs/editorjs";
import { type InlineToolConstructorOptions } from "@editorjs/editorjs/types/tools/inline-tool";

export default class Strikethrough implements InlineTool {
  static get CSS(): string {
    return "cdx-strike-through";
  }

  private button: HTMLButtonElement | undefined;
  private tag: string = "S";
  private api: API;
  private iconClasses: { base: string; active: string };

  public constructor(options: InlineToolConstructorOptions) {
    this.api = options.api;

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  public static isInline = true;

  public render(): HTMLElement {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  public surround(range: Range): void {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(
      this.tag,
      Strikethrough.CSS
    );

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  public wrap(range: Range) {
    const s = document.createElement(this.tag);

    s.classList.add(Strikethrough.CSS);

    s.appendChild(range.extractContents());
    range.insertNode(s);

    this.api.selection.expandToTag(s);
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
    if (!unwrappedContent) {
      return;
    }

    termWrapper.parentNode?.removeChild(termWrapper);

    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  public checkState(): boolean {
    const termTag = this.api.selection.findParentTag(
      this.tag,
      Strikethrough.CSS
    );

    this.button?.classList.toggle(this.iconClasses.active, !!termTag);

    return !!termTag;
  }

  public get toolboxIcon(): string {
    return IconStrikethrough;
  }

  public static get sanitize(): SanitizerConfig {
    return {
      u: {
        class: Strikethrough.CSS,
      },
    };
  }
}
