import { app, BrowserWindow, ipcMain } from "electron";
import { ConfigReader } from "../configReader";
import { TheNextTimer } from "./theNextTimer";
import { TheNextTimerSetter } from "./theNextTimerSetter";
import { TheNextToolsBase } from "./theNextToolsBase";
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
    this.setCanMoveInVim(false);
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
    this.registerOneShortcut(this.configReader.getConfig("addTimer", "super+ctrl+y"), () => {
      const newSetter = new TheNextTimerSetter();
      this.windowList.push(newSetter);
      newSetter.onClose = () => {
        this.windowList.splice(this.windowList.indexOf(newSetter));
      };
      newSetter.onDataGet = (data: number[]) => {
        newSetter.close();
        const newTimer = new TheNextTimer();
        this.windowList.push(newTimer);
        newTimer.onClose = () => {
          this.windowList.splice(this.windowList.indexOf(newTimer));
        };
        newTimer.webContents.on("dom-ready", () => {
          newTimer.webContents.send("setContainTime", data[0], data[1], data[2]);
        });
        newSetter.onDataGet = () => { return; };
      };
      ipcMain.once("ready", () => {
        newSetter.webContents.send("getRequire", "小时", 12, 0, 0);
        newSetter.webContents.send("getRequire", "分", 60, 0, 50);
        newSetter.webContents.send("getRequire", "秒", 60, 0, 0);
      });
    });
    this.registerOneShortcut(this.configReader.getConfig("addDeadlineTimer", "super+ctrl+t"), () => {
      const newSetter = new TheNextTimerSetter();
      this.windowList.push(newSetter);
      newSetter.onClose = () => {
        this.windowList.splice(this.windowList.indexOf(newSetter));
      };
      newSetter.onDataGet = (data: number[]) => {
        newSetter.close();
        const newTimer = new TheNextTimer();
        this.windowList.push(newTimer);
        newTimer.onClose = () => {
          this.windowList.splice(this.windowList.indexOf(newTimer));
        };
        newTimer.webContents.on("dom-ready", () => {
          const now = new Date();
          newTimer.webContents.send("setTime",
            data[0], data[1], data[2], data[3], data[4], data[5]);
        });
        newSetter.onDataGet = () => { return; };
      };
      ipcMain.once("ready", () => {
        const now: Date = new Date();
        newSetter.webContents.send("getRequire", "小时", 24, 0, now.getHours());
        newSetter.webContents.send("getRequire", "分", 60, 0, now.getMinutes());
        newSetter.webContents.send("getRequire", "秒 → ", 60, 0, now.getSeconds());
        newSetter.webContents.send("getRequire", "小时", 24, 0, now.getHours());
        newSetter.webContents.send("getRequire", "分", 60, 0, now.getMinutes());
        newSetter.webContents.send("getRequire", "秒", 60, 0, now.getSeconds());
      });
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
  }
  public isFocused(): boolean {
    return true;
  }
}
