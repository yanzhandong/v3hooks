import { ref, Ref, isRef, watch as vueWatch } from 'vue';
import { TypeSerializers,getValueType } from '../utils'
const storage = localStorage;
interface Options{
    watch: boolean
}

const defaultOptions = {
    watch: true
}



const useLocalStorage = <T = any>( key: string, initialValue?: T | Ref<T>, options?:Options)=>{
    
    const { watch } = { ...defaultOptions, ...options };
    
    const data = ref() as Ref<T | undefined | null>;
    try{
        if( initialValue !== undefined ){
            data.value = isRef( initialValue ) ? initialValue.value : initialValue;
        }else{
            data.value = JSON.parse( storage.getItem(key) || '{}' );
        }
    }catch(error){
        console.log(error,'useLocalStorage初始化失败')
    }

    const type = getValueType(data.value);

    // 判断类型取格式化方法
    let serializer = TypeSerializers[type];


    const setStorage = ()=> storage.setItem( key, serializer.write(data.value) );;

    // 状态监听
    if( watch ){
        vueWatch(
            data,
            (newValue)=>{
                if( newValue === undefined || newValue === null ){
                    storage.removeItem(key);
                    return
                }
                setStorage();
            },
            {
                deep:true
            }
        )
    }
    
    setStorage()

    return data
};

export default useLocalStorage