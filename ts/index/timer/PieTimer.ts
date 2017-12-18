import { TimerBase } from "./Timer";

export class PieTimer extends TimerBase {
  private pieTimer: HTMLCanvasElement;
  private color: string;
  constructor(startTime: Date, contain: number, parent: HTMLElement) {
    super(startTime, contain);
    this.pieTimer = document.createElement("canvas");
    this.pieTimer.style.width = "100%";
    this.pieTimer.style.height = "100%";
    parent.appendChild(this.pieTimer);
    this.pieTimer.width = this.width;
    this.pieTimer.height = this.height;
    this.setColor(255, 255, 255);
  }
  public setColor(r: number, g: number, b: number) {
    this.color = "rgb(" + r + "," + g + "," + b + ")";
  }
  public progressChange(progress: number): void {
    if (progress < 0 || progress > 1) {
      progress = 0.5;
    }
    const ctx: CanvasRenderingContext2D = this.pieTimer.getContext("2d");
    ctx.lineWidth = 4;

    const x: number = this.width / 2;
    const y: number = this.height / 2;
    const r: number = x - 3;
    // 清空画布
    ctx.clearRect(0, 0, x * 2, y * 2);
    ctx.fillStyle = this.color.toString();
    ctx.strokeStyle = this.color.toString();
    // 绘制盘底
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, 3 * Math.PI / 2);
    ctx.closePath();
    ctx.stroke();
    // 绘制扇形
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.lineTo(x, y);
    // 从圆心连接到起点
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  public destory(): void {
    this.pieTimer.remove();
  }
  protected computingTimeInterval(): number {
    return this.containTime / ((this.height + this.width) * 2);
  }
  public get height(): number {
    const height = document.defaultView.getComputedStyle(this.pieTimer, null).height;
    return Number(height.substr(0, height.length - 2));
  }
  public get width(): number {
    const width = document.defaultView.getComputedStyle(this.pieTimer, null).width;
    return Number(width.substr(0, width.length - 2));
  }
}
