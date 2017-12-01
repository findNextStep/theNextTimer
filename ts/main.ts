import { app, globalShortcut } from "electron";
import { clockWindow } from "./main/ToolsWindows/theNextClock";
import { theNextToolsBase } from "./main/ToolsWindows/theNextToolsBase";

var main_window: theNextToolsBase = null;
/**
 * make the main window close
 */

app.on("ready", () => {
  // build the timer main window
  main_window = new clockWindow();
  globalShortcut.register("super+ctrl+q", function() {
    console.log("quit app");
    app.quit();
  });
});
app.on("window-all-closed", event => {
  event.preventDefault();
  return true;
});
