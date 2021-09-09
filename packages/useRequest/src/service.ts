
import fetchData from './fetch'
import MemoryCache from '../../utils/memoryCache'

const argsSymbolKey = 'argsKey';

const serveiceProxy = async (service: any, args: any[], reqParamsCache: MemoryCache)=>{
    try{
        if( args.length > 0 ){
            reqParamsCache.put(argsSymbolKey,args);
        }
        if( Object.prototype.toString.call(service) === "[object Function]"){
            return await service(...args);
        }
        if( Object.prototype.toString.call(service) === "[object Object]" ){
            const response = await fetchData(service);
            return response.json()
        }
    }catch(error){
        return Promise.reject(error)
    }
}


export { serveiceProxy, argsSymbolKey }