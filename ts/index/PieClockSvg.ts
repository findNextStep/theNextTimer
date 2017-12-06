class PieClockSvg extends ClockBase {
  private static r: number = 100;
  private color: string;
  private svg: SVGSVGElement;
  private pie: SVGCircleElement;
  private border: SVGCircleElement;
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
    this.pie.setAttribute("cx", PieClockSvg.r.toString());
    this.pie.setAttribute("cy", PieClockSvg.r.toString());
    this.pie.setAttribute("r", (PieClockSvg.r / 2).toString());
    this.pie.setAttribute("stroke-width", (PieClockSvg.r - 4).toString());
    this.pie.setAttribute("fill", "rgba(0,0,0,0)");
    this.pie.setAttribute("transform", "rotate(270 " + PieClockSvg.r.toString() + " " + PieClockSvg.r.toString() + ")");
    this.svg.appendChild(this.border);
    this.border.setAttribute("cx", PieClockSvg.r.toString());
    this.border.setAttribute("cy", PieClockSvg.r.toString());
    this.border.setAttribute("r", (PieClockSvg.r - 2).toString());
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
    this.pie.setAttribute("stroke-dasharray", "" + Math.PI * PieClockSvg.r * progress + " " + Math.PI * PieClockSvg.r);
  }
  /**
   * 获取当前svg的高度
   * Get the height of the current svg
   * @readonly
   * @type {number}
   * @memberof PieClock
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
   * @memberof PieClock
   */
  public get width(): number {
    const width = document.defaultView.getComputedStyle(this.svg, null).width;
    return Number(width.substr(0, width.length - 2));
  }
}
