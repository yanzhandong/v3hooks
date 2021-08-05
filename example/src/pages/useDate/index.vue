<template>
  <div class="hello">
    <div> value:{{ data }}</div>
    <button @click="handleUpdateTime">无参数刷新</button>
    <button @click="handleUpdateTimeParam">有参数刷新</button>
  </div>
</template>

<script lang="ts">
import { useDate } from "../../../dist/index.js";

export default {
  
  setup() {
    const { data, refresh } = useDate(+new Date(),{
        format: 'YYYY-MM-DD HH:mm:ss',
        method: 'hour',
        methodParam: 3
    });

    const handleUpdateTime = ()=>{
        refresh();
    }

    const handleUpdateTimeParam = ()=>{
        refresh('2021-7-16 12:17:00');
    }

    return {
      data,
      refresh,
      handleUpdateTime,
      handleUpdateTimeParam
    };
  },
};
</script>

<style scoped>
    .hello{
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 30px;
    }
    
</style>