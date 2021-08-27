import { ref, Ref, onMounted, onUnmounted, isRef } from 'vue';
import { Fn } from '../utils';

interface UseIntervalOptions{
    immediate?: boolean
}

const defaultOptions = {
    immediate: false,
};

const useInterval = (
    fn: Fn,
    delay: number | Ref<number | undefined | null>,
    options?: UseIntervalOptions
)=>{

    const{
        immediate
    } = {...defaultOptions,...options};
    
    const state = isRef(delay) ? delay : ref(delay);

    if( immediate ) fn()

    let timer: null | NodeJS.Timeout = null;
    
    const clear = ()=> timer && clearTimeout(timer)

    const handler = ()=>{
        if( state.value === undefined || state.value === null ) return
        fn();
        run();
    };

    const run = ()=>{
        if( state.value === undefined || state.value === null ){
            clear();
            return
        }
        setTimeout(handler,state.value)
    }
    
    run();

    onUnmounted(()=> clear() )
};

export default useInterval