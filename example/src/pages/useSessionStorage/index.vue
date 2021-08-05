<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <div style="width: 60vw">
      <p> value:{{ state }}</p>
    </div>
    <div style="width:39vw">
      <button @click="handleUpdate">更新storage</button>
      <button @click="handleDelete">删除storage</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useSessionStorage } from "../../../dist/index.js";

export default {
  
  setup() {
    const state = useSessionStorage('useLocalStorage',{a:111});

    const handleUpdate = ()=>{
        state.value = { 'a': Math.random() };
    };

    const handleDelete = ()=>{
        state.value = undefined;
    };

    // useVirtualList测试
    return {
      state,
      handleUpdate,
      handleDelete
    };
  },
};
</script>