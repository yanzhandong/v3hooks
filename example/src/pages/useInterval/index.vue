<template>
  <div class="hello">
    <div>value:{{ data }}</div>
    <button @click="clear">关闭</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useInterval,useTimeout } from "../../../dist/index.js";


export default {
  
  setup() {
    const data = ref(1);
    let delay = ref<null | number>(3000);

    useInterval(()=>{
      data.value++
    },delay);

    const clear = ()=>{ 
      delay.value = null;
    };

    useTimeout(()=>{
      console.log('fuck')
    },delay)

    return {
      data,
      clear
    };
  },
};
</script>
