export interface ITimer {
  /**
   * 使计时器启动
   * let the timer start
   *
   * @memberof ITimer
   */
  start(): void;

  /**
   * pause timer
   * @returns is running now
   */
  pause(): boolean;

  /**
   * stop the timer
   * @memberof ITimer
   */
  stop(): void;
  /**
   * 设置时钟的颜色
   * set the Timer color
   * @param  {number} r the red color number 0~255
   * @param  {number} g the green color number 0~255
   * @param  {number} b the blue color number 0~255
   * @returns void
   */
  setColor(r: number, g: number, b: number): void;

  /**
   * setting timer start time and contain time
   * @param  {Date} startTime when the timer start
   * @param  {number} contain how long we cost in millisecond or when the timer end
   * @returns void
   */
  setTime(startTime: Date, contain: number | Date): void;
}
export abstract class TimerBase implements ITimer {
  /**
   * get now time value
   * @returns number
   */
  public static getNowTime(): number {
    return new Date().valueOf();
  }
  protected startTime: number;
  protected containTime: number;
  private timer: NodeJS.Timer;
  private isRunning: boolean;
  constructor(startTime: Date, contain: number | Date) {
    this.setTime(startTime, contain);
  }
  /**
   * destory the Timer element
   * @returns void
   */
  public abstract destory(): void;
  public abstract setColor(r: number, g: number, b: number): void;

  public start(): void {
    this.timer = setInterval(() => {
      // if time over
      if (new Date().valueOf() >= this.startTime + this.containTime) {
        this.stop();
        return;
      } else {
        this.setProgtessByNow();
      }
      // 刷新时间应当保证画面流畅并实际不高于60帧
      // The refresh time should ensure that the
      // picture is smooth and not more than 60 frames.
    }, Math.max(this.computingTimeInterval(), 1000 / 60));
    // start a draw right now
    this.setProgtessByNow();
    this.isRunning = false;
  }
  public stop(): void {
    clearInterval(this.timer);
    this.isRunning = false;
  }
  public pause(): boolean {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
    return this.isRunning;
  }
  /**
   * 使用当前时间计算形状
   * Use the current time to
   * calculate the shape
   * @memberof TimerBase
   */
  public setProgtessByNow(): void {
    this.progressChange((TimerBase.getNowTime() - this.startTime) / this.containTime);
  }
  /**
   * 设定计时器的时间
   * Setting the time of the timer
   *
   * @param {Date} startTime
   *                计时的启动时间
   *                when the timer start
   * @param {number} contain
   *                计时的持续时间或者结束时间
   *                how long will it continue or end time
   * @memberof TimerBase
   */
  public setTime(startTime: Date, contain: number | Date): void {
    this.startTime = startTime.getTime();
    if (contain instanceof Date) {
      this.containTime = contain.getTime() - startTime.getTime();
    } else if (!isNaN(contain)) {
      this.containTime = contain;
    }
  }
  /**
   * 获取最小刷新时间
   * Get the minimum refresh time
   * @protected
   * @abstract
   * @returns {number} minimu refresh time
   * @memberof TimerBase
   */
  protected abstract computingTimeInterval(): number;
  /**
   * made the progress change to one state
   * @param  {number} progress 0<progress<1;
   */
  protected abstract progressChange(progress: number): void;
}
