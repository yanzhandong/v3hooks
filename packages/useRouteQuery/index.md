# useRouteQuery

一个获取vueRouter query的 Hook 。

请确保项目已安装Vue Router v4.x版本及以上，否则将不能使用此Hook.


## 使用Demo

```vue
<template>
  <div class="hello" style="display:flex;align-items:flex-start;">
    <p> value:{{ state }}</p>
    <button @click="handlerUpdateState">修改query</button>
  </div>
</template>

<script lang="ts">
import { useRouteQuery } from "v3hooks";

export default {
  
  setup() {
    // 获取query中的a
    const state = useRouteQuery('a');

    const handlerUpdateState = ()=>{
      state.value = String( Math.random() );
    };

    // useVirtualList测试
    return {
      state,
      handlerUpdateState
    };
  },
};
</script>
```

useRouteQuery接受一个key是query中的参数key。 修改返回的state可直接修改url中的query。

## Api
```
const state = useRouteQuery(
  key: string,
);

```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| key | query中的键名 | string	 | - |

### Result

| 参数 | 说明 | 类型 |
| :----| :---- | :---- |
| state | query值也可以直接被修改，这样将同步修改query | Ref<any> |

