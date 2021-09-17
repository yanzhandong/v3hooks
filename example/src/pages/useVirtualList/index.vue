<template>
  <div class="hello">
    <button
      type="button"
      @click="handleVirtualScrollTo"
    >
      跳转到第222排
    </button>
    <div
      :ref="containerProps.ref"
      @scroll="containerProps.onScroll"
      class="container"
    >
      <div :style="wrapperStyle" class="wrapper">
        <div
          v-for="active in list"
          :key="active"
          class="item"
        >
          {{active}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useVirtualList } from "../../../dist/index.js";

export default {
  
  data(){
    return {
    }
  },
  setup() {
    // useVirtualList测试

    const { list, wrapperStyle, containerProps, scrollTo } = useVirtualList(
      Array.from(Array(9999).keys()),
      {
        itemHeight: 60,
        overscan: 10,
      }
    );

    const handleVirtualScrollTo = () => {
      scrollTo(222);
    };

    return {
      list,
      wrapperStyle,
      containerProps,
      handleVirtualScrollTo,
    };
  },
};
</script>


<style scoped>
::-webkit-scrollbar {display:none}
.hello{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container{
  height: calc(100vh - 130px); 
  overflow-y: auto;
  margin-top: 30px; 
}
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 52px;
  border: 1px solid #cccccc;
  margin-bottom: 8px;
  background-color: white;
  position: relative;
}
button{
  margin-top: 30px;
}
</style>