import { ItaskDescritbe, ItheNextTask } from "./theNextTaskInterface";
/**
 * 一个一次性任务的描述
 *
 * @class TheNextOnceTask
 * @implements {ItheNextTask}
 */
export class TheNextOnceTask implements ItheNextTask {
    /**
     * 任务的启动时间
     *
     * @private
     * @type {Date}
     * @memberof TheNextOnceTask
     */
    private startTime: Date;
    /**
     * 任务的结束时间
     *
     * @private
     * @type {Date}
     * @memberof TheNextOnceTask
     */
    private endTime: Date;
    /**
     * 任务细节描述
     *
     * @private
     * @type {ItaskDescritbe}
     * @memberof TheNextOnceTask
     */
    private Describe: ItaskDescritbe;
    constructor(startTime: Date, endTime: Date) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public getStartTime() {
        return this.startTime;
    }
    public getEndTime(): Date {
        return this.endTime;
    }
    public getDayWork(day: Date): ItheNextTask[] {
        const result: ItheNextTask[] = [];
        if (this.startTime.getTime() < day.getTime()) {
            result.push(this);
        }
        return result;
    }
    public getDescribe() {
        return this.Describe;
    }
    public getAllWork() {
        const array = [];
        array.push(this);
        return array;
    }
    /**
     * 设置任务对象的细节描述
     *
     * @memberof TheNextOnceTask
     */
    public set describe(describe: ItaskDescritbe) {
        this.Describe = describe;
    }
}
