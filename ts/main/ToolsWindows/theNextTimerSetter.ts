import { ipcMain } from "electron";
import { TheNextToolsBase } from "./theNextToolsBase";

export class TheNextTimerSetter extends TheNextToolsBase {
  private onDataGetFun: (hour: number, minute: number, second: number) => void;
  constructor() {
    super();
    this.mainWindow.setFullScreen(true);
    this.mainWindow.loadURL(__dirname + "/../../../index/TimerSetter.html");
    this.registerOneShortcut("ctrl+e", () => {
      if (this.isFocused()) {
        console.log("debug on");
        this.mainWindow.webContents.openDevTools({ mode: "detach" });
      }
    });
    ipcMain.once("getTime", (event, hour: number, minute: number, second: number) => {
      if (this.onDataGetFun != null) {
        this.onDataGetFun(hour, minute, second);
      }
    });
  }
  /**
   * 设置收到数据的回调函数
   * set call back function when receive data
   * @memberof TheNextTimerSetter
   */
  public set onDataGet(fun: (hour: number, minute: number, second: number) => void) {
    this.onDataGetFun = fun;
  }
}
