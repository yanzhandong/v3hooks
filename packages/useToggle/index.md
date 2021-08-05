# useToggle

用于在多个状态值间切换的 Hook。
(此处与 ahooks 略有不同，ahooks只能两个状态切换，本hook支持N个状态切换)


## 使用

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


## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| value | 需要防抖的值 | any | - |
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