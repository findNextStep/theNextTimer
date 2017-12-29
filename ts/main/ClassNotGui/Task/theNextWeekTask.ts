import { TheNextOnceTask } from "./theNextOnceTask";
import { ItaskDescritbe, ItheNextTask } from "./theNextTaskInterface";

class TheNextWeekTask implements ItheNextTask {
    /**
     * 记录一个星期中有事情的日子
     */
    private weekForWrok: boolean[];
    /**
     * 记录事件的开始日期和开始时间
     */
    private startTime: Date;
    /**
     * 记录事件的结束日期和结束时间
     */
    private endTime: Date;
    private describe: ItaskDescritbe;
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
                    const endTime: Date = new Date();
                    endTime.setTime(newDay.getTime());
                    endTime.setHours(newDay.getHours());
                    endTime.setMinutes(newDay.getMinutes());
                    endTime.setSeconds(newDay.getSeconds());
                    const task: TheNextOnceTask = new TheNextOnceTask(newDay, endTime);
                    task.describe = this.describe;
                    AllWork.push(task);
                }
            }
        }
        return AllWork;
    }
    public getDayWork(day: Date) {
        const AllWork: TheNextOnceTask[] = [];
        if (this.weekForWrok[day.getDay()]) {
            const startTime = new Date();
            startTime.setTime(this.getStartTime().getTime());
            startTime.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
            const endTime = new Date();
            endTime.setTime(this.endTime.getTime());
            endTime.setFullYear(day.getFullYear(), day.getMonth(), day.getDate());
            const work: TheNextOnceTask = new TheNextOnceTask(startTime, endTime);
            work.describe = this.describe;
            AllWork.push(work);
        }
        return AllWork;
    }
}
