import { theNextToolsBase } from "./theNextToolsBase";
import { BrowserWindow } from "electron";
export class clockWindow extends theNextToolsBase {
  constructor() {
    super();
    let window_width_ = 157;
    let window_height = window_width_;
    this.main_window.setSize(window_width_, window_height);
    this.main_window.setResizable(false);
    this.main_window.setFullScreenable(false);
    this.main_window.setMaximizable(false);
    this.main_window.setTitle("the_next clock float");
    this.main_window.setAlwaysOnTop(true, "floating");
    this.registerOneShortcut("tab", () => {
      this.main_window.webContents.send("tab_call");
    });
    this.registerOneShortcut("ctrl+e", () => {
      console.log("debug on");
      if (this.isFocused()) {
        this.main_window.webContents.openDevTools({ mode: "detach" });
      }
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
    this.main_window.close();
    this.main_window = null;
  }
}
