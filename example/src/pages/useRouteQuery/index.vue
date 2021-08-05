<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> value:{{ state }}</p>
    <button @click="handlerUpdateState">修改query</button>
  </div>
</template>

<script lang="ts">
import { useRouteQuery } from "../../../dist/index.js";

export default {
  
  setup() {
    // 获取query中的a
    const state = useRouteQuery('a');

    // console.log(state.value)

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