# useToggle

用于在多个状态值间切换的 Hook。
(此处与 ahooks 略有不同，ahooks只能两个状态切换，本hook支持N个状态切换)


## 基础使用

```
<template>
    <div>
      <p>useToggleDemoState: {{useToggleDemoState}}</p>
      <button @click="handleUseTToggle">设置指定值</button>
      <button @click="useTToggle">useTToggle</button>
      <button @click="useTSetLeft">useTSetLeft</button>
      <button @click="useTSetCenter">useTSetCenter</button>
      <button @click="useTSetRight">useTSetRight</button>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useToggle } from 'v3hooks';


export default {
  
  

  setup() {
    //useToggle 测试
    const [ useToggleDemoState, [ useTToggle, useTSetLeft, useTSetCenter, useTSetRight]] = useToggle('left','center','right');

    const handleUseTToggle = ()=>{
      useTToggle('center')
    };

    return {
      useToggleDemoState,
      handleUseTToggle,
      useTToggle,
      useTSetLeft,
      useTSetCenter,
      useTSetRight,
    }
  }
}
</script>
```

useToggle接受多个参数，且在actions中进行同等数量导出。Actions中第一个为toggle切换，其余为设置对应参数。


## 异步值Toggle

```
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
```

useToggle可以接受ref值的切换，内部支持了响应式，如果ref值发生变化,state会监听其变化同步修改。



## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| value | 需要切换的值 | string - number - boolean - undefined | - |
| ... | 同上 | 同上 | - |


### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state | 状态值 | - |
| actions | 操作集合	 | Actions |

### Actions

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| toggle | 触发状态更改的函数，可以接受可选参数修改状态值	 | (state?: any) => void |
| action | 按照value顺序设置state为vulue | () => void |
| ... | 同上 | 同上 |