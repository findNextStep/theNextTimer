import { ipcMain } from "electron";
import { TheNextToolsBase } from "./theNextToolsBase";

export class TheNextTimerSetter extends TheNextToolsBase {
  private onDataGetFun: (data: number[]) => void;
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
    ipcMain.once("getTime", (event, data: number[]) => {
      if (this.onDataGetFun != null) {
        this.onDataGetFun(data);
      }
    });
  }
  /**
   * 设置收到数据的回调函数
   * set call back function when receive data
   * @memberof TheNextTimerSetter
   */
  public set onDataGet(fun: (data: number[]) => void) {
    this.onDataGetFun = fun;
  }
}
