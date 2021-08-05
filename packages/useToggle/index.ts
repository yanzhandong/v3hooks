import { ref, Ref } from 'vue';


type State = string | number | boolean | undefined;

// interface Actions {
//     [index:number]: any
// };

type Fn = (v?:any)=> void;

type Actions = Fn[];


function useToggle<T = State>(
    ...args:T[]
): [T,Actions]


/**
 * 用于在N个状态值间切换。
 * @param args 
 * @returns 
 */
function useToggle<T extends State>(...args:T[]){
    const state = ref(args[0]) as Ref<T>;
    let currIndex = 0;
    const len = args.length;

    const toggle = (v?:T)=>{
        // 直接设置值
        if( v !== undefined && args.includes(v)){
            state.value = v;
            return
        }
        // 顺序变化
        currIndex = currIndex + 1 > len - 1 ? 0 : currIndex + 1;
        state.value = args[currIndex];
    };

    const createHandle = ()=>{
        return args.map((value,index)=>{
            return ()=>{
                state.value = value;
                currIndex = index;
            }
        })
    };

    const actions: Actions = [ toggle, ...createHandle() ];
    
    return [ state, actions ]
}

export default useToggle