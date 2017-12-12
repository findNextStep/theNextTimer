class PieTimerSvg extends TimerBase {
  private static r: number = 100;
  private color: string;
  private svg: SVGSVGElement;
  private pie: SVGCircleElement;
  private border: SVGCircleElement;
  /**
   * 创建一个基于svg的扇形计时器
   * create a pie Timer with svg
   * @param {Date} startTime
   *              计时器启动时间
   *              Time to start timer
   * @param {number} contain
   *              计时持续时间
   *              time timer contain
   * @param {HTMLElement} parent
   *              计时器上级
   *              parent for timer
   * @memberof PieTimerSvg
   */
  constructor(startTime: Date, contain: number, parent: HTMLElement) {
    super(startTime, contain);
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.pie = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    parent.appendChild(this.svg);
    this.svg.style.width = "100%";
    this.svg.style.height = "100%";
    this.svg.setAttribute("viewBox", "0 0 200 200");
    this.setColor(255, 255, 255);
    this.svg.appendChild(this.pie);
    this.pie.setAttribute("cx", PieTimerSvg.r.toString());
    this.pie.setAttribute("cy", PieTimerSvg.r.toString());
    this.pie.setAttribute("r", (PieTimerSvg.r / 2).toString());
    this.pie.setAttribute("stroke-width", (PieTimerSvg.r - 4).toString());
    this.pie.setAttribute("fill", "rgba(0,0,0,0)");
    this.pie.setAttribute("transform", "rotate(270 " + PieTimerSvg.r.toString() + " " + PieTimerSvg.r.toString() + ")");
    this.svg.appendChild(this.border);
    this.border.setAttribute("cx", PieTimerSvg.r.toString());
    this.border.setAttribute("cy", PieTimerSvg.r.toString());
    this.border.setAttribute("r", (PieTimerSvg.r - 2).toString());
    this.border.setAttribute("stroke-width", "2");
    this.border.setAttribute("fill", "rgba(0,0,0,0)");
  }
  public computingTimeInterval() {
    return this.containTime / ((this.width + this.height) * 2);
  }
  public destory() {
    this.stop();
    this.svg.remove();
  }
  public setColor(r: number, g: number, b: number) {
    this.color = "rgb(" + r + "," + g + "," + b + ")";
    this.pie.style.stroke = this.color;
    this.border.style.stroke = this.color;
  }
  public progressChange(progress: number) {
    this.pie.setAttribute("stroke-dasharray", "" + Math.PI * PieTimerSvg.r * progress + " " + Math.PI * PieTimerSvg.r);
  }
  /**
   * 获取当前svg的高度
   * Get the height of the current svg
   * @readonly
   * @type {number}
   * @memberof PieTimer
   */
  public get height(): number {
    const height = document.defaultView.getComputedStyle(this.svg, null).height;
    return Number(height.substr(0, height.length - 2));
  }
  /**
   * 获取当前svg的高度
   * Get the height of the current svg
   * @readonly
   * @type {number}
   * @memberof PieTimer
   */
  public get width(): number {
    const width = document.defaultView.getComputedStyle(this.svg, null).width;
    return Number(width.substr(0, width.length - 2));
  }
}
