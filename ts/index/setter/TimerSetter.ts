import { ipcRenderer } from "electron";
import { TheNextWindow } from "../theNextHTMLInterface";
import { TheNextInputNumber } from "../theNextInputNumber";

export class TimerSetter extends TheNextWindow {
  private numbers: TheNextInputNumber[];
  private name: HTMLParagraphElement[];
  /**
   * 创建一个计时器设置器
   * create timer setter
   * @memberof TimerSetter
   */
  constructor() {
    super();
    document.body.appendChild(this.container);
    this.container.id = "setter";
    this.container.style.position = "absolute";
    this.numbers = [];
    this.name = [];
    ipcRenderer.on("getRequire", (event, name: string, maxNumber?: number, minNumber?: number, defaul?: number) => {
      const nameP: HTMLParagraphElement = document.createElement("p");
      nameP.innerText = name;
      const input: TheNextInputNumber = new TheNextInputNumber({
        defaultNumber: defaul,
        max: maxNumber,
        min: minNumber,
      });
      this.appendChild(input);
      this.numbers.push(input);
      input.onSubmit = () => {
        this.submit();
      };
      this.appendChild(nameP);
      this.centerIt();
    });
    // 重新定义位置保证窗口变化时，div始终在中心
    // When the location guarantee window is
    // redefined, div is always in the center
    window.onresize = () => {
      this.centerIt();
    };
    this.centerIt();
  }
  /**
   * 使得窗口处于正中心
   * make window center
   * @protected
   * @memberof TimerSetter
   */
  protected centerIt(): void {
    this.container.style.marginLeft = "-" + this.width / 2 + "px";
    this.container.style.marginTop = "-" + this.height / 2 + "px";
  }

  protected submit(): void {
    const data: number[] = [];
    for (const input of this.numbers) {
      data.push(input.innerNumber);
    }
    ipcRenderer.send("getTime", data);
  }
}
