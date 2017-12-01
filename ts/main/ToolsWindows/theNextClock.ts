import { theNextToolsBase } from "./theNextToolsBase";
// import * as the_next from "./theNextToolsBase"

/**
 * 简易的计时窗口
 * A simple timing window
 *
 * @export
 * @class clockWindow
 * @extends {theNextToolsBase}
 */
export class clockWindow extends theNextToolsBase {
  constructor() {
    super();
    let window_width_ = 157;
    let window_height = window_width_;
    // 确定窗口大小并保持不变
    // make the window in const size
    this.main_window.setSize(window_width_, window_height);
    this.main_window.setResizable(false);
    this.main_window.setFullScreenable(false);
    this.main_window.setMaximizable(false);
    // 使窗口始终置顶
    // make the window always on top
    // 在一些窗口管理器中也许你需要将"* float"加入
    // 浮动窗口的规则中已获得更好的效果
    // In some window managers maybe you need to
    // add "* float" to the floating window rules
    // to get better results
    this.main_window.setTitle("the_next clock float");
    this.main_window.setAlwaysOnTop(true, "floating");

    // 注册快捷键
    this.registerOneShortcut("ctrl+e", () => {
      console.log("debug on");
      if (this.isFocused()) {
        this.main_window.webContents.openDevTools({ mode: "detach" });
      }
    });
    this.registerOneShortcut("tab", () => {
      console.log("catch tab");
      this.main_window.webContents.send("tab_call");
    });
    this.registerOneShortcut("alt+f4", () => {
      console.log("close");
      if (this.isFocused()) {
        this.close();
      }
    });
    this.registerOneShortcut("ctrl+w", () => {
      console.log("close");
      if (this.isFocused()) {
        this.close();
      }
    });
    this.main_window.loadURL("file://" + __dirname + "/../index/clock.html");
  }

  public close() {
    super.close();
    this.main_window.close();
    this.main_window = null;
  }
}
