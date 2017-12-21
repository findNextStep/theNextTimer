/**
 *  任务对象抽象
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
}
