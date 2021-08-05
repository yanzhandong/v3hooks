<template>
  <div class="hello">
    <div ref="fullScreen" style="background: white">
        <p>是否全屏: {{isFullscreen}}</p>
        <button @click="setFull" id="a">全屏</button>
        <button @click="exitFull">退出全屏</button>
        <button @click="toggle">toggle切换</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useFullscreen, useDocumentVisibility } from "../../../dist/index.js";

export default {
  setup() {
    const fullScreen = ref();
    const documentVisibility = useDocumentVisibility();
    const [ isFullscreen, { setFull, exitFull, toggle } ] = useFullscreen(fullScreen, {
        onFull: ()=>{
            console.log('全屏')
        },
        onExitFull: ()=>{
            console.log('非全屏')
        }
    });
    // const [ isFullscreen, { setFull, exitFull, toggle } ] = useFullscreen();
    // const [ isFullscreen, { setFull, exitFull, toggle } ] = useFullscreen(document.body);

    watch(
      documentVisibility,
      (value)=>{
        if(value) console.log('重新触发active')
      }
    )
    
    // useVirtualList测试
    return {
      isFullscreen,
      setFull,
      exitFull,
      toggle,
      fullScreen
    };
  }
};
</script>