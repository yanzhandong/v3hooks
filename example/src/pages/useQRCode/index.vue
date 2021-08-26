<template>
  <div class="hello">
    <div> 二维码:</div>
    <img :src="state" alt="">
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQRCode } from "../../../dist/index.js";

const logo = require('../../assets/logo.png')

export default {
  
  setup() {
    const text = ref<string>('https://www.baidu.com/')
    // let text2 = 'https://www.baidu.com/';

    const state = useQRCode(text,{
      logo: logo.default,
      colorDark: '#000000'
    });

    setTimeout(()=>{
      text.value = 'https://www.acfun.cn/'
    },2000)

    return {
      state
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