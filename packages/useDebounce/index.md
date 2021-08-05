# useDebounce

用来处理防抖值的 Hook。

## 使用

```
<template>
    <div>
        <input
            v-model="debounceCurrValue"
            placeholder="Typed value"
            style="width: 280"
        />
        <p style="marginTop: 16">DebouncedValue: {{debounceValue}}</p>
    </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import { useDebounce } from 'v3hooks';


export default {
  
  

  setup() {
    const debounceCurrValue = ref(1);
    const debounceValue = useDebounce(debounceCurrValue,500);

    return {
        debounceCurrValue,
        debounceValue,
    }
  }
}
</script>
```

使用useDebounce后，频繁设置debounceCurrValue不会立刻改变debounceValue， debounceValue只会在输入结束 500ms 后变化。

## Api

### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| value | 需要防抖的值 | any | - |
| wait | 超时时间，单位为毫秒 | number | 1000 |