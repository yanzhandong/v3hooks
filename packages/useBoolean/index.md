# useBoolean

优雅的管理 boolean 值的 Hook。


## 使用

```
<template>
    <div>
      <p>{{ useBooleanState }}</p>
      <button @click="useBooleanToggle">toggle</button>
      <button @click="setTrue">setTrue</button>
      <button @click="setFalse">setFalse</button>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useBoolean } from 'v3hooks';


export default {
  
  

  setup() {
    //useToggle 测试
    const [ useBooleanState,{ toggle: useBooleanToggle, setTrue, setFalse}] = useBoolean();


    return {
      useBooleanState,
      useBooleanToggle,
      setTrue,
      setFalse
    }
  }
}
</script>
```

useBoolean默认切换布尔值状态，也可以接收一个参数作为新的值。



## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| defaultValue | 可选项，传入默认的状态值	 | Ref<boolean> | false |


### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state | 状态值 | - |
| actions | 操作集合	 | Actions |

### Actions

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| toggle | 触发状态更改的函数,可以接受一个可选参数修改状态值 | (value?: boolean) => void |
| setTrue | 设置状态值为 true | () => void |
| setFalse | 设置状态值为 false | () => void |