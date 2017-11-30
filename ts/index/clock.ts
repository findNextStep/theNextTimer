interface clock {
  /**
   * start timer
   */
  start(): void;

  /**
   * pause timer
   * @returns is running now
   */
  pause(): boolean;

  /**
   * stop the timer
   */
  stop(): void;

  /**
   * setting timer start time and contain time
   * @param  {Date} startTime when the timer start
   * @param  {number} contain how long we cost in millisecond
   * @returns void
   */
  setTime(startTime: Date, contain: number): void;
}
abstract class clockBase implements clock {
  private _timer: NodeJS.Timer;
  private _start_time: number;
  private _contain_time: number;
  private _is_running: boolean;
  constructor(startTime: Date, contain: number) {
    this.setTime(startTime, contain);
  }
  /**
   * get now time value
   * @returns number
   */
  public static getNowTime(): number {
    return new Date().valueOf();
  }
  public start(): void {
    this._timer = setInterval(() => {
      // if time over
      if (new Date().valueOf() >= this._start_time + this._contain_time) {
        this.stop();
        return;
      } else {
        this.setProgtessByNow();
      }
    }, this.computingTimeInterval());
    // start a draw right now
    this.setProgtessByNow();
    this._is_running = false;
  }
  public stop(): void {
    clearInterval(this._timer);
    this._is_running = false;
  }
  public pause(): boolean {
    if (this._is_running) {
      this.stop();
    } else {
      this.start();
    }
    return this._is_running;
  }
  public setProgtessByNow(): void {
    this.progressChange((clockBase.getNowTime() - this._start_time) / this._contain_time);
  }
  /**
   * get best update time for the clock
   * @returns number
   */
  protected abstract computingTimeInterval(): number;
  /**
   * made the progress change to one state
   * @param  {number} progress 0<progress<1;
   */
  protected abstract progressChange(progress: number): void;
  /**
   * destory the clock element
   * @returns void
   */
  public abstract destory(): void;
  /**
   * set the clock color
   * @param  {number} r the red color number
   * @param  {number} g the green color number
   * @param  {number} b the blue color number
   * @returns void
   */
  public abstract setColor(r: number, g: number, b: number): void;

  public setTime(startTime: Date, contain: number): void {
    this._start_time = startTime.getTime();
    this._contain_time = contain;
  }
}
class pieClock extends clockBase {
  private _pieClock: HTMLCanvasElement;
  private _color: string;
  constructor(startTime: Date, contain: number, parent: HTMLElement) {
    super(startTime, contain);
    this._pieClock = document.createElement("canvas");
    this._pieClock.style.width = "100%";
    this._pieClock.style.height = "100%";
    parent.appendChild(this._pieClock);
    this._pieClock.width = this.width;
    this._pieClock.height = this.height;
    this.setColor(255, 255, 255);
  }
  protected computingTimeInterval(): number {
    return 1000 / 60;
  }
  setColor(r: number, g: number, b: number) {
    this._color = "rgb(" + r + "," + g + "," + b + ")";
  }

  public get height(): number {
    let height = document.defaultView.getComputedStyle(this._pieClock, null).height;
    return Number(height.substr(0, height.length - 2));
  }
  public get width(): number {
    let width = document.defaultView.getComputedStyle(this._pieClock, null).width;
    return Number(width.substr(0, width.length - 2));
  }
  progressChange(progress: number): void {
    if (progress < 0 || progress > 1) {
      progress = 0.5;
    }
    let ctx: CanvasRenderingContext2D = this._pieClock.getContext("2d");
    ctx.lineWidth = 4;

    let x: number = this.width / 2,
      y: number = this.height / 2,
      r: number = x - 3;
    console.log("test" + x + "," + y + "," + r);
    // 清空画布
    ctx.clearRect(0, 0, x * 2, y * 2);
    ctx.fillStyle = this._color.toString();
    ctx.strokeStyle = this._color.toString();
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
    this._pieClock.remove();
  }
}
