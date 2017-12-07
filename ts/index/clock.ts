interface Iclock {
  /**
   * 使计时器启动
   * let the clock start
   *
   * @memberof Iclock
   */
  start(): void;

  /**
   * pause timer
   * @returns is running now
   */
  pause(): boolean;

  /**
   * stop the timer
   * @memberof Iclock
   */
  stop(): void;
  /**
   * 设置时钟的颜色
   * set the clock color
   * @param  {number} r the red color number
   * @param  {number} g the green color number
   * @param  {number} b the blue color number
   * @returns void
   */
  setColor(r: number, g: number, b: number): void;

  /**
   * setting timer start time and contain time
   * @param  {Date} startTime when the timer start
   * @param  {number} contain how long we cost in millisecond
   * @returns void
   */
  setTime(startTime: Date, contain: number): void;
}
abstract class ClockBase implements Iclock {
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
  constructor(startTime: Date, contain: number) {
    this.setTime(startTime, contain);
  }
  /**
   * destory the clock element
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
   * @memberof ClockBase
   */
  public setProgtessByNow(): void {
    this.progressChange((ClockBase.getNowTime() - this.startTime) / this.containTime);
  }
  /**
   * 设定计时器的时间
   * Setting the time of the timer
   *
   * @param {Date} startTime
   *                计时的启动时间
   *                when the timer start
   * @param {number} contain
   *                计时的持续时间
   *                how long will it continue
   * @memberof ClockBase
   */
  public setTime(startTime: Date, contain: number): void {
    this.startTime = startTime.getTime();
    this.containTime = contain;
  }
  /**
   * 获取最小刷新时间
   * Get the minimum refresh time
   * @protected
   * @abstract
   * @returns {number} minimu refresh time
   * @memberof ClockBase
   */
  protected abstract computingTimeInterval(): number;
  /**
   * made the progress change to one state
   * @param  {number} progress 0<progress<1;
   */
  protected abstract progressChange(progress: number): void;
}
