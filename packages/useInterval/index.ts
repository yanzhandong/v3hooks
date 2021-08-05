import { ref, Ref, onMounted, onUnmounted } from 'vue';
import { Fn } from '../utils';

interface UseIntervalOptions{
    immediate?: boolean
}

const defaultOptions = {
    immediate: false,
};

const useInterval = (
    fn: Fn,
    delay: Ref<number> | Ref<undefined> | Ref<null>,
    options?: UseIntervalOptions
)=>{

    const{
        immediate
    } = {...defaultOptions,...options};

    if( immediate ) fn()

    let timer: null | NodeJS.Timeout = null;
    
    const clear = ()=> timer && clearTimeout(timer)

    const handler = ()=>{
        if( delay.value === undefined || delay.value === null ) return
        fn();
        run();
    };

    const run = ()=>{
        if( delay.value === undefined || delay.value === null ){
            clear();
            return
        }
        setTimeout(handler,delay.value)
    }
    
    run();

    onUnmounted(()=> clear() )
};

export default useInterval