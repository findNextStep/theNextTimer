abstract class TheNextUI {
  /**
   * 获取ui控件本体
   * Getting the UI control Ontology
   * @readonly
   * @abstract
   * @type {HTMLElement}
   * @memberof TheNextUI
   */
  public abstract get container(): HTMLElement;
}

// tslint:disable-next-line:max-classes-per-file
abstract class TheNextWindow extends TheNextUI {
  protected mainContainer: HTMLDivElement;
  constructor() {
    super();
    this.mainContainer = document.createElement("div");
  }
  /**
   * 获取窗口本体
   * Getting the window Ontology
   * @readonly
   * @abstract
   * @type {HTMLDivElement}
   * @memberof TheNextWindow
   */
  public get container(): HTMLDivElement {
    return this.mainContainer;
  }
  public appendChild(child: HTMLElement | TheNextUI) {
    if (child instanceof HTMLElement) {
      this.container.appendChild(child);
    } else {
      this.container.appendChild(child.container);
    }
  }
  /**
   * 获取当前contain的高度
   * Get the height of the current svg
   * @readonly
   * @type {number}
   * @memberof TheNextWindow
   */
  public get height(): number {
    const height = document.defaultView.getComputedStyle(this.container, null).height;
    return Number(height.substr(0, height.length - 2));
  }
  /**
   * 获取当前contain的高度
   * Get the height of the current svg
   * @readonly
   * @type {number}
   * @memberof TheNextWindow
   */
  public get width(): number {
    const width = document.defaultView.getComputedStyle(this.container, null).width;
    return Number(width.substr(0, width.length - 2));
  }
}

// tslint:disable-next-line:max-classes-per-file
abstract class TheNextInput extends TheNextUI {
  /**
   * 获取输入框本体
   * Get the input box Ontology
   * @readonly
   * @abstract
   * @type {HTMLInputElement}
   * @memberof TheNextInput
   */
  public abstract get container(): HTMLInputElement;
}
