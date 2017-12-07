import { ConfigReader } from "../configReader";
import { TheNextToolsBase } from "./theNextToolsBase";
// import * as the_next from "./theNextToolsBase"

/**
 * 简易的计时窗口
 * A simple timing window
 *
 * @export
 * @class clockWindow
 * @extends {theNextToolsBase}
 */
export class ClockWindow extends TheNextToolsBase {
  private configReader: ConfigReader;
  constructor() {
    super();
    this.configReader = new ConfigReader("theNextClockWindow");
    const windowWidth = 157;
    const windowHeight = windowWidth;
    // 确定窗口大小并保持不变
    // make the window in const size
    this.mainWindow.setSize(windowWidth, windowHeight);
    this.mainWindow.setResizable(false);
    this.mainWindow.setFullScreenable(false);
    this.mainWindow.setMaximizable(false);
    // 使窗口始终置顶
    // make the window always on top
    // 在一些窗口管理器中也许你需要将"* float"加入
    // 浮动窗口的规则中已获得更好的效果
    // In some window managers maybe you need to
    // add "* float" to the floating window rules
    // to get better results
    this.mainWindow.setTitle("the_next clock float");
    this.mainWindow.setAlwaysOnTop(true, "floating");

    // 注册快捷键
    this.registerOneShortcut(this.configReader.getConfig("debug", "ctrl+e"), () => {
      console.log("debug on");
      if (this.isFocused()) {
        this.mainWindow.webContents.openDevTools({ mode: "detach" });
      }
    });
    this.mainWindow.loadURL("file://" + __dirname + "/../../../index/clock.html");
  }

  public close() {
    super.close();
    if (this.mainWindow != null && !this.mainWindow.isDestroyed()) {
      this.mainWindow.close();
      this.mainWindow = null;
    }
  }
}
