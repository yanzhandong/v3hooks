# useWebSocket

用于处理 WebSocket 的 Hook。

## 基础使用

```vue
<template>
  <div class="hello">
    <div>webScoket状态： {{readyState}}</div>
    <button @click="connect">连接webScoket</button>
    <button @click="disconnect">关闭webScoket</button>
    <button @click="handleSendMessage">发送消息</button>
  </div>
</template>

<script lang="ts">
import { useWebSocket } from "v3hooks";
import { watchEffect } from 'vue';
export default {
  
  setup() {

    const { 
      readyState,
      latestMessage,
      disconnect,
      sendMessage,
    } = useWebSocket('ws://82.157.123.54:9010/ajaxchattest')

    const handleSendMessage = ()=>{
      sendMessage('hello v3hooks')
    }

    watchEffect(()=>{
      console.log(latestMessage.value)
    })

    return {
      readyState,
      disconnect,
      handleSendMessage
    };
  },
};
</script>
```

useWebSocket接受一个string的socket地址，返回一个集合对象。
上面例子中接受参数使用了latestMessage来获取最新一次通讯的event对象。

也可以使用onMessage来获取event对象，例子如下
```
useWebSocket('ws://82.157.123.54:9010/ajaxchattest',{
  onMessage(event){
    console.log(event)
  }
})
```


## Api
```
enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
}
interface UseWebSocketOptions {
    manual?: boolean;
    reconnectLimit?: number;
    reconnectInterval?: number;
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onMessage?: (event: WebSocketEventMap['message']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
}
interface Result {
    latestMessage: Ref<WebSocketEventMap['message'] | undefined>;
    sendMessage: WebSocket['send'];
    disconnect: () => void;
    connect: () => void;
    readyState: Ref<ReadyState>;
    webSocketIns: Ref<WebSocket | undefined>;
}
function useWebSocket(socketUrl: string, options?: UseWebSocketOptions): Result;
```

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| socketUrl |  必填，webSocket 地址	| string | - |
| options |  选填，连接配置项	| options | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| onOpen |  选填，webSocket 连接成功回调	| (event: WebSocketEventMap['open']) => void | - |
| onClose |  选填，webSocket 连接成功回调	| (event: WebSocketEventMap['close']) => void | - |
| onMessage |  选填，webSocket 收到消息回调	| (message: WebSocketEventMap['message']) => void | - |
| onError |  选填，webSocket 错误回调	| (event: WebSocketEventMap['error']) => void | - |
| reconnectLimit |  选填，重试次数	| number | 3 |
| reconnectInterval |  选填，重试时间间隔（ms）	| number | 3000 |
| manual |  选填，手动启动连接	| boolean | false |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| latestMessage	 | 最新消息	 | WebSocketEventMap['message'] |
| sendMessage	 | 发送消息函数	 | WebSocket['send'] |
| disconnect	 | 手动断开 webSocket 连接	 | () => void |
| connect	 | 手动连接 webSocket，如果当前已有连接，则关闭后重新连接	 | () => void |
| readyState	 | 当前 webSocket 连接状态	 | ReadyState |
| webSocketIns	| webSocket 实例	 | WebSocket |
