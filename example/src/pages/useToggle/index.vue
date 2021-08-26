<template>
  <div class="hello">
    <div> {{state}}</div>
    <button @click="toggle">toggle</button>
    <button @click="setToggle">setToggle</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useToggle,useTimeout } from "../../../dist/index.js";
export default {
  
  setup() {

    const platform = ref<string>('安装 App');
    const platform2 = ref<string>('安装中...');
    const [state, [toggle]] = useToggle(platform, platform2,'不安装');

    useTimeout(() => {
      platform.value = `安装 ios App`
      platform2.value = '安装中2....'
    }, ref(3000));

    const setToggle = ()=>{
      toggle(platform)
    }
    
    return {
      state,
      toggle,
      setToggle
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