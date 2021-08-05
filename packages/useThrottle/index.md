# useThrottle

用来处理节流值的 Hook。


## 使用

```
<template>
    <div>
        <input
            v-model="throttleCurrValue"
            placeholder="Typed value"
            style="width: 280"
        />
        <p style="marginTop: 16">throttleValue: {{throttleValue}}</p>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useThrottle } from 'v3hooks';


export default {
  
  

  setup() {
    const throttleCurrValue = ref(1);
    const throttleValue = useThrottle(throttleCurrValue,500);

    return {
        throttleCurrValue,
        throttleValue,
    }
  }
}
</script>
```

使用useThrottle后，频繁设置throttleCurrValue， throttleValue每隔 500ms 变化一次。。

## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| value | 需要防抖的值 | any | - |
| wait | 超时时间，单位为毫秒 | number | 1000 |