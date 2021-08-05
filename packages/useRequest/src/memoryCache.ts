
type Key = String | Symbol;
type Value = any;

/**
 * 内存型缓存
 * （ 简单Map实现 ）
 */
class MemoryCache {
    store: Map<Key,Value>;
    constructor(){
        this.store = new Map();
    }
    set( k: Key,v: Value ){
        this.store.set(k,v)
    }
    get( k: Key){
        return this.store.get(k);
    }
    has( k: Key ){
        return this.store.has(k);
    }
    delete( k: Key ){
        if( this.has( k ) ) this.store.delete(k);
    }
    size(){
        return this.store.size
    }
}


export default new MemoryCache()