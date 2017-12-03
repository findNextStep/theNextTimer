import { app } from "electron";
import * as fs from "fs";

export class ConfigReader {
  private userPath: string;
  constructor() {
    this.userPath = app.getPath("appData");
    console.log(this.userPath);
    // if has no the_next_app_config exists create it
    if (!fs.existsSync(this.userPath + "/.config/the_next_app_config")) {
      if (!fs.existsSync(this.userPath + "/.config")) {
        fs.mkdirSync(this.userPath + "/.config");
      }
      fs.mkdirSync(this.userPath + "/.config/the_next_app_config");
    }
    this.userPath = this.userPath + "/.config/the_next_app_config"
  }
}
