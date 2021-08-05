
import fetchData from './fetch'
import memoryCache from './memoryCache'

const argsSymbolKey = Symbol('argsKey');

const serveiceProxy = async (service: any, args: any[])=>{
    try{
        if( args.length > 0 ){
            memoryCache.set(argsSymbolKey,args);
        }
        if( Object.prototype.toString.call(service) === "[object Function]"){
            return await service(...args);
        }
        if( Object.prototype.toString.call(service) === "[object Object]" ){
            const response = await fetchData(service);
            return response.json()
        }
    }catch(error){
        console.error(error);
    }
}


export { serveiceProxy, argsSymbolKey }