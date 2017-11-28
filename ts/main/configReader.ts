import { app } from "electron";
import * as fs from "fs";

export class configReader {
  private user_path: string;
  constructor() {
    this.user_path = app.getPath("appData");
    console.log(this.user_path);
    // if has no the_next_app_config exists create it
    if (!fs.existsSync(this.user_path + "/.config/the_next_app_config")) {
      if (!fs.existsSync(this.user_path + "/.config")) {
        fs.mkdirSync(this.user_path + "/.config");
      }
      fs.mkdirSync(this.user_path + "/.config/the_next_app_config");
    }
    this.user_path = this.user_path + "/.config/the_next_app_config"
  }
}
