class TimerSetter extends TheNextWindow {
  // 小时设置
  // hours setting
  private hourSetter: TheNextInputNumber;
  // 分钟设置
  // minute setting
  private minuteSetter: TheNextInputNumber;
  // 秒数设置
  // second setting
  private secondSetting: TheNextInputNumber;
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
    const hours: HTMLParagraphElement = document.createElement("p");
    const minute: HTMLParagraphElement = document.createElement("p");
    const second: HTMLParagraphElement = document.createElement("p");
    this.hourSetter = new TheNextInputNumber({ max: 12, min: 0, default: 0 });
    this.minuteSetter = new TheNextInputNumber({ max: 60, min: 0, default: 50 });
    this.secondSetting = new TheNextInputNumber({ max: 60, min: 0, default: 0 });
    hours.innerText = "小时";
    minute.innerText = "分钟";
    second.innerText = "秒";
    this.appendChild(this.hourSetter);
    this.appendChild(hours);
    this.appendChild(this.minuteSetter);
    this.appendChild(minute);
    this.appendChild(this.secondSetting);
    this.appendChild(second);
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
}
