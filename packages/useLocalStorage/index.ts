import { ref, Ref, isRef, watch as vueWatch } from 'vue';

interface Options{
    watch: boolean
}

export type Serializer<T> = {
    read(raw: string): T
    write(value: T): string
}


const storage = localStorage;

const defaultOptions = {
    watch: true
}

// 格式化
export const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string', Serializer<any>> = {
    boolean: {
      read: (v: any) => v != null ? v === 'true' : null,
      write: (v: any) => String(v),
    },
    object: {
      read: (v: any) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
    number: {
      read: (v: any) => v != null ? Number.parseFloat(v) : null,
      write: (v: any) => String(v),
    },
    any: {
      read: (v: any) => (v != null && v !== 'null') ? v : null,
      write: (v: any) => String(v),
    },
    string: {
      read: (v: any) => v != null ? v : null,
      write: (v: any) => String(v),
    },
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

    const defaultValue = data.value;
    
    const type = defaultValue == null
        ? 'any'
        : typeof defaultValue === 'boolean'
        ? 'boolean'
        : typeof defaultValue === 'string'
            ? 'string'
            : typeof defaultValue === 'object'
            ? 'object'
            : Array.isArray(defaultValue)
                ? 'object'
                : !Number.isNaN(defaultValue)
                ? 'number'
                : 'any';

    // 判断类型取格式化方法
    let serializer = StorageSerializers[type];


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