import { ref, Ref, onUnmounted } from 'vue';
import { Fn } from '../utils';


const useTimeout = (
    fn: Fn,
    delay: Ref<number> | Ref<undefined> | Ref<null>
)=>{

    let timer: null | NodeJS.Timeout = null;
    
    const clear = ()=> timer && clearTimeout(timer)

    const handler = ()=>{
        if( delay.value === undefined || delay.value === null ) return
        fn();
    };

    const run = ()=>{
        if( delay.value === undefined || delay.value === null ){
            clear();
            return
        }
        setTimeout(handler,delay.value)
    }
    
    run()
    onUnmounted(()=> clear())
};

export default useTimeout