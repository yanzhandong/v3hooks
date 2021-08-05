<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> value:{{ state }}</p>
    <button @click="handlerUpdateState">修改Cookie</button>
  </div>
</template>

<script lang="ts">
import { useCookie } from "../../../dist/index.js";

export default {
  
  setup() {
    // 获取query中的a
    const state = useCookie('a',{
        defaultValue: '1111',
        watch: true,
        path: '/useCookie',
        expires: 1,

    });

    const handlerUpdateState = ()=>{
      state.value = String( Math.random() );
    };

    // useVirtualList测试
    return {
      state,
      handlerUpdateState
    };
  },
};
</script>