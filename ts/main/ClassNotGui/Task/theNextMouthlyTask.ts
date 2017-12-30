import { ItaskDescritbe, ItheNextTask } from "./theNextTaskInterface";

class TheNextMouthlyTask implements ItheNextTask {
    /**
     * 记录一年中需要活动的时间
     *
     * @private
     * @type {boolean[]}
     * @memberof TheNextMouthlyTask
     */
    private mouthForWrok: boolean[];
    /**
     * 设置每一周的工作日
     *
     * @private
     * @type {number[]}
     * @memberof TheNextMouthlyTask
     */
    private workDay: number[];
    /**
     * 记录任务的开始时间
     *
     * @private
     * @type {Date}
     * @memberof TheNextMouthlyTask
     */
    private startTime: Date;

    /**
     * 记录任务的结束时间
     *
     * @private
     * @type {Date}
     * @memberof TheNextMouthlyTask
     */
    private endTime: Date;

    private startYear: number;
    private endYear: number;

    private describe: ItaskDescritbe;


    constructor(startTime: Date, endTime: Date) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.mouthForWrok = [];
        this.mouthForWrok.length = 12;
        this.workDay = [];
        this.workDay.length = 31;
    }
    public getStartTime() {
        return this.startTime;
    }

    public getDescribe() {
        return this.describe;
    }

    public getAllWork() {
        const startTime = new Date();

        return [];
    }

    public getDayWork(day: Date) {
        return [];
    }

    public set Describe(d: ItaskDescritbe) {
        this.describe = d;
    }
}
