import { Ref, ref } from "vue";
import useTimeout from '../useTimeout'

interface UseWebSocketOptions {
    manual?: boolean,
    reconnectLimit?: number,
    reconnectInterval?: number,
    onOpen?: (event:WebSocketEventMap['open'])=> void,
    onClose?: (event:WebSocketEventMap['close'])=> void,
    onMessage?: (event:WebSocketEventMap['message'])=> void,
    onError?: (event:WebSocketEventMap['error'])=> void,
}
enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
}
interface Result{
    latestMessage: Ref<WebSocketEventMap['message'] | undefined>;
    sendMessage: WebSocket['send'];
    disconnect: () => void;
    connect: () => void;
    readyState: Ref<ReadyState>;
    webSocketIns: Ref<WebSocket | undefined>;
}

const defaultOptions = {
    manual: false,
    reconnectLimit: 3,
    reconnectInterval: 3000,
    onOpen:()=>{},
    onClose:()=>{},
    onMessage:()=>{},
    onError:()=>{},
};


function useWebSocket (
    socketUrl: string,
    options?: UseWebSocketOptions
):Result;

function useWebSocket(
    socketUrl: string,
    options?: UseWebSocketOptions
){
    const {
        manual,
        reconnectLimit,
        reconnectInterval,
        onOpen,
        onClose,
        onMessage,
        onError,
    } = {...defaultOptions,...options};

    if(!socketUrl || typeof(socketUrl)!== 'string'){
        throw new Error('useWebSocket require string socketUrl')
    }
    let readyState = ref<number>(ReadyState.Connecting);
    
    const reconnectCount = ref<number>(0);
    const socket = ref<WebSocket>();
    const latestMessage = ref<WebSocketEventMap['message']>();

    const run = ()=>{
        socket.value = new WebSocket(socketUrl);
        socket.value.addEventListener('open', function (event) {
            readyState.value = ReadyState.Open
            onOpen(event)
        });
        
        socket.value.addEventListener('message', function (event) {
            latestMessage.value = event;
            onMessage(event)
        });

        socket.value.addEventListener('error', function (event) {
            console.log('error ', event);
            reconnect();
            onError(event)
        });
        socket.value.addEventListener('close', function (event) {
            readyState.value = ReadyState.Closed
            onClose(event)
        });
    };

    const connect = ()=>{
        if( readyState.value !== ReadyState.Open){
            reconnectCount.value = 0;
            run()
        }
    };

    const reconnect = ()=>{
        if(reconnectCount.value >= reconnectLimit ) return
        useTimeout(()=>{
            reconnectCount.value++
            run()
        },ref(reconnectInterval))
    }

    const disconnect = ()=>{
        if(
            (   readyState.value === ReadyState.Connecting
                || readyState.value === ReadyState.Open 
            )
            && socket.value
        ){
            readyState.value = ReadyState.Closing
            socket.value.close()
        }
    };

    const sendMessage = (data: string | ArrayBufferLike | Blob | ArrayBufferView)=>{
        if(
            data 
            && socket.value
            && readyState.value === ReadyState.Open
        ) socket.value.send(data)
    };

    if( !manual ) connect()
    
    return {
        latestMessage,
        readyState,
        connect,
        disconnect,
        sendMessage,
        webSocketIns: socket
    }
};

export default useWebSocket