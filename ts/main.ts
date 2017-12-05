import { app, globalShortcut, ipcMain } from "electron";
import { ClockWindow } from "./main/ToolsWindows/theNextClock";
import { TheNextTimerMain } from "./main/ToolsWindows/theNextTimerMain";
import { TheNextToolsBase } from "./main/ToolsWindows/theNextToolsBase";

const mainWindow: TheNextToolsBase[] = [];

app.on("ready", () => {
  // build the timer main window
  mainWindow.push(new TheNextTimerMain());
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
