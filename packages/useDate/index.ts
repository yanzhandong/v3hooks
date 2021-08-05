import { ref, readonly } from 'vue';
import dayjs from 'dayjs';


const defaultOptions ={
    format: 'YYYY-MM-DD HH:mm:ss',
    method: 'format'
};

type Value =  string | number | Date;

interface Options{
    format?: string
    method?: 'format' | 'millisecond' | 'second' | 'minute' | 'hour' | 'date' |'day'  | 'month' | 'year',
    methodParam?: number 
}

function useDate(
    value?: Value | undefined, 
    options?: Options
): {
    readonly data: any,
    refresh: (refreshValue?: Value) => void;
}

function useDate( initialValue?:Value, options?: Options ){
    
    const state = ref<string>();
    
    let value = initialValue || +new Date();
    const {
        format,
        method,
        methodParam
    } = { ...defaultOptions, ...options }


    const refresh = ( refreshValue?:Value )=>{
        console.log(refreshValue);
        value = refreshValue || +new Date();
        switch( method ){
            case 'format':
                state.value = dayjs(value).format(format);
                break;
            case undefined :
                break;
            default:
                let data: any = dayjs(value);
                if( methodParam ){
                    data = data[method](methodParam);
                    if( options && options.format ){
                        data = data.format(format);
                    }
                }
                state.value = data
        }
       
    };

    refresh();

    const data = readonly( state);

    return {
        data,
        refresh
    }
};


export default useDate