/**
 * loading的延迟计算
 * @param startTime 
 * @param loadingDelay 
 * @param args 
 * @returns 
 */
const loadingDelayAsync = <T>( startTime: number, loadingDelay:number,...args:[T])=>{
    const endTime = +new Date();
    return new Promise<T>((resolve)=>{
        const timeGap = endTime - startTime;
        if(  timeGap < loadingDelay ){
            setTimeout(()=> resolve(...args),Math.max( loadingDelay - timeGap, 0 ) );
            return
        }
        resolve(...args);
    })
};

export {
    loadingDelayAsync
}