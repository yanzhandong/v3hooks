<template>
  <div class="hello">
    <div> {{useBooleanState}}</div>
    <button @click="toggle">toggle</button>
    <button @click="setTrue">setTrue</button>
    <button @click="setFalse">setFalse</button>
  </div>
</template>

<script lang="ts">
import {useBoolean } from "../../../dist/index.js";
export default {
  
  setup() {

    //useBoolean 测试
    const [ useBooleanState,{ toggle, setTrue, setFalse}] = useBoolean();
    
    return {
      useBooleanState,
      toggle,
      setTrue,
      setFalse
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