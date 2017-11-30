import { BrowserWindow, globalShortcut } from "electron";
/**
 * basic window encapsulation
 * make window transparent and frameless
 *
 * @export
 * @abstract
 * @class theNextToolsBase
 */
export abstract class theNextToolsBase {
  protected main_window: BrowserWindow;
  private short_cut: { [key: string]: () => void };
  /**
   * Creates an instance of theNextToolsBase.
   * @memberof theNextToolsBase
   */
  constructor() {
    // simple setting about the main window
    this.main_window = new BrowserWindow({
      // make background transparent
      backgroundColor: "#0000",
      frame: false,
      resizable: false,
      fullscreenable: false,
      // disable the border of the window
      transparent: true
    });
    // make the short cut work only when the window
    // is focused
    this.main_window.on("blur", function() {
      let win = BrowserWindow.getFocusedWindow();
      if (win != this.main_window) {
        return;
      }
      globalShortcut.unregisterAll();
      console.log("blur");
    });
    this.main_window.on("focus", function() {
      let win = BrowserWindow.getFocusedWindow();
      if (win != this.main_window) {
        return;
      }
      this.registerShortcut();
      console.log("focus");
    });
  }

  public isFocused():boolean{
    let win = BrowserWindow.getFocusedWindow();
    if (win == this.main_window) {
      if (this.main_window.isFocused()){
        return true;
      }
    }
    return false;
  }

  /**
   * change or get one shortcut
   *
   * @protected
   * @param {string} key
   *        the key of the shortcut
   * @param {() => void} fun
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
   * make the window closed
   *
   * @abstract
   * @memberof theNextToolsBase
   */
  public abstract close(): void;
}
