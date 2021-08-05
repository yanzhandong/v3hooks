<template>
  <div class="hello">
    <div>
      <p> value:{{ state }}</p>
      <button @click="()=> add(Math.random())">add</button>
    </div>

    <div>
      <p> value:{{ state2 }}</p>
      <button @click="()=> set('1',Math.random())">set</button>
      <button @click="()=> remove('1')">remove</button>
      <button @click="()=> setAll([ ['1','111'], ['2','2222'] ])">setAll</button>
    </div>
    
  </div>
</template>

<script lang="ts">
import { useSet, useMap } from "../../../dist/index.js";

export default {
  
  setup() {
    const [state , { add } ] = useSet();
    const [state2, { set, setAll, remove }] = useMap([
      ['1','321']
    ]);

    // const add = ()=>{};

    // useVirtualList测试
    return {
      state,
      add,

      state2,
      set,
      setAll,
      remove
    };
  },
};
</script>