# useInterval

一个可以处理 setInterval 的 Hook。


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
import { useInterval } from "../../../dist/index.js";


export default {
  
  setup() {
    const data = ref(1);
    let delay = ref<null | number>(1000);

    useInterval(()=>{
      data.value++
    },delay);

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

每1000ms，执行一次，设置delay为null则立即中断


## 非中断式调用
```vue
<script lang="ts">
import { useInterval } from "v3hooks";
export default {
  
  setup() {
    useInterval(()=>{
      console.log('每 3s 执行一次')
    },3000)
  },
};
</script>

```

useInterval可以接受一个普通number参数,这样的useInterval可以接受一个普通number参数，不会被中断会一直被执行，谨慎使用！！


## Api
```
interface UseIntervalOptions {
    immediate?: boolean;
}
const useInterval: (
  fn: Fn, 
  delay: number | Ref<number | undefined | null>, 
  options?: UseIntervalOptions | undefined
) => void;
```
### Params

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| fn	 | 要重复调用的函数	 | (...args: any[]) => void | - |
| delay	 | 间隔时间，当取值为 null 或 undefined 时会停止计时器	 | number - Ref<number> - Ref<undefined> - Ref<null> | - |
| options	 | 配置计时器的行为，详见下面的 Options	 | Options | - |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| :----| :---- | :---- | :---- |
| immediate	 | 参数可以用来控制是否在首次渲染时立即执行 | boolean| false |