import { Fn, throttle } from '../utils'

const defaultDelay = 1000;

/**
 * 处理节流函数
 * @param fn 
 * @param delay 
 * @returns 
 */
const useThrottleFn = ( fn:Fn, delay?: number )=>{
    const run = throttle( fn, typeof( delay ) === 'number'? delay : defaultDelay );
    return { run };
}


export default useThrottleFn