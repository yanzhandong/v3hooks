# useDebounceFn

用来处理防抖函数的 Hook。


## 使用

```
<template>
    <div>
      <p style="marginTop: 16"> Clicked count: {{debounceFnValue}} </p>
      <button type="button" @click="debounceFnRun">
        useDebounceFn测试
      </button>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useDebounceFn } from 'v3hooks';


export default {
  
  

  setup() {
    const debounceFnValue = ref<number>(1);
    const { run:debounceFnRun } = useDebounceFn(()=>{
      debounceFnValue.value++
    },500)

    return {
      debounceFnValue,
      debounceFnRun,
    }
  }
}
</script>
```

频繁调用 debounceFnRun，但只会在所有点击完成 500ms 后执行一次相关函数



## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| fn | 需要防抖执行的函数 | () => void | - |
| wait | 超时时间，单位为毫秒 | number | 1000 |