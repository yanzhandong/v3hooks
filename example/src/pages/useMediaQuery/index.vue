<template>
  <div class="hello">
    <div>
      <p> value:{{ state }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { useMediaQuery } from "../../../dist/index.js";

export default {
  
  setup() {
    const state = useMediaQuery('(min-width: 480px)');

    watch(
      state,
      (value)=>{
        if(!value) console.log('已经是480px以下了')
      }
    )
    
    // useVirtualList测试
    return {
      state
    };
  },
};
</script>