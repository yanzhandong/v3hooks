<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <div style="width: 60vw">
      <p 
        v-for=" (active,index) in list" 
        :key="getKey(index)"
        style="width: 100%;height:60px;border:1px solid #cccccc;line-height:60px;"
      > value:{{ active }} uuid:{{getKey(index)}}</p>
    </div>
    <div style="width:39vw">
      <button @click="()=> insert(0,Math.random())">insert头部插入</button>
      <button @click="()=> resetList(['a','b','c'])">重置</button>
      <button @click="()=> merge(0, [Math.random(),Math.random()])">头部插入多个</button>
      <button @click="()=> replace(1, Math.random())">第二个替换</button>
      <button @click="()=> remove(1)">删除第二个</button>
      <button @click="()=> move(0,2)">一三互换位置</button>
      <button @click="()=> push(Math.random())">尾部插入</button>
      <button @click="()=> pop()">尾部删除</button>
      <button @click="()=> unshift(Math.random())">头部插入</button>
      <button @click="()=> shift()">头部删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useDynamicList } from "../../../dist/index.js";

export default {
  
  setup() {
    const defalutValue = ref(['a','b','c'])
    const { 
      list,
      insert,
      resetList,
      merge,
      replace,
      remove,
      move,
      getKey,
      push,
      pop,
      unshift,
      shift,
    } = useDynamicList(defalutValue);

    // useVirtualList测试
    return {
      list,
      insert,
      resetList,
      merge,
      replace,
      remove,
      move,
      getKey,
      push,
      pop,
      unshift,
      shift,
    };
  },
};
</script>