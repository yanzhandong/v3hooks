/**
 * loading的延迟计算
 * @param startTime 
 * @param loadingDelay 
 * @param args 
 * @returns 
 */
let loadingDelayTimer:NodeJS.Timeout | null = null;
export const loadingDelayAsync = ( loadingDelay:number)=>{
    clearLoadingDelayTimer();
    return new Promise((resolve)=>{
        loadingDelayTimer = setTimeout(()=> resolve(loadingDelayTimer),Math.max( loadingDelay, 0 ) );
    })
};

/**
 * 取消loading延迟计算Timer
 */
export const clearLoadingDelayTimer = ()=>{
    if( loadingDelayTimer ){
        clearTimeout(loadingDelayTimer)
    }
} 