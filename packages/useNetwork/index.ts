import { reactive, onMounted, onUnmounted } from "vue";


const getConnection = ()=> {
    const nav = navigator as any;
    if (typeof nav !== 'object') return null;
    return nav.connection || nav.mozConnection || nav.webkitConnection;
}


export interface NetworkState {
    since?: number | Date;
    online?: boolean;
    rtt?: number;
    type?: string;
    downlink?: number;
    saveData?: boolean;
    downlinkMax?: number;
    effectiveType?: string;
  }
  

const handlerSetConnection = ()=>{
    const connection = getConnection();
    return {
        rtt: connection.rtt,
        type: connection.type,
        saveData: connection.saveData,
        downlink: connection.downlink,
        downlinkMax: connection.downlinkMax,
        effectiveType: connection.effectiveType,
    } as NetworkState;
};

const useNetwork = ()=>{
    const state = reactive<NetworkState>({
        online: navigator.onLine,
        since: +new Date(),
        ...handlerSetConnection()
    });

    const onOnline = ()=>{
        state.online = true;
        state.since = +new Date();
    };

    const onOffline = ()=>{
        state.online = false;
        state.since = +new Date();
    };

    const onConnectionChange = <T extends keyof NetworkState>() => {
        const connectionData = handlerSetConnection();
        Object.keys(connectionData).forEach((key)=>{
            let propertyKey = key as T;
            state[propertyKey] = connectionData[propertyKey];
        })
    };

    onMounted(()=>{
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
        getConnection()?.addEventListener('change', onConnectionChange);
    })

    onUnmounted(()=>{
        window.removeEventListener('online',onOnline);
        window.removeEventListener('offline',onOffline);
        getConnection()?.removeEventListener('change', onConnectionChange);
    })
    
    return state
}

export default useNetwork