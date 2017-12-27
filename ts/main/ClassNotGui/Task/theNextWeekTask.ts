import { TheNextOnceTask } from "./theNextOnceTask";
import { ItheNextTask } from "./theNextTaskInterface";

class TheNextWeekTask implements ItheNextTask {
    /**
     * 记录一个星期中有事情的日子
     */
    private weekForWrok: boolean[];
    private startTime: Date;
    private endTime: Date;
    private describe: string;
    constructor() {
        this.weekForWrok = [];
        this.weekForWrok.length = 7;
    }
    public getStartTime() {
        return this.startTime;
    }
    public getDescribe() {
        return this.describe;
    }
    public getAllWork() {
        const AllWork: TheNextOnceTask[] = [];
        for (const i in this.weekForWrok) {
            if (this.weekForWrok[i]) {
                const newDay = new Date();
                newDay.setTime(this.startTime.getTime());
                while (newDay.getDay() !== Number(i)) {
                    // 日期增加一天直至正确
                    newDay.setTime(newDay.getTime() + 1000 * 60 * 60 * 24);
                }
                while (newDay.getTime() < this.endTime.getTime()) {
                    const task: TheNextOnceTask = new TheNextOnceTask(newDay, null);
                }
            }
        }
        return null;
    }
    public getDayWork(day: Date) {
        return null;
    }
}
