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
  public setTime(startTime: Date, contain: number): void {
    this._start_time = startTime.getTime();
    this._contain_time = contain;
  }
}
