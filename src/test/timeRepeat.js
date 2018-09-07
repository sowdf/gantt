const timeRepeat = (targetStartTime, targetEndTime, startTime, endTime) => {
    //如果满足这个条件 表示  时间有重合 targetStartTime < endTime && targetEndTime > startTime
    //表示没有重合
    if (!(targetStartTime < endTime && targetEndTime > startTime)) {
        return false;
    }
    //
    /*
    *        |________________| targetTime
    *  |_____________|   time
    *
    * */
    if (targetStartTime > startTime && targetEndTime > endTime) {
        //计算重合时间段 开始时间
        let repeatStartTime = targetStartTime;
        //计算重合时间段 结束时间
        let repeatEndTime = endTime;
        return {start : repeatStartTime, end : repeatEndTime};
    }
    /*
    *        |________________| targetTime
    *                   |_____________|   time
    *
    * */
    if (targetStartTime < startTime && targetEndTime < endTime) {
        //计算重合时间段 开始时间
        let repeatStartTime = startTime;
        //计算重合时间段 结束时间
        let repeatEndTime = targetEndTime;
        return {start : repeatStartTime, end : repeatEndTime};
    }
    /*
    *        |____________________| targetTime
    *           |_____________|   time
    *
    * */
    if (targetStartTime <= startTime && targetEndTime >= endTime) {
        //计算重合时间段 开始时间
        let repeatStartTime = startTime;
        //计算重合时间段 结束时间
        let repeatEndTime = endTime;
        return {start : repeatStartTime, end : repeatEndTime};
    }
    /*
      *        |____________________| targetTime
      *     |___________________________|   time
      *
      * */
    if (targetStartTime > startTime && targetEndTime < endTime) {
        //计算重合时间段 开始时间
        let repeatStartTime = targetStartTime;
        //计算重合时间段 结束时间
        let repeatEndTime = targetEndTime;
        return {start : repeatStartTime, end : repeatEndTime};
    }
};

export default timeRepeat;