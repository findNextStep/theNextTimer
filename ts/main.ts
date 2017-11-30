import { app, BrowserWindow } from "electron";
import { configReader } from "./main/configReader";
import { clockWindow } from "./main/theNextClock";

var main_window: clockWindow = null;
/**
 * make the main window close
 */

app.on("ready", () => {
  // build the timer main window
  main_window = new clockWindow();
});
