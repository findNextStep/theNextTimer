import { TheNextOnceTask } from "./theNextOnceTask";

/**
 * 任务对象抽象
 *
 * @interface ItheNextTask
 */
export interface ItheNextTask {
    /**
     * 获取任务启动时间
     *
     * @returns {Date} 任务的启动时间
     * @memberof ItheNextTask
     */
    getStartTime(): Date;
    /**
     * 获取任务对象描述
     *
     * @returns {string} 任务细节描述
     * @memberof ItheNextTask
     */
    getDescribe(): string;
    /**
     * 获取任务在某一天的任务
     *
     * @param {Date} theDay 需要查询的日子
     * @returns {ItheNextTask[]} 当日任务的列表
     * @memberof ItheNextTask
     */
    getDayWork(theDay: Date): ItheNextTask[];
    /**
     * 获取一个任务/任务组的所有任务
     *
     * @returns {TheNextOnceTask[]} 所有的任务的任务列表
     * @memberof ItheNextTask
     */
    getAllWork(): TheNextOnceTask[];
}
/**
 * 判断两个任务是否有冲突
 *
 * @param {ItheNextTask} task1 待比较的第一个任务
 * @param {ItheNextTask} task2 待比较的第二个任务
 * @returns {boolean} 是否有冲突
 */
function TaskConflict(task1: ItheNextTask, task2: ItheNextTask): boolean {
    for (const taskelement1 of task1.getAllWork()) {
        for (const taskelement2 of task2.getAllWork()) {
            if (taskelement1.getStartTime().getTime() < taskelement2.getEndTime().getTime()) {
                continue;
            }
            if (taskelement2.getStartTime().getTime() < taskelement1.getEndTime().getTime()) {
                continue;
            }
            return true;
        }
    }
    return false;
}
