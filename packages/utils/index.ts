type Fn = (...[]: any[])=> any; 

/**
 * 防抖
 * @param fn 
 * @param delay 
 * @returns 
 */
const debounce = (fn:Fn,delay:number)=>{
    let timer: NodeJS.Timeout| null = null;
    return function(...args:[]){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            // @ts-ignore
            fn.call(this,...args)
        },delay)
    }
}

/**
 * 节流
 * @param fn 
 * @param delay 
 * @returns 
 */
const throttle = (fn:Fn,delay:number)=>{
    let oldNow = Date.now();
    return function(...args:[]){
        const currNow = Date.now();
        if( currNow - oldNow < delay) return
        oldNow = currNow;
        // @ts-ignore
        fn.call(this,...args)
    }
}

/**
 * 防抖+节流
 * @param fn 
 * @param DBdelay 
 * @param TRdelay 
 * @returns 
 */
const throttleAndDeBounce = (fn:Fn,DBdelay:number,TRdelay:number)=>{
    let oldNow = Date.now();
    let timer: NodeJS.Timeout| null = null;
    return function(...args:[]){
        const currNow = Date.now();
        if( currNow - oldNow < TRdelay){
            if(timer) clearTimeout(timer);
            timer= setTimeout(()=>{
                oldNow = currNow;
                // @ts-ignore
                fn.call(this,...args)
            },DBdelay)
            return
        }
        oldNow = currNow;
        // @ts-ignore
        fn.call(this,...args)
    }
};

type Serializer<T> = {
    read(raw: string): T
    write(value: T): string
}

/**
 * 按照类型格式数据的常量Map
 */
const TypeSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string', Serializer<any>> = {
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

/**
 * 获取数据类型
 * @param defaultValue 
 * @returns 
 */
const getValueType = (defaultValue:unknown)=>{
    return defaultValue == null
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
};



export {
    Fn,
    debounce,
    throttle,
    throttleAndDeBounce,
    TypeSerializers,
    getValueType
}