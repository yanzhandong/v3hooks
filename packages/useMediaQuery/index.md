# useMediaQuery

一个监听 mediaQuery 状态的 Hook。


## 使用Demo

```vue
<template>
  <div class="hello">
    <div>
      <p> value:{{ state }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { useMediaQuery } from "v3hooks";

export default {
  
  setup() {
    const state = useMediaQuery('(min-width: 480px)');

    watch(
      state,
      (value)=>{
        if(!value) console.log('已经是480px以下了')
      }
    )
    
    // useVirtualList测试
    return {
      state
    };
  },
};
</script>
```

useMediaQuery接受一个MediaQuery条件, 导出一个state boolean值来判断是否满足MediaQuery条件

## Api
```
const useMediaQuery: (query: string) => vue.Ref<boolean>;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| query |  MediaQuery条件	| string | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state	 | 否满足MediaQuery条件	 | boolean |