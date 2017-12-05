import { BrowserWindow, globalShortcut, webContents } from "electron";
/**
 * 基本的electron窗口封装，统一使用透明无
 * 边界的窗口，统一管理窗口组
 * basic electron window encapsulation
 * made the window transparent and frameless
 * Unified management window group
 *
 * @author the_next
 * @export
 * @abstract
 * @class theNextToolsBase
 */
export abstract class TheNextToolsBase {
  protected mainWindow: BrowserWindow;
  private shortCut: { [key: string]: () => void };
  /**
   * 创建一个简单的the_next工具窗口
   * Creates an instance of theNextToolsBase.
   * @memberof theNextToolsBase
   */
  constructor() {
    this.shortCut = {};
    // 窗口的简单设置
    // simple setting about the main window
    this.mainWindow = new BrowserWindow({
      // 使窗口透明化
      // make background transparent
      backgroundColor: "#0000",
      frame: false,
      fullscreenable: false,
      resizable: false,
      // 消解窗口边界
      // disable the border of the window
      transparent: true,
    });
    // 使窗口快捷键只能在窗口获得焦点时生效
    // make the short cut work only when the window
    // is focused
    this.mainWindow.on("blur", () => {
      const win = BrowserWindow.getFocusedWindow();
      if (win !== this.mainWindow) {
        return;
      }
      this.UnregisterAllShortcut();
      console.log("blur");
    });
    this.mainWindow.on("focus", () => {
      console.log("focus");
      const win = BrowserWindow.getFocusedWindow();
      if (win !== this.mainWindow) {
        return;
      }
      this.registerShortcut();
    });
  }
  /**
   * 获取窗口的webcontents对象，用于判断窗口
   * Get the webcontents object of the
   * window, used to judge the window
   * @returns webContents
   */
  public get webContents(): webContents {
    return this.mainWindow.webContents;
  }
  public isFocused(): boolean {
    const win = BrowserWindow.getFocusedWindow();
    if (win === this.mainWindow) {
      if (this.mainWindow.isFocused()) {
        return true;
      }
    }
    return false;
  }
  /**
   * 关闭窗口（组）
   * make the window(s) closed
   *
   * @memberof theNextToolsBase
   */
  public close(): void {
    // 当窗口关闭的时候取消快捷键的绑定
    // unregist shortcut when window
    // closing
    this.UnregisterAllShortcut();
  }
  /**
   * 改变或者设置一个快捷键
   * change or set one shortcut
   *
   * @protected
   * @param {string} key
   *        快捷键的内容
   *        the key of the shortcut
   * @param {() => void} fun
   *        快捷键的回调函数
   *        the callback function after the short cut call
   * @memberof theNextToolsBase
   */
  protected registerOneShortcut(key: string, fun: () => void): void {
    this.shortCut[key] = fun;
    // if window is focused
    if (this.mainWindow.isFocused()) {
      this.registerShortcut();
    }
  }
  /**
   * 取消所有本窗口注册的快捷键
   * Cancel all shortcut keys that current
   * window registration
   * @private
   * @memberof TheNextToolsBase
   */
  private UnregisterAllShortcut(): void {
    for (const name in this.shortCut) {
      if (this.shortCut[name] != null) {
        console.log(name);
        globalShortcut.unregister(name);
      }
    }
  }
  /**
   * 使所有的快捷键生效
   * make the shortcut work
   *
   * @private
   * @memberof theNextToolsBase
   */
  private registerShortcut(): void {
    for (const name in this.shortCut) {
      if (this.shortCut[name] != null) {
        globalShortcut.register(name, this.shortCut[name]);
      }
    }
  }
}
