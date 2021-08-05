# useThrottleFn

用来处理节流函数的 Hook。


## 使用

```
<template>
    <div>
      <p style="marginTop: 16"> Clicked count: {{throttleFnValue}} </p>
      <button type="button" @click="run">
        useThrottleFn测试
      </button>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useThrottleFn } from 'v3hooks';


export default {
  
  

  setup() {
    const throttleFnValue = ref(1);
    const { run } = useThrottleFn(()=>{
      throttleFnValue.value++
    },500)

    return {
      throttleFnValue,
      run,
    }
  }
}
</script>
```

频繁调用 run，但只会每隔 500ms 执行一次相关函数。



## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| fn | 需要节流执行的函数	 | () => void | - |
| wait | 超时时间，单位为毫秒 | number | 1000 |