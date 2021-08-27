# useTimeout

一个可以处理 setTimeout 计时器函数的 Hook。


## 基础使用

```vue
<template>
  <div class="hello">
    <div>value:{{ data }}</div>
    <button @click="clear">关闭</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useTimeout } from "v3hooks";


export default {
  
  setup() {
    const data = ref(1);
    let delay = ref<null | number>(1000);


    useTimeout(()=>{
      data.value++
    },delay)

    const clear = ()=>{ 
      delay.value = null;
    };

    return {
      data,
      clear
    };
  },
};
</script>

```

1000ms执行一次，设置delay为null则立即中断

## 非中断式调用
```vue
<script lang="ts">
import { useTimeout } from "v3hooks";
export default {
  
  setup() {
    useTimeout(()=>{
      console.log(' 3s 后执行')
    },3000)
  },
};
</script>

```

useTimeout可以接受一个普通number参数,这样的timeout不能被中断

## Api
```
const useTimeout: (
  fn: Fn,
  delay: number | Ref<number | undefined | null>
) => void;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| fn	 | 要重复调用的函数	 | (...args: any[]) => void | - |
| delay	 | 间隔时间，当取值为 null 或 undefined 时会停止计时器	 | Ref<number> | Ref<undefined> | Ref<null> | - |