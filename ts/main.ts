import { app, globalShortcut, ipcMain } from "electron";
import { ClockWindow } from "./main/ToolsWindows/theNextClock";
import { TheNextToolsBase } from "./main/ToolsWindows/theNextToolsBase";

const mainWindow: TheNextToolsBase[] = [];

app.on("ready", () => {
  // build the timer main window
  mainWindow.push(new ClockWindow());
  if (globalShortcut.isRegistered("super+ctrl+q")) {
    console.log("quit is regist");
  }
  globalShortcut.register("super+ctrl+q", () => {
    console.log("quit app");
    for (const window of mainWindow) {
      window.close();
      mainWindow.splice(mainWindow.indexOf(window));
    }
    app.quit();
  });
  globalShortcut.register("super+ctrl+t", () => {
    console.log("add");
    mainWindow.push(new ClockWindow());
  });
  // 使窗口可以关闭自身
  // let window close itself
  ipcMain.on("close", event => {
    for (const i in mainWindow) {
      if (mainWindow[i].webContents === event.sender) {
        mainWindow.splice(Number(i));
        return;
      }
    }
  });
});
