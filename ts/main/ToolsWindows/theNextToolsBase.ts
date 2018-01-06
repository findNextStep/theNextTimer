import { BrowserWindow, globalShortcut, nativeImage, webContents } from "electron";
import { existsSync } from "fs";
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
  protected onCloseFun: () => void;
  private shortCut: { [key: string]: () => void };
  /**
   * 创建一个简单的the_next工具窗口
   * Creates an instance of theNextToolsBase.
   * @memberof theNextToolsBase
   */
  constructor(icoPath?: string | nativeImage) {
    this.shortCut = {};
    if (icoPath == null) {
      icoPath = __dirname + "/../../../img/png/ico.png";
      if (!existsSync(icoPath)) {
        console.log("nonononono");
      }
      console.log(icoPath);
      icoPath = nativeImage.createFromPath(icoPath);
    }
    // 窗口的简单设置
    // simple setting about the main window
    this.mainWindow = new BrowserWindow({
      // 使窗口透明化
      // make background transparent
      backgroundColor: "#0000",
      frame: false,
      icon: icoPath,
      resizable: false,
      // 消解窗口边界
      // disable the border of the window
      transparent: true
    });
    this.mainWindow.on("closed", () => {
      this.close();
    });
    // 使窗口快捷键只能在窗口获得焦点时生效
    // make the short cut work only when the window
    // is focused
    this.mainWindow.on("blur", () => {
      console.log("blur");
      this.UnregisterAllShortcut();
    });
    this.mainWindow.on("focus", () => {
      const win = BrowserWindow.getFocusedWindow();
      if (win !== this.mainWindow) {
        return;
      }
      this.registerShortcut();
    });
    this.registerOneShortcut("j", () => { this.moveUp(1); });
    this.registerOneShortcut("k", () => { this.moveDown(1); });
    this.registerOneShortcut("h", () => { this.moveLeft(1); });
    this.registerOneShortcut("l", () => { this.moveRight(1); });
  }
  public set IcoPath(path: string) {
    this.mainWindow.setIcon(nativeImage.createFromPath(path));
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

  /**
   * 移动窗口向上
   * @param  {number} times 移动量
   * @returns void
   */
  public moveUp(times: number): void {
    this.mainWindow.setPosition(this.mainWindow.getPosition()[0], this.mainWindow.getPosition()[1] - times);
  }

  /**
   * 移动窗口向下
   * @param  {number} times 移动量
   * @returns void
   */
  public moveDown(times: number): void {
    this.mainWindow.setPosition(this.mainWindow.getPosition()[0], this.mainWindow.getPosition()[1] + times);
  }

  /**
   * 移动窗口向左
   * @param  {number} times 移动量
   * @returns void
   */
  public moveLeft(times: number): void {
    this.mainWindow.setPosition(this.mainWindow.getPosition()[0] - times, this.mainWindow.getPosition()[1]);
  }
  /**
   * 移动窗口向右
   * @param times 移动量
   */
  public moveRight(times: number): void {
    this.mainWindow.setPosition(this.mainWindow.getPosition()[0] + times, this.mainWindow.getPosition()[1]);
  }
  /**
   * 判断窗口是否被锁定，用于快捷键解绑判断
   * Determine whether the window is locked and used for quick key binding judgment
   * @returns {boolean}
   * 窗口是否锁定
   * whether the window is locked
   * @memberof TheNextToolsBase
   */
  public isFocused(): boolean {
    const win = BrowserWindow.getFocusedWindow();
    if (win === this.mainWindow) {
      return this.mainWindow.isFocused();
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
    if (this.onCloseFun != null) {
      this.onCloseFun();
    }
    if (this.mainWindow != null && !this.mainWindow.isDestroyed()) {
      this.mainWindow.close();
      this.mainWindow = null;
    }
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
    if (key == null) {
      return;
    }
    this.UnregisterAllShortcut();
    this.shortCut[key] = fun;
    // if window is focused
    if (this.isFocused()) {
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
  /**
   * 设置窗口关闭时的回调函数
   * set window close callback
   * @memberof TheNextToolsBase
   */
  public set onClose(fun: () => void) {
    this.onCloseFun = fun;
  }
}
