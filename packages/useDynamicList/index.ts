import { ref, Ref, isRef } from 'vue';

const useDynamicList = <T = any>(initialValue: Ref<T[]>)=>{

    let uuid = <number>(0);
    const uuidKeys = ref<number[]>([]);

    const setUUID = (index?:number)=>{
        index = index === undefined ? uuidKeys.value.length : index;
        uuidKeys.value.splice( index, 0 ,uuid++ );
    };

    (()=>{
        initialValue.value.forEach(()=> setUUID() );
    })()

    const resetList = (resetList: Ref<T[]> | T[])=>{
        uuidKeys.value = [];
        if( isRef(resetList) ){
            resetList.value.forEach(()=> setUUID() );
            initialValue = resetList;
            return
        }
        resetList.forEach(()=> setUUID() );
        initialValue.value = resetList;
    };

    const insert = (index: number, obj: T)=>{
        initialValue.value.splice( index, 0, obj);
        setUUID(index);
    };

    const merge = (index: number, obj: T[])=>{
        obj.forEach((active,i) => setUUID(index + i) );
        initialValue.value.splice( index, 0, ...obj);
    };

    const replace = (index: number, obj: T)=>{
        initialValue.value.splice( index, 1, obj);
    };

    const remove = (index: number)=>{
        uuidKeys.value.splice( index, 1);
        initialValue.value.splice( index, 1);
    };

    const move = (oldIndex: number, newIndex: number)=>{
        if (oldIndex === newIndex)  return;
        [ initialValue.value[oldIndex], initialValue.value[newIndex] ] = [ initialValue.value[newIndex], initialValue.value[oldIndex] ];
        [ uuidKeys.value[oldIndex], uuidKeys.value[newIndex] ] = [ uuidKeys.value[newIndex], uuidKeys.value[oldIndex] ];
    };

    const getKey = (index: number)=> uuidKeys.value[index];
    const getIndex = (key: number)=> uuidKeys.value.indexOf(key);

    const push = (obj: T)=>{
        initialValue.value.push( obj );
        setUUID();
    };

    const pop = ()=>{
        initialValue.value.pop();
        uuidKeys.value.pop();
    };

    const unshift = (obj: T)=>{
        initialValue.value.unshift( obj );
        setUUID(0);
    };

    const shift = ()=>{
        initialValue.value.shift();
        uuidKeys.value.shift();
    };

    return {
        list: initialValue,
        resetList,
        insert,
        merge,
        replace,
        remove,
        move,
        getKey,
        getIndex,
        push,
        pop,
        unshift,
        shift
    }
}


export default useDynamicList