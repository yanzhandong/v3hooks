import { ref } from 'vue';

type ArgsAny = any[];

type Fn = (...args: ArgsAny)=> Promise<any>;

const useLockFn = (fn: Fn)=>{
    const lock = ref(false);
    return async( ...args: ArgsAny )=>{
        if( lock.value ) return
        lock.value = true;
        try{
            const ret = await fn(...args);
            lock.value = false;
            return ret;
        }catch ( error ){
            lock.value = false;
            throw error;
        }
    }
};

export default useLockFn