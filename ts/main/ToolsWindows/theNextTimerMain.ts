import { app, BrowserWindow } from "electron";
import { ConfigReader } from "../configReader";
import { ClockWindow } from "./theNextClock";
import { TheNextToolsBase } from "./theNextToolsBase";
import { TheNextTimerSetter } from "./theNextTimerSetter";
/**
 * 工具管理窗口，用于TheNextToolsBase的其他
 * 子类实现的使用
 * Tool management window for the use of
 * other subclass implementation of
 * TheNextToolsBase
 * @export
 * @class TheNextTimerMain
 * @extends {TheNextToolsBase}
 */
export class TheNextTimerMain extends TheNextToolsBase {
  /**
   * 配置文件读取
   * read config file
   * @private
   * @type {ConfigReader}
   * @memberof TheNextTimerMain
   */
  private configReader: ConfigReader;
  /**
   * 工具窗口管理
   * tool window manage
   * @private
   * @type {TheNextToolsBase[]}
   * @memberof TheNextTimerMain
   */
  private windowList: TheNextToolsBase[];
  /**
   * 建立工具管理窗口
   * Creates an instance of TheNextTimerMain.
   * @memberof TheNextTimerMain
   */
  constructor() {
    super();
    this.windowList = [];
    this.mainWindow.setSize(1, 1);
    // 这个窗口用于保持快捷键，大多数时间不显示
    // This window is used to keep the shortcut
    // key, most of time it doesn`t display
    this.mainWindow.hide();
    this.configReader = new ConfigReader("theNextMain");
    // 注册关闭快捷键
    // register shortcut for close app
    this.registerOneShortcut(this.configReader.getConfig("shutdown", "super+ctrl+q"), () => {
      this.close();
      for (const window of this.windowList) {
        if (window != null) {
          window.close();
        }
        this.windowList.splice(this.windowList.indexOf(window));
      }
      app.quit();
    });
    // 注册启动计时器的快捷键
    // register shortcut for start a timer
    this.registerOneShortcut(this.configReader.getConfig("addTimer", "super+ctrl+t"), () => {
      this.windowList.push(new TheNextTimerSetter());
    });
    this.mainWindow.removeAllListeners();
  }
  /**
   * @memberof theNextToolsBase
   */
  public close(): void {
    super.close();
    console.log("quit");
    this.configReader.save();
    this.mainWindow.close();
  }
}
