# useMap

一个可以管理 Map 类型状态的 Hook。


## 使用Demo

```vue
<template>
  <div class="hello">
    <div>
      <p> value:{{ state }}</p>
      <button @click="()=> set('1',Math.random())">set</button>
      <button @click="()=> remove('1')">remove</button>
      <button @click="()=> setAll([ ['1','111'], ['2','2222'] ])">setAll</button>
    </div>
    
  </div>
</template>

<script lang="ts">
import { useSet, useMap } from "../../../dist/index.js";

export default {
  
  setup() {
    const [state, { set, setAll, remove }] = useMap([
      ['1','321']
    ]);
    return {
      state,
      set,
      setAll,
      remove
    };
  },
};
</script>
```

useMap接受一个 Map 可接受的参数, 并导出以下方法.

## Api
```
type MapValue = readonly (readonly [any, any])[]

interface Actions<T>{
    set: ( key: string, value: T)=> void,
    get: ( key: string )=> T,
    remove: ( key: string )=> void,
    has: ( key: string )=> boolean,
    clear: ()=> void,
    setAll: (newMap: MapValue)=> void;
    reset: ()=> void,
}

function useMap <T = any>(initialValue?:MapValue) : [
    state: Ref<Map<any,any>>,
    actions: Actions<T>
]

```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| initialValue | 可选项，传入默认的 Map 参数	 | readonly[any,any] | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state	 | Map 对象	 | Map |
| set	 | 添加元素	 | ( key: string, value: T)=> void |
| get	| 移除元素	 | ( key: string )=> T |
| remove	| 移除元素 | ( key: string )=> void |
| has	| 判断是否存在元素 |( key: string )=> boolean |
| clear	| 清空Map	 | ()=> void |
| setAll	| 添加并生成一个新的 Map 对象 | (newMap: (readonly [any, any])[])=> void |
| reset	| 重置为默认值	 | ()=> void |