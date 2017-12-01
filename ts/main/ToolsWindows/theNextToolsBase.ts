import { BrowserWindow, globalShortcut } from "electron";
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
export abstract class theNextToolsBase {
  protected main_window: BrowserWindow;
  private short_cut: { [key: string]: () => void };
  /**
   * 创建一个简单的the_next工具窗口
   * Creates an instance of theNextToolsBase.
   * @memberof theNextToolsBase
   */
  constructor() {
    this.short_cut = {};
    // 窗口的简单设置
    // simple setting about the main window
    this.main_window = new BrowserWindow({
      // 使窗口透明化
      // make background transparent
      backgroundColor: "#0000",
      frame: false,
      resizable: false,
      fullscreenable: false,
      // 消解窗口边界
      // disable the border of the window
      transparent: true
    });
    // 使窗口快捷键只能在窗口获得焦点时生效
    // make the short cut work only when the window
    // is focused
    this.main_window.on("blur", () => {
      let win = BrowserWindow.getFocusedWindow();
      if (win != this.main_window) {
        return;
      }
      globalShortcut.unregisterAll();
      console.log("blur");
    });
    this.main_window.on("focus", () => {
      console.log("focus");
      let win = BrowserWindow.getFocusedWindow();
      if (win != this.main_window) {
        return;
      }
      this.registerShortcut();
    });
  }

  public isFocused(): boolean {
    let win = BrowserWindow.getFocusedWindow();
    if (win == this.main_window) {
      if (this.main_window.isFocused()) {
        return true;
      }
    }
    return false;
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
    this.short_cut[key] = fun;
    // if window is focused
    if (this.main_window.isFocused()) {
      globalShortcut.unregisterAll();
      this.registerShortcut();
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
    for (let name in this.short_cut) {
      globalShortcut.register(name, this.short_cut[name]);
    }
  }
  /**
   * 关闭窗口（组）
   * make the window(s) closed
   *
   * @abstract
   * @memberof theNextToolsBase
   */
  public  close(): void{
    // 当窗口关闭的时候取消快捷键的绑定
    // unregist shortcut when window
    // closing
    globalShortcut.unregisterAll();
  }
}