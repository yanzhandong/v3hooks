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


export {
    Fn,
    debounce,
    throttle,
    throttleAndDeBounce
}