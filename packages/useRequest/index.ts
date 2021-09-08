import { 
    BaseOptions,
    Result,
    Run,
    Service,
    FetchService,
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
import { handleResCache } from './src/cache'
import memoryCache from '../utils/memoryCache'

// service请求参数缓存
const reqCache = new memoryCache();

// 请求参数缓存
const resCache = new memoryCache();


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
    cacheTime: 300000, //缓存数据回收时间
    staleTime: 0, //缓存数据新鲜时间
};


const useRequest = <T>(service: Service | FetchService,options?:BaseOptions )=>{
     
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
        refreshDeps,
        cacheKey,
        cacheTime,
        staleTime
    } = { ...defaultOptions, ...options };

    const data = shallowRef<T | undefined>(undefined);
    const loading = ref(true);
    const cancel = ref<Cancel>(undefined);
    const latestTime = ref<number>(0);


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
        
        // 请求开始时间
        const reqTime = +new Date();

        // 判断开启缓存 && 有缓存，先返回缓存
        // 缓存修改并不会阻止顺序执行，service请求会继续发出
        // 也就是所谓SWR能力
        if( cacheKey && resCache.has(cacheKey)){
            data.value = resCache.get(cacheKey)
            
            if( latestTime.value + staleTime > reqTime ){
                return
            }
        }else{
            loading.value = true;
        }

        
        // 更新最新一次请求开始时间
        latestTime.value = reqTime;

        serveiceProxy( service, args, reqCache ).then((responseData)=>{
            //loading延迟计算
            return loadingDelayAsync( latestTime.value, loadingDelay, responseData );
        }).then(( responseData )=>{
            data.value = responseData as any;
            loading.value = false;

            // 处理缓存
            handleResCache(
                responseData,
                resCache,
                cacheKey,
                cacheTime
            )
        });
        // 非激活状态执行轮询
        pollingRun()
    };

    const refresh = ()=>{
        const args = reqCache.get(argsSymbolKey);
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