import { ipcMain } from "electron";
import { TheNextToolsBase } from "./theNextToolsBase";

export class TheNextTimerSetter extends TheNextToolsBase {
  private static onDataGetFun: (data: number[]) => void;
  constructor() {
    super();
    this.setCanMoveInVim(false);
    this.mainWindow.setFullScreen(true);
    this.mainWindow.loadURL(__dirname + "/../../../index/TimerSetter.html");
    this.mainWindow.webContents.on("destroyed", () => {
      TheNextTimerSetter.onDataGetFun = () => {return; };
    });
    this.registerOneShortcut("ctrl+e", () => {
      if (this.isFocused()) {
        console.log("debug on");
        this.mainWindow.webContents.openDevTools({ mode: "detach" });
      }
    });
    ipcMain.once("getTime", (event, data: number[]) => {
      if (TheNextTimerSetter.onDataGetFun != null) {
        TheNextTimerSetter.onDataGetFun(data);
      }
    });
    this.IcoPath = "../../../img/png/timerSetterIco.png";
  }
  /**
   * 设置收到数据的回调函数
   * set call back function when receive data
   * @memberof TheNextTimerSetter
   */
  public set onDataGet(fun: (data: number[]) => void) {
    TheNextTimerSetter.onDataGetFun = fun;
  }
}
