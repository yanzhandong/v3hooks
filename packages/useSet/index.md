# useSet

一个可以管理 Set 类型状态的 Hook。


## 使用Demo

```vue
<template>
  <div class="hello">
    <div>
      <p> value:{{ state }}</p>
      <button @click="()=> add(Math.random())">add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useSet, useMap } from "../../../dist/index.js";

export default {
  
  setup() {
    const [state , { add } ] = useSet([1]);
    return {
      state,
      add
    };
  },
};
</script>
```

useSet接受一个 Set 可接受的参数, 并导出以下方法.

## Api
```
interface Actions<T>{
    add: (value: T)=> void,
    remove: (value: T)=> void,
    has: (value: T)=> boolean,
    clear: ()=> void,
    reset: ()=> void,
}

function useSet <T = any>(initialValue?:T[]) : [
    state: Ref<Set<any>>,
    actions: Actions<T>
]
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| initialValue | 可选项，传入默认的 Set 参数	 | T[] | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state	 | Set 对象	 | Set |
| add	 | 添加元素	 | (value: T)=> void |
| remove	| 移除元素	 | (value: T)=> void |
| has	| 判断是否存在元素	 | (value: T)=> void |
| clear	| 清空set	 | ()=> void |
| reset	| 重置为默认值	 | ()=> void |