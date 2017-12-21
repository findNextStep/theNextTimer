import { ItheNextTask } from "./theNextTaskInterface";
/**
 * 一个一次性任务的描述
 *
 * @class TheNextOnceTask
 * @implements {ItheNextTask}
 */
export class TheNextOnceTask implements ItheNextTask {
    private startTime: Date;
    private endTime: Date;
    private Describe: string;
    constructor(startTime: Date, endTime: Date) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public getStartTime() {
        return this.startTime;
    }
    public getDayWork(day: Date): ItheNextTask[] {
        const result: ItheNextTask[] = [];
        if (this.startTime.getTime() < day.getTime()) {
            result.push(this);
        }
        return result;
    }
    public getDescribe(): string {
        return this.Describe;
    }
    /**
     * 设置任务对象的细节描述
     *
     * @memberof TheNextOnceTask
     */
    public set describe(describe: string) {
        this.Describe = describe;
    }
}
