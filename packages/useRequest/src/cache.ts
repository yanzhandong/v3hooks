
import memoryCache from '../../utils/memoryCache'

const handleResCache = (
    data: any,
    resCache: memoryCache,
    cacheKey?: string,
    cacheTime?: number,
)=>{
    if( cacheKey ){
        if( resCache.has(cacheKey)){
            resCache.put(cacheKey,data)
            return
        }
        resCache.put(cacheKey,data,cacheTime)
    }
} 

export {
    handleResCache
}