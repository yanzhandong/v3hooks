import { 
    BaseOptions,
    Result,
    Run,
    Cancel
} from './types';
import { 
    shallowRef, 
    ref, 
    watch
} from 'vue';
import { 
    debounce, 
    throttle, 
    throttleAndDeBounce 
} from '../utils';
import { loadingDelayAsync } from './src/tools';
import { serveiceProxy, argsSymbolKey } from './src/service';
import Polling from './src/polling';
import { visibility } from './src/visibility';
import memoryCache from './src/memoryCache'



// 默认参数
const defaultOptions = {
    manual: false, // 是否开启手动
    defaultParams: [], //如果 manual=false ，自动执行 run 的时候，默认带上的参数
    pollingInterval: 0, // 轮询请求时间
    pollingWhenHidden: true, // 屏幕不可见时，暂时暂停定时任务
    ready: undefined, // 依赖请求
    debounceInterval: undefined, // 防抖
    throttleInterval: undefined, // 节流
    refreshOnWindowFocus: false, // 屏幕聚焦重新请求
    focusTimespan: undefined, // 屏幕聚焦重新间隔
    loadingDelay: 0, // loading延迟时间
    refreshDeps: [], //依赖刷新监听
};


const useRequest = <T>(service: any,options?:BaseOptions )=>{
     
    const { 
        manual,
        defaultParams,
        pollingInterval,
        pollingWhenHidden,
        ready,
        debounceInterval,
        throttleInterval,
        refreshOnWindowFocus,
        focusTimespan,
        loadingDelay,
        refreshDeps
    } = { ...defaultOptions, ...options };

    const data = shallowRef<T | undefined>(undefined);
    const loading = ref(true);
    const cancel = ref<Cancel>(undefined);


    // 执行轮询
    const pollingRun = ()=>{
        if( pollingInterval < 4 || Polling.isActive){
            return
        }
        Polling.run( run, pollingInterval, pollingWhenHidden );
        cancel.value = ()=>{ Polling.cancel() };
    };

    // 执行网络请求
    let run:Run = (...args: any[])=>{

        loading.value = true;

        // 设定请求开始时间
        const startTime = +new Date();

        serveiceProxy( service, args ).then((responseData)=>{
            //loading延迟计算
            return loadingDelayAsync( startTime, loadingDelay, responseData );
        }).then(( responseData )=>{
            data.value = responseData as any;
            loading.value = false;
        });
        // 非激活状态执行轮询
        pollingRun()
    };

    const refresh = ()=>{
        const args = memoryCache.get(argsSymbolKey);
        run(...args)
    };


    // 是否自动执行
    if( !manual && ready === undefined){

        // 是否携带默认参数
        defaultParams.length > 0 ? run(...defaultParams) : run()

        // 是否执行轮询
        pollingRun()
    }


    //监听依赖请求是否执行
    watch([ready],(curr)=>{
        if( curr[0]?.value === true){
            refresh()
        }
    },{ deep: true })

    //多个监听依赖请求是否执行
    watch(refreshDeps,()=> refresh() , { deep: true });

    
    // 防抖+节流
    if( 
        debounceInterval !== undefined 
        && throttleInterval !== undefined
        && typeof(debounceInterval) === 'number'
        && typeof(throttleInterval) === 'number'
    ){
        run = throttleAndDeBounce(run,debounceInterval,throttleInterval);
    }else{
        // 防抖
        if( 
            debounceInterval !== undefined 
            && typeof(debounceInterval) === 'number'
        ){
            run = debounce(run,debounceInterval)
        }

        // 节流
        if(
            throttleInterval !== undefined 
            && typeof(throttleInterval) === 'number'
        ){
            run = throttle(run,throttleInterval)
        }
    }

    // 屏幕聚焦重新请求
    if(refreshOnWindowFocus === true){
        visibility( refresh, focusTimespan );
    }


    // 突变改变data值
    const mutate = (state:any)=>{
        data.value = state;
    };


    // 返回值
    const res: Result<T> = {
        data,
        run,
        refresh,
        loading,
        cancel,
        mutate
    };

    return res
};



export default useRequest