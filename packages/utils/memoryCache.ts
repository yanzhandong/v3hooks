
interface Timer {
    [key:string]: NodeJS.Timeout
}
interface Options{
    maxCache?: number
}

class MemoryCache{
    memoryCache: Map<string,any>
    timer: Timer
    maxCache: number
    constructor(options?:Options){
        this.memoryCache = new Map();
        this.timer = {};
        this.maxCache = options?.maxCache || 1000;
    }

    /**
     * 增加缓存
     * @param key 
     * @param value 
     * @param time 
     * @param timeoutCallback 
     */
    put(
        key: string,
        value: any,
        time?: number,
        timeoutCallback?: ()=>{}
    ){
        if( !key || !value){
            throw new Error('key & value is required')
        }
        if( this.size() >= this.maxCache){
            this.del(
                [...this.memoryCache][0][0]
            )
        }
        
        this.memoryCache.set(key,value);

        if(
            time 
            && typeof time === 'number' 
            && time > 0
        ){
            this.timer[key] = setTimeout(()=>{
                this.del(key)
                delete this.timer[key]
                timeoutCallback && timeoutCallback()
            },time)
        }
    };

    /**
     * 获取缓存
     * @param key 
     * @returns 
     */
    get(
        key: string
    ){
        if( !this.has(key) ) return null
        return this.memoryCache.get(key);
    };

    /**
     * 判断是否有缓存
     * @param key 
     * @returns 
     */
    has(
        key: string
    ){
        return this.memoryCache.has(key);
    }

    /**
     * 删除缓存
     * @param key 
     * @returns 
     */
    del(
        key: string
    ){
        if( !this.has(key ) ) return
        if( this.timer[key] ){
            clearTimeout( this.timer[key] )
            delete this.timer[key]
        }
        this.memoryCache.delete(key)
    }

    /**
     * 清除缓存
     * @returns 
     */
    clear(){
        if( this.size() <= 0) return
        this.memoryCache.clear()
        for( let i in this.timer){
            clearTimeout( this.timer[i] )
            delete this.timer[i]
        }
    }

    /**
     * 获取缓存条数
     * @returns 
     */
    size(){
        return this.memoryCache.size
    }
}

export default MemoryCache