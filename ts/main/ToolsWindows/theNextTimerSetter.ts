import { TheNextToolsBase } from "./theNextToolsBase";

export class TheNextTimerSetter extends TheNextToolsBase {
  constructor() {
    super();
    this.mainWindow.setFullScreen(true);
    this.mainWindow.loadURL(__dirname + "/../../../index/image_setter.html");
    this.registerOneShortcut("ctrl+e", () => {
      console.log("debug on");
      if (this.isFocused()) {
        this.mainWindow.webContents.openDevTools({ mode: "detach" });
      }
    });
  }
}
