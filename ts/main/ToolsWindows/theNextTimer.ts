import { ConfigReader } from "../configReader";
import { TheNextToolsBase } from "./theNextToolsBase";

/**
 * 简易的计时窗口
 * A simple timing window
 *
 * @export
 * @class TimerWindow
 * @extends {theNextToolsBase}
 */
export class TheNextTimer extends TheNextToolsBase {
  private configReader: ConfigReader;
  constructor() {
    super();
    this.configReader = new ConfigReader("theNextTimerWindow");
    const windowWidth = 157;
    const windowHeight = windowWidth;
    // 确定窗口大小并保持不变
    // make the window in const size
    this.mainWindow.setSize(windowWidth, windowHeight);
    this.mainWindow.setResizable(false);
    this.mainWindow.setFullScreenable(false);
    this.mainWindow.setMaximizable(false);
    this.mainWindow.setSkipTaskbar(true);
    // 使窗口始终置顶
    // make the window always on top
    // 在一些窗口管理器中也许你需要将"* float"加入
    // 浮动窗口的规则中已获得更好的效果
    // In some window managers maybe you need to
    // add "* float" to the floating window rules
    // to get better results
    this.mainWindow.setTitle("the_next Timer float");
    this.mainWindow.setAlwaysOnTop(true, "floating");

    // 注册快捷键
    this.registerOneShortcut(this.configReader.getConfig("debug", "ctrl+e"), () => {
      console.log("debug on");
      if (this.isFocused()) {
        this.mainWindow.webContents.openDevTools({ mode: "detach" });
      }
    });
    this.mainWindow.loadURL("file://" + __dirname + "/../../../index/Timer.html");
  }

  public close() {
    super.close();
  }
}
