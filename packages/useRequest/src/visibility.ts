import { Run } from '../types'
import { throttle } from '../../utils'


/**
 * 监听屏幕是否聚焦
 * @param run 
 * @param focusTimespan 
 */
const visibility = (run:Run ,focusTimespan?: undefined | number)=>{
    let handler = ()=> {
        if (!document.hidden) {
            run()
        }
    };
    if(focusTimespan !== undefined && typeof(focusTimespan) === 'number'){
        handler = throttle(handler,focusTimespan);
    }
    document.addEventListener('visibilitychange',handler );
}

export { visibility }