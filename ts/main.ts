import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";

var main_window: BrowserWindow = null;
/**
 * make the main window close
 */
function mainWindowClose() {
  if (main_window != null) {
    main_window.close();
    main_window = null;
  }
  app.quit();
}

/**
 * register the shortcut
 */
function registerShortcut() {
  globalShortcut.register("tab", function() {
    main_window.webContents.send("tab_call");
  });
  globalShortcut.register("ctrl+e", function() {
    console.log("debug on");
    let win = BrowserWindow.getFocusedWindow();
    if (win == main_window) {
      win.webContents.openDevTools({ mode: "detach" });
    }
  });
  globalShortcut.register("alt+f4", function() {
    console.log("close");
    let win = BrowserWindow.getFocusedWindow();
    if (win == main_window) {
      main_window = null;
      app.quit();
    }
  });
  globalShortcut.register("ctrl+w", function() {
    console.log("close");
    let win = BrowserWindow.getFocusedWindow();
    if (win == main_window) {
      main_window = null;
      app.quit();
    }
  });
  globalShortcut.register("space", function() {
    main_window.webContents.send("space_call");
  });
}

app.on("ready", () => {
  let main_window_width_: number = 156;
  let main_window_height: number = 156;

  // build the timer main window
  main_window = new BrowserWindow({
    // make background transparent
    backgroundColor: "#0000",
    frame: false,
    resizable: false,
    fullscreenable: false,
    // disable the border of the window
    transparent: true,
    width: main_window_width_,
    height: main_window_height,
    title: "the_next clock float"
  });
  
  main_window.loadURL("file://" + __dirname + "/../index/clock.html");
  main_window.on("blur", function() {
    let win = BrowserWindow.getFocusedWindow();
    if (win) return;
    globalShortcut.unregisterAll();
    console.log("blur");
  });
  main_window.on("focus", function() {
    registerShortcut();
    console.log("focus");
  });
});
