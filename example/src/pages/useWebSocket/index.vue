<template>
  <div class="hello">
    <div>webScoket状态： {{readyState}}</div>
    <button @click="connect">连接webScoket</button>
    <button @click="disconnect">关闭webScoket</button>
    <button @click="handleSendMessage">发送消息</button>
  </div>
</template>

<script lang="ts">
import { useWebSocket } from "../../../dist/index.js";
import { watchEffect } from '@vue/runtime-core';
export default {
  
  setup() {

    const { 
      readyState,
      latestMessage,
      disconnect,
      sendMessage,
    } = useWebSocket('ws://82.157.123.54:9010/ajaxchattest',{
      onMessage(event){
        console.log(event)
      }
    })

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

<style scoped>
  .hello{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>